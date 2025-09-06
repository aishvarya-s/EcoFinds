const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/products
// @desc    Create a product listing (Protected)
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, price, category, image_url } = req.body;
    try {
        const result = await Product.create({
            title,
            description,
            price,
            category,
            image_url,
            seller_id: req.user.id
        });
        res.status(201).json({ msg: 'Product created', productId: result.insertId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/products
// @desc    Get all product listings (Public)
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/products/:id
// @desc    Get a single product listing (Public)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product listing (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, price, category, image_url } = req.body;
    try {
        const result = await Product.update(req.params.id, {
            title,
            description,
            price,
            category,
            image_url
        });
        res.json({ msg: 'Product updated' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product listing (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Product.delete(req.params.id);
        res.json({ msg: 'Product deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;