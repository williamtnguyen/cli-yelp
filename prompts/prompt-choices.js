const initUserFlowChoices = {
  manual: 'Manually search for a business',
  businesses: 'Browse businesses',
  reviews: 'Browse reviews on businesses',
  test: 'Test DB connection and basic queries',
};
// just for show haha
const browseCategoryChoices = {
  allBusinesses: 'All businesses',
  restaurants: 'Restaurants',
  food: 'Food',
  bars: 'Bars',
};
const testQueryChoices = {
  showFirstTenDocuments: 'See first 10 documents in DB',
  insertDocument: 'Insert a sample document',
  deleteDocument: 'Delete a document',
  updateDocument: 'Update a document',
};
const businessFilterChoices = [
  { name: 'Location' },
  { name: 'Average star rating' },
  { name: 'Has delivery service' },
  { name: 'Is open for business' },
  { name: 'Has greater than X number of reviews' },
  { name: 'Allows dogs' },
  { name: 'Accepts credit card' }, // location 2 options
  { name: 'Has happy hour' }, // location 2 options
];
const reviewFilterChoices = [
  { name: 'Location' },
  { name: 'Average star rating' }, // location 2 options
  { name: 'Good review sentiment' },
  { name: 'Posted after date X' }, // still needa make prompt for this
  { name: 'Has delivery service' },
  { name: 'Serves alcohol' },
];
const locationChoices = {
  stateCode: '2 character state code',
  latLngCoord: 'Latitude/longitude coordinates',
};

module.exports = {
  initUserFlowChoices,
  testQueryChoices,
  browseCategoryChoices,
  locationChoices,
  businessFilterChoices,
  reviewFilterChoices,
};
