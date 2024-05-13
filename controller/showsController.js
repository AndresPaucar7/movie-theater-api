const { Show } = require('../models');

// Get all the shows
const getAllShows = async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).send(error)
    }
};

// Get show using ID
const getOneShow = async (req, res) => {
    try {
        const showId = req.params.showId;
        const show = await Show.findByPk(showId);

        if(!show){
            res.status(404).send(`No show with id ${showId}`);
        } else {
            res.status(200).json(show);
        }
    } catch (error) {
        
    }
}

const getShowsByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const shows = await Show.findAll({where: {genre: genre}});

        res.status(200).json(shows);
    } catch (error) {
        res.status(500).end(error);
    }
};

const updateShowRating = async (req, res) => {
    try {
        const showId = req.params.showId;
        const { rating } = req.body;

        const show = await Show.findByPk(showId);

        if (!show) {
            return res.status(404).send(`Show with id ${showId} not found`);
        }

        // Update the rating of the show
        show.rating = rating;
        await show.save();

        res.status(200).send('Show rating has been updated');
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update the show's availability
const updateShowAvailability = async (req, res) => {
    try {
        const showId = req.params.showId;
        const { available } = req.body;

        const show = await Show.findByPk(showId);

        if (!show) {
            return res.status(404).send(`Show with id ${showId} could not be found`);
        }

        // Update the availability status of the show
        show.available = available;
        await show.save();

        res.status(200).send('Show availability has been updated');
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete show using id
const deleteShow = async (req, res) => {
    try {
        const showId = req.params.showId;
        const show = await Show.findByPk(showId);

        if(!show){
            res.status(404).send(`No show with id ${showId}`);
        }
        await show.destroy();
        res.status(200).json(`${show} has been deleted`);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getAllShows,
    getOneShow,
    getShowsByGenre,
    updateShowRating,
    updateShowAvailability,
    deleteShow
};