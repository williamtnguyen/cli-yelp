const { buildRevQueryObj } = require('./query-builder');
const Review = require('../schemas/review-clean');

async function handleReviewQuery(userInputObj) {
  const queryObj = buildRevQueryObj(userInputObj);
  console.log(queryObj);
  // TODO
}

module.exports = handleReviewQuery;
