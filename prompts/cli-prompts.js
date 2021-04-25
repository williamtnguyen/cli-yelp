const inquirer = require('inquirer');
const {
  initUserFlowChoices,
  testQueryChoices,
  browseCategoryChoices,
  locationChoices,
} = require('./prompt-choices');
const {
  seeFirstTenDocuments,
  insertSampleDocument,
  deleteDocument,
  updateDocument,
} = require('../db/business-queries');

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
    name: 'manualQuery',
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
      return answers.initUserFlow === initUserFlowChoices.browse;
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
    type: 'list',
    name: 'locationType',
    message: 'Please specify how you want to enter your location',
    choices: Object.values(locationChoices),
    when: function (answers) {
      return answers.initUserFlow !== initUserFlowChoices.test;
    },
  },
];

async function runCliPrompts() {
  const answers = await inquirer.prompt(prompts);

  if (!answers.testQueries) {
    return;
  }

  let result;
  switch (answers.testQueries) {
    case testQueryChoices.showFirstTenDocuments:
      result = await seeFirstTenDocuments();
      console.log(result);
      break;
    case testQueryChoices.insertDocument:
      result = await insertSampleDocument();
      console.log(result);
      break;
    case testQueryChoices.deleteDocument:
      result = await deleteDocument();
      console.log(result);
      break;
    case testQueryChoices.updateDocument:
      result = await updateDocument();
      console.log('Document after updating:\n', result);
      break;
    default:
      console.error('This should not happen');
  }
}

module.exports = runCliPrompts;
