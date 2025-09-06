const express = require('express');
const router = express.Router();
const Favorites = require('../models/Favorites');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/favorites
// @desc    Add a product to user's favorites
router.post('/', authMiddleware, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
        await Favorites.addFavorite(userId, productId);
        res.status(201).json({ msg: 'Product added to favorites' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/favorites
// @desc    Get all favorite products for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const favoriteProducts = await Favorites.findFavoritesByUser(userId);
        res.json(favoriteProducts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/favorites/:productId
// @desc    Remove a product from favorites
router.delete('/:productId', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    try {
        await Favorites.removeFavorite(userId, productId);
        res.json({ msg: 'Product removed from favorites' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;