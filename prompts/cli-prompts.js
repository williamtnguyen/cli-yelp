const inquirer = require('inquirer');
const {
  initUserFlowChoices,
  testQueryChoices,
  browseCategoryChoices,
  businessFilterChoices,
  reviewFilterChoices,
  locationChoices,
} = require('./prompt-choices');
const handleTestQuery = require('../db/query-handlers/test-query-handler');
const handleBusinessQuery = require('../db/query-handlers/business-query-handler');
const handleReviewQuery = require('../db/query-handlers/review-query-handler');
const handleManualBusQuery = require('../db/query-handlers/manual-business-query');

console.log('Welcome to CLI Yelp!\n');

inquirer.registerPrompt('date', require('inquirer-date-prompt'));
const prompts = [
  {
    type: 'list',
    name: 'initUserFlow',
    message: 'What do you want to do?',
    choices: Object.values(initUserFlowChoices),
  },
  {
    type: 'input',
    name: 'manualBusinessQuery',
    message: 'Please submit a keyword or business name:',
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.manual;
    },
  },
  {
    type: 'list',
    name: 'browseCategories',
    message: 'Please choose a category:',
    choices: Object.values(browseCategoryChoices),
    when: function (answers) {
      return (
        answers.initUserFlow === initUserFlowChoices.businesses ||
        answers.initUserFlow === initUserFlowChoices.reviews
      );
    },
  },
  {
    type: 'list',
    name: 'testQueries',
    message: 'Please choose a test query to run',
    choices: Object.values(testQueryChoices),
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.test;
    },
  },
  {
    type: 'confirm',
    name: 'isApplyingFilter',
    message: 'Want to apply query filters?',
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.businesses;
    },
  },
  {
    type: 'checkbox',
    name: 'appliedBusinessFilters',
    message: 'Choose 1 or more filters to apply.',
    choices: businessFilterChoices,
    when: function (answers) {
      return (
        answers.initUserFlow === initUserFlowChoices.businesses &&
        answers.isApplyingFilter
      );
    },
  },
  {
    type: 'checkbox',
    name: 'appliedReviewFilters',
    message: 'Choose 1 or more filters to apply.',
    choices: reviewFilterChoices,
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.reviews;
    },
  },
  {
    type: 'list',
    name: 'locationType',
    message: 'Please specify how you want to enter your location',
    choices: Object.values(locationChoices),
    when: function (answers) {
      return (
        (answers.initUserFlow === initUserFlowChoices.businesses &&
          answers.isApplyingFilter &&
          answers.appliedBusinessFilters.indexOf('Location') !== -1) ||
        (answers.initUserFlow === initUserFlowChoices.reviews &&
          answers.appliedReviewFilters.indexOf('Location') !== -1)
      );
    },
  },
  {
    type: 'input',
    name: 'locationStateCode',
    message: 'Please enter 2 character state code:',
    when: function (answers) {
      return (
        ((answers.initUserFlow === initUserFlowChoices.businesses &&
          answers.isApplyingFilter &&
          answers.appliedBusinessFilters.indexOf('Location') !== -1) ||
          (answers.initUserFlow === initUserFlowChoices.reviews &&
            answers.appliedReviewFilters.indexOf('Location') !== -1)) &&
        answers.locationType === locationChoices.stateCode
      );
    },
  },
  {
    type: 'input',
    name: 'locationCoordinates',
    message: 'Please enter coordinates (long, lat):',
    when: function (answers) {
      return (
        ((answers.initUserFlow === initUserFlowChoices.businesses &&
          answers.isApplyingFilter &&
          answers.appliedBusinessFilters.indexOf('Location') !== -1) ||
          (answers.initUserFlow === initUserFlowChoices.reviews &&
            answers.appliedReviewFilters.indexOf('Location') !== -1)) &&
        answers.locationType === locationChoices.latLngCoord
      );
    },
  },
  {
    type: 'input',
    name: 'maxDistanceFromCoordinates',
    message: 'Please the max distance willing to travel (meters):',
    when: function (answers) {
      return (
        ((answers.initUserFlow === initUserFlowChoices.businesses &&
          answers.isApplyingFilter &&
          answers.appliedBusinessFilters.indexOf('Location') !== -1) ||
          (answers.initUserFlow === initUserFlowChoices.reviews &&
            answers.appliedReviewFilters.indexOf('Location') !== -1)) &&
        answers.locationType === locationChoices.latLngCoord
      );
    },
  },
  {
    type: 'input',
    name: 'averageStarRating',
    message: 'Please enter star rating:',
    when: function (answers) {
      return (
        (answers.initUserFlow === initUserFlowChoices.businesses &&
          answers.isApplyingFilter &&
          answers.appliedBusinessFilters.indexOf('Average star rating') !==
            -1) ||
        (answers.initUserFlow === initUserFlowChoices.reviews &&
          answers.appliedReviewFilters.indexOf('Average star rating') !== -1)
      );
    },
  },
  {
    type: 'input',
    name: 'numberOfReviews',
    message: 'Please enter number of reviews',
    when: function (answers) {
      return (
        answers.initUserFlow === initUserFlowChoices.businesses &&
        answers.isApplyingFilter &&
        answers.appliedBusinessFilters.indexOf(
          'Has greater than X number of reviews'
        ) !== -1
      );
    },
  },
  {
    type: 'date',
    name: 'timestamp',
    message: 'Please enter date',
    format: { month: 'short', hour: undefined, minute: undefined },
    when: function (answers) {
      return (
        answers.initUserFlow === initUserFlowChoices.reviews &&
        answers.appliedReviewFilters.indexOf('Posted after date X') !== -1
      );
    },
  },
];

async function runCliPrompts() {
  const answers = await inquirer.prompt(prompts);

  const hasBusFilters =
    answers.initUserFlow === initUserFlowChoices.businesses &&
    answers.isApplyingFilter;

  if (answers.testQueries) {
    await handleTestQuery(answers.testQueries);
  } else if (answers.initUserFlow === initUserFlowChoices.manual) {
    handleManualBusQuery(answers);
  } else if (hasBusFilters) {
    handleBusinessQuery(answers);
  } else if (answers.initUserFlow === initUserFlowChoices.reviews) {
    handleReviewQuery(answers);
  } else {
    console.log(answers);
  }
  return;
}

module.exports = runCliPrompts;
