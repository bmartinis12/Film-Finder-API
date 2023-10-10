const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Movie and Show reviews

let reviewsSchema = new Schema({
    imdbID: { type: String, required: true },
    reviews: { type: Array, default: [] },
}, { timestamps: true});

let Reviews = mongoose.model('Reviews', reviewsSchema, 'reviews');

module.exports = { Reviews };