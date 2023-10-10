const { TrendingShows } = require('../models/trendingShows.model');
const { TrendingMovies } = require('../models/trendingMovies.model');

// Read trending shows from database 

const getTrendingShows = async (req, res) => {
    try {
        const trendingShowList = await TrendingShows.find().sort({_id:-1});
        res.status(200).json(trendingShowList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Read trending movies from database 

const getTrendingMovies = async (req, res) => {
    try {
        const trendingMovieList = await TrendingMovies.find().sort({_id:-1});
        res.status(200).json(trendingMovieList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Update trending show list 

const updateTrendingShowList = async (req, res) => {
    try {
        const { imdbID } = req.body;

        const findShow = await TrendingShows.find({ imdbID });
        const count = await TrendingShows.countDocuments({});

        if(count > 9 && findShow.length == 0){
            let oldestSearch = await TrendingShows.find().sort({ date: 1 }).limit(1);
            await TrendingShows.deleteOne({ imdbID: oldestSearch[0].imdbID });
        }

        if(findShow.length == 0){
            let newTrendingShow = new TrendingShows({
                imdbID: req.body.imdbID,
                Title: req.body.title,
                Year: req.body.year,
                Poster: req.body.poster,
                date: new Date(),
            });
    
            await newTrendingShow.save();
            const editedList = removeDuplicates(TrendingShows);
            res.status(201).json(editedList);
        } else {
            res.status(200).send('Already added');
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update trending movie list 

const updateTrendingMovieList = async (req, res) => {
    try {
        let { imdbID } = req.body;

        let findMovie = await TrendingMovies.find({ imdbID });
        let count = await TrendingMovies.countDocuments({});

        if(count > 9 && findMovie.length == 0){
            let oldestSearch = await TrendingMovies.find().sort({ date: 1 }).limit(1);
            await TrendingMovies.deleteOne({ imdbID: oldestSearch[0].imdbID });
        }

        if(findMovie.length == 0){
            let newTrendingMovie = new TrendingMovies({
                imdbID: req.body.imdbID,
                Title: req.body.title,
                Year: req.body.year,
                Poster: req.body.poster,
                date: new Date(),
            });

            await newTrendingMovie.save();
            const editedList = removeDuplicates(TrendingMovies);
            res.status(201).json(editedList);
        } else {
            res.status(200).send('Already added');
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


async function removeDuplicates(collection){
    let data = await collection.find({});
    return data.forEach(async (film) => {
        let findDup = await collection.find({ imdbID: film.imdbID});
        if(findDup.length > 1){
            await collection.deleteOne(findDup[1]);
        }
    });
};

module.exports = { getTrendingMovies, getTrendingShows, updateTrendingMovieList, updateTrendingShowList };