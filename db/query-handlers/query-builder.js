function buildBusQueryObj(userInputObj) {
  const queryObj = {};
  userInputObj.appliedBusinessFilters.forEach((filter) => {
    switch (filter) {
      case 'Location':
        switch (userInputObj.locationType) {
          case '2 character state code':
            queryObj['state'] = userInputObj['locationStateCode'];
            break;
          case 'Latitude/longitude coordinates':
            const coordinates = userInputObj['locationCoordinates'].split(',');
            queryObj['location'] = {
              $near: {
                $geometry: { type: 'Point', coordinates },
                $maxDistance: userInputObj['maxDistanceFromCoordinates'],
              },
            };
            break;
        }
        break;
      case 'Average star rating':
        queryObj['stars'] = userInputObj['averageStarRating'];
        break;
      case 'Has delivery service':
        queryObj['attributes.RestaurantsDelivery'] = 'True';
        break;
      case 'Is open for business':
        queryObj['is_open'] = 1;
        break;
      case 'Has greater than X number of reviews':
        queryObj['review_count'] = { $gte: userInputObj['numberOfReviews'] };
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
  userInputObj.appliedReviewFilters.forEach((filter) => {
    switch (filter) {
      case 'Location':
        switch (userInputObj.locationType) {
          case '2 character state code':
            queryBundle['businessFilter']['state'] =
              userInputObj['locationStateCode'];
            break;
          case 'Latitude/longitude coordinates':
            const coordinates = userInputObj['locationCoordinates'].split(',');
            queryBundle['businessFilter']['location'] = {
              $near: {
                $geometry: { type: 'Point', coordinates },
                $maxDistance: userInputObj['maxDistanceFromCoordinates'],
              },
            };
            break;
        }
        break;
      case 'Average star rating':
        queryBundle['businessFilter']['stars'] =
          userInputObj['averageStarRating'];
        break;
      case 'Good review sentiment':
        queryBundle['reviewFilter'] = {
          $text: {
            $search: 'good',
          },
        };
        break;
      case 'Posted after date X':
        queryBundle['reviewFilter'] = {
          date: {
            $gte: new Date(userInputObj['timestamp']),
          },
        };
        break;
      case 'Has delivery service':
        queryBundle['businessFilter']['attributes.RestaurantsDelivery'] =
          'True';
        break;
      case 'Serves alcohol':
        queryBundle['businessFilter']['attributes.Alcohol'] = {
          $ne: "u'none",
        };
        break;
    }
  });
  return queryBundle;
}

module.exports = {
  buildBusQueryObj,
  buildRevQueryObj,
};
