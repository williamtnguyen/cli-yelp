const { buildRevQueryObj } = require('./query-builder');
const Business = require('../schemas/business-clean');
const Review = require('../schemas/review-clean');

async function handleReviewQuery(userInputObj) {
  const { businessFilter, reviewFilter } = buildRevQueryObj(userInputObj);
  if (!isEmpty(businessFilter)) {
    try {
      const businessResult = await Business.find(businessFilter);
      const { business_id } = businessResult;
      const reviewResult = await Review.find({ business_id }).limit(5);
      console.log(reviewResult);
    } catch (error) {
      console.error('dang');
    }
  } else {
    try {
      const reviewResult = await Review.find(reviewFilter).limit(5);
      console.log(reviewResult);
    } catch (error) {
      console.error('dang');
    }
  }
}

function isEmpty(filterObj) {
  return Object.keys(filterObj).length === 0;
}

module.exports = handleReviewQuery;
