const { testQueryChoices } = require('../../prompts/prompt-choices');
const {
  seeFirstTenDocuments,
  insertSampleDocument,
  deleteDocument,
  updateDocument,
} = require('../queries/test-queries');

async function handleTestQuery (testQueries) {
	let result;
  switch (testQueries) {
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
      console.log('Update result:\n', result);
      break;
    default:
      console.error('This should not happen');
  }
}

module.exports = handleTestQuery;
