const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getOneUser);
router.get('/:userId/shows', userController.getAllShowsWatchedByUser);
router.put('/:userId/show', userController.updateUserWatchedShows);

module.exports = router;
