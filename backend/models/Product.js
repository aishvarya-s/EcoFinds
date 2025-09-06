const connectDB = require('../config/db');

const Product = {
    // Create a new product listing
    create: async ({ title, description, price, category, image_url, seller_id }) => {
        const pool = await connectDB();
        try {
            const [result] = await pool.query(
                'INSERT INTO products (title, description, price, category, image_url, seller_id) VALUES (?, ?, ?, ?, ?, ?)',
                [title, description, price, category, image_url, seller_id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    // Find all products
    findAll: async () => {
        const pool = await connectDB();
        try {
            const [rows] = await pool.query('SELECT * FROM products');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Find a single product by ID
    findById: async (id) => {
        const pool = await connectDB();
        try {
            const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Find all products by a specific seller
    findBySellerId: async (seller_id) => {
        const pool = await connectDB();
        try {
            const [rows] = await pool.query('SELECT * FROM products WHERE seller_id = ?', [seller_id]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Update an existing product
    update: async (id, { title, description, price, category, image_url }) => {
        const pool = await connectDB();
        try {
            const [result] = await pool.query(
                'UPDATE products SET title = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?',
                [title, description, price, category, image_url, id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    // Delete a product
    delete: async (id) => {
        const pool = await connectDB();
        try {
            const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Product;