const express = require('express');
const router = express.Router();
const showsController = require('../controller/showsController');


router.get('/', showsController.getAllShows);
router.get('/:showId', showsController.getOneShow);
router.get('/genre/:genre', showsController.getShowsByGenre);
router.put('/:showId/rating', showsController.updateShowRating);
router.put('/:showId/availability', showsController.updateShowAvailability);
router.delete('/:showId', showsController.deleteShow);


module.exports = router;