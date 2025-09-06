const connectDB = require('../config/db');

const Favorites = {
    // Add a product to a user's favorites list
    addFavorite: async (userId, productId) => {
        const pool = await connectDB();
        try {
            const [result] = await pool.query(
                'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
                [userId, productId]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    // Find all favorite products for a user
    findFavoritesByUser: async (userId) => {
        const pool = await connectDB();
        try {
            const [rows] = await pool.query(
                `SELECT p.* FROM products p
                 JOIN favorites f ON p.id = f.product_id
                 WHERE f.user_id = ?`,
                [userId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Remove a product from a user's favorites list
    removeFavorite: async (userId, productId) => {
        const pool = await connectDB();
        try {
            const [result] = await pool.query(
                'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Favorites;