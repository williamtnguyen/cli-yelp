// makes a connection to MongoDB, locally or remotely
const mongoose = require('mongoose');

function connectToMongo(callbackFunction) {
  mongoose
    // TODO: conditional connection URI, localhost if dev, EC2 ipv4 dns if "prod"
    .connect('mongodb://localhost:27017/yelp_data', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Successfully connected to MongoDB!\n');
      callbackFunction();
    })
    .catch((error) => {
      throw new Error(error);
    });
}

module.exports = connectToMongo;
