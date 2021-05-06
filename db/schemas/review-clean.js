const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review_id: String,
  user_id: String,
  business_id: String,
  stars: Number,
  useful: Number,
  funny: Number,
  cool: Number,
  text: String,
  date: Date,
});

module.exports = mongoose.model('Review', ReviewSchema);
