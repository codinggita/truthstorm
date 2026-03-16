import User from './models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const testUser = async () => {
    console.log('Testing User model and bcryptjs...');
    try {
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('Hashed password:', hashedPassword);
        
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Password match:', isMatch);
        
        console.log('User model loaded:', !!User);
    } catch (err) {
        console.error('Test error:', err);
    }
};

testUser();
