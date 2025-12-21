import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Static files
app.use('/uploads', express.static(uploadDir));

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
    console.log('Upload request received:', req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Multiple Upload Route
app.post('/api/upload-multiple', upload.array('images', 20), (req, res) => {
    if (!req.files || (req.files as any).length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    const files = req.files as Express.Multer.File[];
    const urls = files.map(file => `/uploads/${file.filename}`);
    res.json({ urls });
});

app.get('/api/stats', async (req, res) => {
    try {
        const [[{ counts: berita }]] = await pool.query('SELECT COUNT(*) as counts FROM berita') as any;
        const [[{ counts: agenda }]] = await pool.query('SELECT COUNT(*) as counts FROM agenda') as any;
        const [[{ counts: galeri }]] = await pool.query('SELECT COUNT(*) as counts FROM galeri') as any;
        const [[{ counts: programs }]] = await pool.query('SELECT COUNT(*) as counts FROM program_keahlian') as any;
        const [[{ counts: albums }]] = await pool.query('SELECT COUNT(*) as counts FROM album') as any;

        res.json({
            berita,
            agenda,
            galeri,
            programs,
            albums,
            siswa: 1250, // Static for now or fetch from another table
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
});

// Basic Route
app.get('/', (req, res) => {
    res.send('School Website API is running...');
});

// Berita Routes
app.get('/api/berita', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM berita ORDER BY date DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching berita', error });
    }
});

app.post('/api/berita', async (req, res) => {
    const { title, slug, excerpt, content, image, category, author, date } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO berita (title, slug, excerpt, content, image, category, author, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, slug, excerpt, content, image, category, author, date]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating berita', error });
    }
});

app.put('/api/berita/:id', async (req, res) => {
    const { id } = req.params;
    const { title, slug, excerpt, content, image, category, author, date } = req.body;
    try {
        await pool.query(
            'UPDATE berita SET title = ?, slug = ?, excerpt = ?, content = ?, image = ?, category = ?, author = ?, date = ? WHERE id = ?',
            [title, slug, excerpt, content, image, category, author, date, id]
        );
        res.json({ message: 'Berita updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating berita', error });
    }
});

app.delete('/api/berita/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM berita WHERE id = ?', [id]);
        res.json({ message: 'Berita deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting berita', error });
    }
});

app.patch('/api/berita/:id/view', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE berita SET views = views + 1 WHERE id = ?', [id]);
        res.json({ message: 'Views incremented' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating views', error });
    }
});

// Agenda Routes
app.get('/api/agenda', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM agenda ORDER BY date ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agenda', error });
    }
});

app.post('/api/agenda', async (req, res) => {
    const { title, date, end_date, location, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO agenda (title, date, end_date, location, description) VALUES (?, ?, ?, ?, ?)',
            [title, date, end_date, location, description]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating agenda', error });
    }
});

app.put('/api/agenda/:id', async (req, res) => {
    const { id } = req.params;
    const { title, date, end_date, location, description } = req.body;
    try {
        await pool.query(
            'UPDATE agenda SET title = ?, date = ?, end_date = ?, location = ?, description = ? WHERE id = ?',
            [title, date, end_date, location, description, id]
        );
        res.json({ message: 'Agenda updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating agenda', error });
    }
});

app.delete('/api/agenda/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM agenda WHERE id = ?', [id]);
        res.json({ message: 'Agenda deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting agenda', error });
    }
});

// Galeri Routes
app.get('/api/galeri', async (req, res) => {
    const { album_id } = req.query;
    try {
        let query = 'SELECT * FROM galeri';
        const params = [];
        if (album_id) {
            query += ' WHERE album_id = ?';
            params.push(album_id);
        }
        query += ' ORDER BY created_at DESC';
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching galeri', error });
    }
});

app.post('/api/galeri', async (req, res) => {
    const { title, category, image, album_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO galeri (title, category, image, album_id) VALUES (?, ?, ?, ?)',
            [title, category, image, album_id || null]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating galeri', error });
    }
});

app.delete('/api/galeri/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM galeri WHERE id = ?', [id]);
        res.json({ message: 'Galeri deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting galeri', error });
    }
});

// Album Routes
app.get('/api/albums', async (req, res) => {
    try {
        const [albums]: any = await pool.query('SELECT * FROM album ORDER BY date DESC');

        // Fetch items for each album
        for (let i = 0; i < albums.length; i++) {
            const [items] = await pool.query('SELECT * FROM galeri WHERE album_id = ?', [albums[i].id]);
            albums[i].items = items;
        }

        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching albums', error });
    }
});

app.get('/api/albums/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [albumRows]: any = await pool.query('SELECT * FROM album WHERE id = ?', [id]);
        if (albumRows.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const [itemRows] = await pool.query('SELECT * FROM galeri WHERE album_id = ?', [id]);
        res.json({ ...albumRows[0], items: itemRows });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching album details', error });
    }
});

app.get('/api/albums/slug/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const [albumRows]: any = await pool.query('SELECT * FROM album WHERE slug = ?', [slug]);
        if (albumRows.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const [itemRows] = await pool.query('SELECT * FROM galeri WHERE album_id = ?', [albumRows[0].id]);
        res.json({ ...albumRows[0], items: itemRows });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching album details', error });
    }
});

app.post('/api/albums', async (req, res) => {
    const { title, slug, cover_image, category, date, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO album (title, slug, cover_image, category, date, description) VALUES (?, ?, ?, ?, ?, ?)',
            [title, slug, cover_image, category, date, description]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating album', error });
    }
});

app.put('/api/albums/:id', async (req, res) => {
    const { id } = req.params;
    const { title, slug, cover_image, category, date, description } = req.body;
    try {
        await pool.query(
            'UPDATE album SET title = ?, slug = ?, cover_image = ?, category = ?, date = ?, description = ? WHERE id = ?',
            [title, slug, cover_image, category, date, description, id]
        );
        res.json({ message: 'Album updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating album', error });
    }
});

app.delete('/api/albums/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Set album_id to null for photos in this album instead of deleting them?
        // Or delete them? The user requested "manajemen album". Generally deleting album keeps photos? 
        // In the migration I set ON DELETE SET NULL.
        await pool.query('DELETE FROM album WHERE id = ?', [id]);
        res.json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting album', error });
    }
});

// Kategori Berita Routes
app.get('/api/kategori-berita', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM kategori_berita ORDER BY name ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

app.post('/api/kategori-berita', async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO kategori_berita (name) VALUES (?)', [name]);
        res.status(201).json({ id: (result as any).insertId, name });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
});

app.delete('/api/kategori-berita/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM kategori_berita WHERE id = ?', [id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});

// Program Routes
app.get('/api/programs', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM program_keahlian');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching programs', error });
    }
});

// Login Route (Basic)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows]: any = await pool.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            const user = rows[0];
            res.json({ id: user.id, username: user.username, name: user.name });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Login error', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
