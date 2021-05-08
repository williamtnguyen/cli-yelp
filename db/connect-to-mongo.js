const mongoose = require('mongoose');
require('dotenv').config();

// makes a connection to MongoDB, locally or remotely
function connectToMongo(callbackFunction) {
  // conditional connection URI, localhost if dev, EC2 ipv4 dns if "prod"
  const connectionUri =
    process.env.NODE_ENV === 'production'
      ? process.env.DB_HOST
      : 'mongodb://localhost:27017/yelp_data';
  mongoose
    .connect(connectionUri, {
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
