const { Users } = require('../models/user.model');

// Read the data of signed in user

const getCurrentUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update user saved films 

const savedFilms = async (req, res) => {
    try {
        const { userId, film } = req.body;
        const user = await Users.findById(userId);
        const isSaved = user.saved.findIndex(data => data.imdbID === film.imdbID);

        if(isSaved === -1) {
            user.saved.unshift(film);
        } else {
            user.saved.splice(isSaved, 1);
        }

        const updateSaved = await Users.findByIdAndUpdate(
            userId,
            { saved: user.saved},
            { new: true }
        );


        res.status(200).json(updateSaved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { getCurrentUser, savedFilms };