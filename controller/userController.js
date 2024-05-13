const { User, Show} = require('../models/index');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getOneUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if(!user) {
            res.status(404).send('no user with id found');
        }else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get shows that user watches
const getAllShowsWatchedByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, { include : [Show] });

        if(!user) {
            res.status(404).send('no user with id found');
        }else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update the shows user watched
const updateUserWatchedShows = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send(`No user found with id ${userId}`);
        }

        const { showId } = req.body;

        const show = await Show.findByPk(showId);

        if(!show) {
            return res.status(404).send(`${show} not found`);
        }

        // Here we add the show to the user's watched list
        await user.addShow(show);

        res.status(200).send('Show successfully added to user watched list');

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    getAllShowsWatchedByUser,
    updateUserWatchedShows
}
