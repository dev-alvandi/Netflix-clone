const express = require('express');
const userRoutes = require('../controllers/UserController');

const router = express.Router();

router.post('/add', userRoutes.addToLikedMovies);

router.post('/remove', userRoutes.removeFromLikedMovies);

router.get('/likedMovies/:email', userRoutes.getLikedMovies);

module.exports = router;
