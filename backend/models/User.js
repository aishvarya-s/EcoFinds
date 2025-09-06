const connectDB = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    // Creates a new user in the database
    create: async ({ username, email, password }) => {
        const pool = await connectDB();
        try {
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(password, salt);
            const [result] = await pool.query(
                'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                [username, email, password_hash]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    // Finds a user by their email for login
    findByEmail: async (email) => {
        const pool = await connectDB();
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Finds a user by their ID
    findById: async (id) => {
        const pool = await connectDB();
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = User;