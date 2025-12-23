import express from 'express';
import pool from './config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

console.log('ENV CHECK:', {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET?.substring(0, 10) + '...',
    CLIENT_URL: process.env.CLIENT_URL
});

const app = express();
const PORT = process.env.PORT || 5005;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

app.use((req, res, next) => {
    console.log('RECEIVING:', req.method, req.path);
    next();
});

app.use(express.json());

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('MINIMAL LOGIN ATTEMPT:', username);
    try {
        const [rows]: any = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const admin = rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            token,
            user: {
                id: admin.id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (error: any) {
        console.error('MINIMAL LOGIN ERROR:', error);
        if (error.stack) console.error('STACK:', error.stack);
        res.status(500).json({ message: 'Server error', error: error.message || error, stack: error.stack });
    }
});

app.get('/test-ping', (req, res) => {
    res.send('PONG');
});

app.listen(PORT, () => {
    console.log(`Minimal server running on port ${PORT}`);
});
