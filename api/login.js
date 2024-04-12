const express = require('express');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const connectDB = require('../db/db');

// Signup endpoint

exports.signUp = async (req, res) => {
    try {
        const pool = await connectDB();
        const { name, phone , email ,password } = req.query;

        // Check if user already exists in the database
        const userExistsQuery = 'SELECT * FROM public.users WHERE email = $1';
        const existingUser = await pool.query(userExistsQuery, [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user into the database
        const insertUserQuery = 'INSERT INTO public.users (name, phone, email , password) VALUES ($1, $2, $3, $4)';
        await pool.query(insertUserQuery, [name, phone, email, hashedPassword]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
};

// Login endpoint

exports.logIn = async (req, res) => {
    try {
        const pool = await connectDB();
        const { email, password } = req.query;

        // Find user in the database
        const findUserQuery = 'SELECT * FROM public.users WHERE email = $1';
        const userResult = await pool.query(findUserQuery, [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        console.log(passwordMatch)
        return res.status(201).json({ message: 'Suceess !!!!!' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};
