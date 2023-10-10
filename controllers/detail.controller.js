const { Reviews } = require('../models/review.model');
const { Users } = require('../models/user.model');

// Read the data of a specific movie

const getDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const response= await fetch(`http://www.omdbapi.com?apiKey=${process.env.APIKEY}&i=${id}&plot=full`);
        const detailData = await response.json();
        res.status(200).json(detailData);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Read the reviews of a specfic movies 

const getReviews = async (req, res) => {
    try {
        const id = req.params.id;
        let reviewsResponse = await Reviews.findOne({ imdbID: id });
        if(reviewsResponse === null) {
            const newReview = new Reviews({
                imdbID: id,
            });
            reviewsResponse = await newReview.save();
        }
        res.status(200).json(reviewsResponse)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update reviews 

const updateReviews = async (req, res) => {
    try {
        const id = req.params.id;
        const { review } = req.body;
        const detailedPageReviews = await Reviews.findOne({ imdbID: id});
        detailedPageReviews.reviews.unshift({
            username: review.username,
            rating: review.rating,
            text: review.text
        });

        const updatedReviews = await Reviews.findByIdAndUpdate(
            detailedPageReviews._id,
            { reviews: detailedPageReviews.reviews },
            { new: true }
        );

        const userReviews = await Users.findOne({ username: review.username });
        userReviews.reviews.unshift({
            imdbID: id,
            ...review
        });

        const updateUserReviews = await Users.findOneAndUpdate(
            { username: review.username },
            { reviews: userReviews.reviews },
        );

        res.status(201).json(updatedReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { getDetails, getReviews, updateReviews };
