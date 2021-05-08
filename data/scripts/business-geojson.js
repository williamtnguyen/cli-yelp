const fs = require('fs');

const rawBusData = fs.readFileSync(
  '../raw/yelp_academic_dataset_business.json'
);

// convert newline delimted JSON to JSON arr
const jsonDerulo = [];
rawBusData
  .toString()
  .split('\n')
  .forEach((stringObj, index) => {
    try {
      const parsed = JSON.parse(stringObj);
      const transformed = transformCoordsToGeoJSON(parsed);
      jsonDerulo.push(transformed);
    } catch (error) {
      console.log(`Could not parse document #${index}`);
    }
  });
fs.writeFileSync(
  '../clean/yelp_academic_dataset_business.json',
  JSON.stringify(jsonDerulo),
  null,
  4
);
console.log('Data successfully transformed!!');

// Transform lat lng fields of a yelp business obj
// to geojson format for mongodb geospatial queries
function transformCoordsToGeoJSON(yelpBusObj) {
  if (yelpBusObj['latitude'] && yelpBusObj['longitude']) {
    yelpBusObj.location = {
      type: 'Point',
      coordinates: [yelpBusObj['longitude'], yelpBusObj['latitude']],
    };
    delete yelpBusObj['longitude'];
    delete yelpBusObj['latitude'];

    return yelpBusObj;
  }
}
