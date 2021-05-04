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

console.log('Welcome to CLI Yelp!\n');

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
    message: 'Please submit a query:',
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
        answers.initUserFlow === initUserFlowChoices.businesses
        || answers.initUserFlow === initUserFlowChoices.reviews
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
    }
  },
  {
    type: 'checkbox',
    name: 'appliedBusinessFilters',
    message: 'Choose 1 or more filters to apply.',
    choices: businessFilterChoices,
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.businesses
      && answers.isApplyingFilter;
    }
  },
  {
    type: 'checkbox',
    name: 'appliedReviewFilters',
    message: 'Choose 1 or more filters to apply.',
    choices: reviewFilterChoices,
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.reviews
    }
  },
  {
    type: 'list',
    name: 'locationType',
    message: 'Please specify how you want to enter your location',
    choices: Object.values(locationChoices),
    when: function (answers) {
      return (
        (
          answers.initUserFlow === initUserFlowChoices.businesses
          && answers.isApplyingFilter
          && answers.appliedBusinessFilters.indexOf('Location') !== -1
        )
        ||
        (
          answers.initUserFlow === initUserFlowChoices.reviews
          && answers.appliedReviewFilters.indexOf('Location') !== -1
        )
      );
    },
  },
  {
    type: 'input',
    name: 'locationStateCode',
    message: 'Please enter 2 character state code:',
    when: function (answers) {
      return (
        (
          (
            answers.initUserFlow === initUserFlowChoices.businesses
            && answers.isApplyingFilter
            && answers.appliedBusinessFilters.indexOf('Location') !== -1
          )
          ||
          (
            answers.initUserFlow === initUserFlowChoices.reviews
            && answers.appliedReviewFilters.indexOf('Location') !== -1
          )
        )
        && answers.locationType === locationChoices.stateCode
      );
    }
  },
  {
    type: 'input',
    name: 'locationPostalCode',
    message: 'Please enter postal code:',
    when: function (answers) {
      return (
        (
          (
            answers.initUserFlow === initUserFlowChoices.businesses
            && answers.isApplyingFilter
            && answers.appliedBusinessFilters.indexOf('Location') !== -1
          )
          ||
          (
            answers.initUserFlow === initUserFlowChoices.reviews
            && answers.appliedReviewFilters.indexOf('Location') !== -1
          )
        )
        && answers.locationType === locationChoices.postalCode
      );
    }
  },
  {
    type: 'input',
    name: 'averageStarRating',
    message: 'Please enter star rating:',
    when: function (answers) {
      return (
          (
            answers.initUserFlow === initUserFlowChoices.businesses
            && answers.isApplyingFilter
            && answers.appliedBusinessFilters.indexOf('Average star rating') !== -1
          )
          ||
          (
            answers.initUserFlow === initUserFlowChoices.reviews
            && answers.appliedReviewFilters.indexOf('Average star rating') !== -1
          )
      );
    }
  },
  {
    type: 'input',
    name: 'numberOfReviews',
    message: 'Please enter number of reviews',
    when: function (answers) {
      return answers.initUserFlow === initUserFlowChoices.businesses
      && answers.isApplyingFilter
      && answers.appliedBusinessFilters.indexOf('Has X number of reviews') !== -1;
    }
  }
];

async function runCliPrompts() {
  const answers = await inquirer.prompt(prompts);

  if (answers.testQueries) {
    await handleTestQuery(answers.testQueries)
  } else {
    console.log(answers);
  }
}

module.exports = runCliPrompts;
