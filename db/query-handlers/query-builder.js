function buildBusQueryObj(userInputObj) {
  const queryObj = {};
  userInputObj.appliedBusinessFilters.forEach((filter) => {
    switch (filter) {
      case 'Location':
      // TODO
      case 'Average star rating':
        queryObj['stars'] = userInputObj['averageStarRating'];
        break;
      case 'Has delivery service':
        queryObj['attributes.RestaurantsDelivery'] = 'True';
        break;
      case 'Is open for business':
        queryObj['is_open'] = 1;
        break;
      case 'Has X number of reviews':
        queryObj['review_count'] = userInputObj['numberOfReviews'];
        break;
      case 'Allows dogs':
        queryObj['attributes.DogsAllowed'] = 'True';
        break;
      case 'Accepts credit card':
        queryObj['attributes.BusinessAcceptsCreditCards'] = 'True';
        break;
      case 'Has happy hour':
        queryObj['attributes.HappyHour'] = 'True';
        break;
    }
  });
  return queryObj;
}

function buildRevQueryObj(userInputObj) {
  const queryBundle = {
    businessFilter: {},
    reviewFilter: {},
  };
  appliedReviewFilters.forEach((filter) => {
    switch (filter) {
      case 'Location':
      // TODO
      case 'Average star rating':
        queryBundle['businessFilter']['stars'] =
          userInputObj['averageStarRating'];
      case 'Bad review sentiment':
      // TODO
      case 'Posted after date X':
      // TODO
      case 'Has delivery service':
        queryBundle['businessFilter']['attributes.RestaurantsDelivery'] =
          'True';
      case 'Serves alcohol':
      // TODO
    }
  });
}

module.exports = {
  buildBusQueryObj,
  buildRevQueryObj,
};
