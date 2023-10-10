// Fetch movies api

const getMovie = async (req, res) => {
    try {
        const query = req.params.query;
        const response = await fetch(`http://www.omdbapi.com?apiKey=${process.env.APIKEY}&s=${query}&type=movie`);
        const movieData = await response.json();
        res.status(200).json(movieData);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// Fetch shows api

const getShow = async (req, res) => {
    try {
        const query = req.params.query;
        const response = await fetch(`http://www.omdbapi.com?apiKey=${process.env.APIKEY}&s=${query}&type=series`);
        const showData = await response.json();
        res.status(200).json(showData);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};


module.exports = { getMovie, getShow };
