// controller/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUserModel } from '../postgres/postgres.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';
const JWT_EXPIRES_IN = '1d'; // Or use process.env.JWT_EXPIRES_IN

// @route   POST /auth/register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await AuthUserModel.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await AuthUserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// @route   POST /auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthUserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};
