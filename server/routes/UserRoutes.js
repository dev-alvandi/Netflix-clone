const express = require('express');
const userRoutes = require('../controllers/UserController');

const router = express.Router();

router.post('/add', userRoutes.addToLikedMovies);

router.put('/likedMovies/remove', userRoutes.removeFromLikedMovies);

router.get('/likedMovies/:email', userRoutes.getLikedMovies);

module.exports = router;
