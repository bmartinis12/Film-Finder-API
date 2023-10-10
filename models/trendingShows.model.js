const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Trending Searches 

let trendingShowSchema = new Schema({
    imdbID: { type: String, required: true },
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Poster: { type: String, required: true },
    date: { type: Date, required: true }
});

let TrendingShows = mongoose.model('TrendingShows', trendingShowSchema, 'trendingShows');

module.exports = { TrendingShows };