const mongoose = require('mongoose');

// GeoJSON point
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const BusinessSchema = new mongoose.Schema({
  business_id: String,
  name: String,
  address: String,
  city: String,
  state: String,
  postal_code: String,
  location: PointSchema,
  stars: Number,
  review_count: Number,
  is_open: Number,
  attributes: { type: mongoose.Schema.Types.Mixed, required: false }, // arbitrary object
  categories: String,
  hours: { type: mongoose.Schema.Types.Mixed, required: false }, // arbitrary object
});

module.exports = mongoose.model('Business', BusinessSchema);
