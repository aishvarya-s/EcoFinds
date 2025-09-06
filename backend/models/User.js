const connectDB = require('../config/db');
const bcrypt = require('bcrypt');

const pool = connectDB();

const User = {
    // Function to create a new user in the database
    create: async ({ username, email, password }) => {
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

    // Function to find a user by their email
    findByEmail: async (email) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0]; // Returns the first user found or undefined
        } catch (error) {
            throw error;
        }
    },

    // Function to find a user by their ID
    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = User;