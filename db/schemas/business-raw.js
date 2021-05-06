const mongoose = require('mongoose');

// schema before transforming lat/lng to geojson
const BusinessSchema = new mongoose.Schema({
  business_id: String,
  name: String,
  address: String,
  city: String,
  state: String,
  postal_code: String,
  latitude: Number, // float --> string
  longitude: Number, // float --> string
  stars: Number,
  review_count: Number,
  is_open: Number,
  attributes: { type: mongoose.Schema.Types.Mixed, required: false }, // arbitrary object
  categories: String,
  hours: { type: mongoose.Schema.Types.Mixed, required: false }, // arbitrary object
});

module.exports = mongoose.model('BusinessRaw', BusinessSchema);
