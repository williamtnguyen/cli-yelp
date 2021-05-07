const { buildBusQueryObj } = require('./query-builder');
const Business = require('../schemas/business-clean');

async function handleBusinessQuery(userInputObj) {
  const queryObj = buildBusQueryObj(userInputObj);
  const result = await Business.find(queryObj).limit(5);
  console.log(result);
}

module.exports = handleBusinessQuery;
