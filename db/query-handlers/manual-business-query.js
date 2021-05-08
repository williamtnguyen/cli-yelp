const Business = require('../schemas/business-clean');

async function handleManualBusQuery(userInputObj) {
  try {
    const queryObj = {
      $text: {
        $search: userInputObj['manualBusinessQuery'],
      },
    };
    const result = await Business.find(queryObj).limit(5);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleManualBusQuery;
