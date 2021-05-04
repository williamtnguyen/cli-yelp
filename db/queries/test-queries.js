const Business = require('../schemas/business');

/**
 * Test queries for intermediate report, interfaces businesses collection
 */

async function seeFirstTenDocuments() {
  const response = await Business.find({}).sort({ _id: 1 }).limit(10);
  return response;
}

async function insertSampleDocument() {
  const newDocument = new Business({
    business_id: '6iYb2HFDywm3zjuRg0shjw',
    name: 'Test Business',
    address: '123 Test Street',
    city: 'Test',
    state: 'CA',
    postal_code: '95121',
    latitude: 40.0175444,
    longitude: -105.2833481,
    stars: 5,
    review_count: 1,
    is_open: 1,
    categories: 'test, test, test, test',
  });
  const response = await newDocument.save();
  return response;
}

async function deleteDocument() {
  const documentToDelete = await Business.find({}).sort({ _id: -1 }).limit(1);
  console.log(documentToDelete)
  const response = await Business.deleteOne({ _id: documentToDelete._id });
  return response;
}

async function updateDocument() {
  const documentToUpdate = await Business.find({}).sort({ _id: -1 }).limit(1);
  console.log('Document that will be updated:\n', documentToUpdate);
  console.log("\nField that will be updated:\naddress: '123456789 Test Street'\n")
  const response = await Business.updateOne(
    { _id: documentToUpdate._id },
    { address: '123456789 Test Street' }
  );
  return response;
}

module.exports = {
  seeFirstTenDocuments,
  insertSampleDocument,
  deleteDocument,
  updateDocument,
};
