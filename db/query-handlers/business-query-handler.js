const { buildBusQueryObj } = require('./query-builder');
const Business = require('../schemas/business-clean');

async function handleBusinessQuery(userInputObj) {
  try {
    const queryObj = buildBusQueryObj(userInputObj);
    const result = await Business.find(queryObj).limit(5);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleBusinessQuery;
