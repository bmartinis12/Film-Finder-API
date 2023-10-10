const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Trending Searches 

let trendingMovieSchema = new Schema({
    imdbID: { type: String, required: true },
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Poster: { type: String, required: true },
    date: { type: Date, required: true }
});

let TrendingMovies = mongoose.model('TrendingMovies', trendingMovieSchema, 'trendingMovies');

module.exports = { TrendingMovies };