const initUserFlowChoices = {
  manual: 'Manually enter a query',
  browse: 'Browse available categories',
  test: 'Test DB connection and basic queries',
};
const testQueryChoices = {
  showFirstTenDocuments: 'See first 10 documents in DB',
  insertDocument: 'Insert a sample document',
  deleteDocument: 'Delete a document',
  updateDocument: 'Update a document',
};
const browseCategoryChoices = {
  allBusinesses: 'All businesses',
  restaurants: 'Restaurants',
  food: 'Food',
  bars: 'Bars',
};
const locationChoices = {
  stateCode: '2 character state code',
  postalCode: 'Postal code',
};

module.exports = {
  initUserFlowChoices,
  testQueryChoices,
  browseCategoryChoices,
  locationChoices,
};
