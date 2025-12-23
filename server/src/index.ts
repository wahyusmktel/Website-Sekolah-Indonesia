import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from './config/db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// -- SECURITY MIDDLEWARE --
// 1. Helmet for secure headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow images to be loaded
}));

// 2. CORS configuration
const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://site.smktelkom-lpg.id',
    'http://site.smktelkom-lpg.id',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8080',
    'http://127.0.0.1:8080'
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS Policy Error'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// 3. Rate Limiting
// Stricter limit for login/auth routes to prevent brute force
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 attempts per 15 minutes
    message: 'Terlalu banyak percobaan login, silakan coba lagi setelah 15 menit'
});

// General limit for other API routes (relaxed for better UX during content management)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased to 1000 requests per 15 minutes
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/auth/', authLimiter);
app.use('/api/', apiLimiter);

// 4. HPP - HTTP Parameter Pollution protection
app.use(hpp());

app.use(express.json({ limit: '10mb' })); // Limit body size

// -- AUTH MIDDLEWARE --
const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

const checkRole = (roles: string[]) => {
    return (req: any, res: any, next: any) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }
        next();
    };
};

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

// -- ADMIN PROFILE ROUTES (Must be before global middleware) --
app.put('/api/admin/profile/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, username } = req.body;

    try {
        // Check if username already exists for another user
        const [existingUser]: any = await pool.query(
            'SELECT id FROM admins WHERE username = ? AND id != ?',
            [username, id]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username sudah digunakan' });
        }

        await pool.query(
            'UPDATE admins SET name = ?, username = ? WHERE id = ?',
            [name, username, id]
        );

        res.json({ message: 'Profil berhasil diperbarui', name, username });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

app.put('/api/admin/password/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        // Get current admin data
        const [rows]: any = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Admin tidak ditemukan' });
        }

        const admin = rows[0];

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password lama tidak sesuai' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await pool.query(
            'UPDATE admins SET password = ? WHERE id = ?',
            [hashedPassword, id]
        );

        res.json({ message: 'Password berhasil diubah' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error });
    }
});


// -- AUTHENTICATION & PROTECTION --
// Protect all data-modifying routes and sensitive data
app.post(/^\/api\/.*/, (req, res, next) => {
    // Skip auth for login
    if (req.path === '/api/auth/login') return next();
    authMiddleware(req, res, next);
});
app.put(/^\/api\/.*/, authMiddleware);
app.patch(/^\/api\/.*/, authMiddleware);
app.delete(/^\/api\/.*/, authMiddleware);

// Protect sensitive GET routes
app.get('/api/messages', authMiddleware);

// Upload Route (Protected)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
    console.log('Upload request received:', req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Multiple Upload Route (Protected)
app.post('/api/upload-multiple', authMiddleware, upload.array('images', 20), (req, res) => {
    if (!req.files || (req.files as any).length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    const files = req.files as Express.Multer.File[];
    const urls = files.map(file => `/uploads/${file.filename}`);
    res.json({ urls });
});

// Basic Route
app.get('/', (req, res) => {
    res.send('School Website API is running...');
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.get('/api/auth/verify', authMiddleware, (req: any, res) => {
    res.json({ valid: true, user: req.user });
});


app.get('/api/stats', authMiddleware, async (req, res) => {
    try {
        const [[{ counts: berita }]] = await pool.query('SELECT COUNT(*) as counts FROM berita') as any;
        const [[{ counts: agenda }]] = await pool.query('SELECT COUNT(*) as counts FROM agenda') as any;
        const [[{ counts: galeri }]] = await pool.query('SELECT COUNT(*) as counts FROM galeri') as any;
        const [[{ counts: programs }]] = await pool.query('SELECT COUNT(*) as counts FROM program_keahlian') as any;
        const [[{ counts: albums }]] = await pool.query('SELECT COUNT(*) as counts FROM album') as any;
        const [[{ counts: heroSlides }]] = await pool.query('SELECT COUNT(*) as counts FROM hero_slides') as any;
        const [[{ counts: keunggulan }]] = await pool.query('SELECT COUNT(*) as counts FROM keunggulan') as any;
        const [[{ counts: sambutan }]] = await pool.query('SELECT COUNT(*) as counts FROM sambutan') as any;
        const [[{ counts: statistik }]] = await pool.query('SELECT COUNT(*) as counts FROM statistik') as any;
        const [[{ counts: fasilitas }]] = await pool.query('SELECT COUNT(*) as counts FROM fasilitas') as any;
        const [[{ counts: prestasi }]] = await pool.query('SELECT COUNT(*) as counts FROM prestasi') as any;
        const [[{ counts: messages }]] = await pool.query('SELECT COUNT(*) as counts FROM messages WHERE is_read = 0') as any;

        // Try to get specific "siswa" count from statistik table if it exists
        const [siswaRows]: any = await pool.query('SELECT value FROM statistik WHERE label LIKE "%Siswa%" LIMIT 1');
        const siswaValue = siswaRows.length > 0 ? siswaRows[0].value : 0;

        res.json({
            berita,
            agenda,
            galeri,
            programs,
            albums,
            heroSlides,
            keunggulan,
            prestasi,
            messages,
            fasilitas,
            siswa: parseInt(siswaValue as string) || 0,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
});

// Basic Route
app.get('/', (req, res) => {
    res.send('School Website API is running...');
});

// Hero Slides Routes
app.get('/api/hero-slides', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hero slides', error });
    }
});

app.post('/api/hero-slides', async (req, res) => {
    const { title, subtitle, image, cta, cta_link, tag } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO hero_slides (title, subtitle, image, cta, cta_link, tag) VALUES (?, ?, ?, ?, ?, ?)',
            [title, subtitle, image, cta, cta_link, tag]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating hero slide', error });
    }
});

app.put('/api/hero-slides/:id', async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, image, cta, cta_link, tag } = req.body;
    try {
        await pool.query(
            'UPDATE hero_slides SET title = ?, subtitle = ?, image = ?, cta = ?, cta_link = ?, tag = ? WHERE id = ?',
            [title, subtitle, image, cta, cta_link, tag, id]
        );
        res.json({ message: 'Hero slide updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating hero slide', error });
    }
});

app.delete('/api/hero-slides/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM hero_slides WHERE id = ?', [id]);
        res.json({ message: 'Hero slide deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hero slide', error });
    }
});

// Keunggulan Routes
app.get('/api/keunggulan', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM keunggulan ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching keunggulan', error });
    }
});

app.post('/api/keunggulan', async (req, res) => {
    const { icon, title, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO keunggulan (icon, title, description) VALUES (?, ?, ?)',
            [icon, title, description]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating keunggulan', error });
    }
});

app.put('/api/keunggulan/:id', async (req, res) => {
    const { id } = req.params;
    const { icon, title, description } = req.body;
    try {
        await pool.query(
            'UPDATE keunggulan SET icon = ?, title = ?, description = ? WHERE id = ?',
            [icon, title, description, id]
        );
        res.json({ message: 'Keunggulan updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating keunggulan', error });
    }
});

app.delete('/api/keunggulan/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM keunggulan WHERE id = ?', [id]);
        res.json({ message: 'Keunggulan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting keunggulan', error });
    }
});

// Sambutan Routes
app.get('/api/sambutan', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sambutan LIMIT 1');
        res.json((rows as any)[0] || null);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sambutan', error });
    }
});

app.post('/api/sambutan', async (req, res) => {
    const { principal_name, principal_role, principal_image, title, greeting, content, quote_footer } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO sambutan (principal_name, principal_role, principal_image, title, greeting, content, quote_footer) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [principal_name, principal_role, principal_image, title, greeting, content, quote_footer]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sambutan', error });
    }
});

app.put('/api/sambutan/:id', async (req, res) => {
    const { id } = req.params;
    const { principal_name, principal_role, principal_image, title, greeting, content, quote_footer } = req.body;
    try {
        await pool.query(
            'UPDATE sambutan SET principal_name = ?, principal_role = ?, principal_image = ?, title = ?, greeting = ?, content = ?, quote_footer = ? WHERE id = ?',
            [principal_name, principal_role, principal_image, title, greeting, content, quote_footer, id]
        );
        res.json({ message: 'Sambutan updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sambutan', error });
    }
});

// Statistik Routes
app.get('/api/statistik', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM statistik ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistik', error });
    }
});

app.post('/api/statistik', async (req, res) => {
    const { label, value, icon, suffix } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO statistik (label, value, icon, suffix) VALUES (?, ?, ?, ?)',
            [label, value, icon, suffix]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating statistik', error });
    }
});

app.put('/api/statistik/:id', async (req, res) => {
    const { id } = req.params;
    const { label, value, icon, suffix } = req.body;
    try {
        await pool.query(
            'UPDATE statistik SET label = ?, value = ?, icon = ?, suffix = ? WHERE id = ?',
            [label, value, icon, suffix, id]
        );
        res.json({ message: 'Statistik updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating statistik', error });
    }
});

app.delete('/api/statistik/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM statistik WHERE id = ?', [id]);
        res.json({ message: 'Statistik deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting statistik', error });
    }
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
        const [rows] = await pool.query('SELECT * FROM program_keahlian ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching programs', error });
    }
});

app.post('/api/programs', async (req, res) => {
    const { name, slug, short_desc, description, image, icon, prospects, key_techs } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO program_keahlian (name, slug, short_desc, description, image, icon, prospects, key_techs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, slug, short_desc, description, image, icon, JSON.stringify(prospects), JSON.stringify(key_techs)]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating program', error });
    }
});

app.put('/api/programs/:id', async (req, res) => {
    const { id } = req.params;
    const { name, slug, short_desc, description, image, icon, prospects, key_techs } = req.body;
    try {
        await pool.query(
            'UPDATE program_keahlian SET name = ?, slug = ?, short_desc = ?, description = ?, image = ?, icon = ?, prospects = ?, key_techs = ? WHERE id = ?',
            [name, slug, short_desc, description, image, icon, JSON.stringify(prospects), JSON.stringify(key_techs), id]
        );
        res.json({ message: 'Program updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating program', error });
    }
});

app.delete('/api/programs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM program_keahlian WHERE id = ?', [id]);
        res.json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting program', error });
    }
});

// Testimoni Routes
app.get('/api/testimoni', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM testimoni ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimoni', error });
    }
});

app.post('/api/testimoni', async (req, res) => {
    const { name, role, content, image } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO testimoni (name, role, content, image) VALUES (?, ?, ?, ?)',
            [name, role, content, image]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating testimoni', error });
    }
});

app.put('/api/testimoni/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, content, image } = req.body;
    try {
        await pool.query(
            'UPDATE testimoni SET name = ?, role = ?, content = ?, image = ? WHERE id = ?',
            [name, role, content, image, id]
        );
        res.json({ message: 'Testimoni updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating testimoni', error });
    }
});

app.delete('/api/testimoni/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM testimoni WHERE id = ?', [id]);
        res.json({ message: 'Testimoni deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting testimoni', error });
    }
});

// -- USER MANAGEMENT ROUTES --
app.get('/api/admin/users', authMiddleware, checkRole(['superadmin']), async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, name, role, created_at FROM admins ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.post('/api/admin/users', authMiddleware, checkRole(['superadmin']), async (req, res) => {
    const { username, name, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO admins (username, name, password, role) VALUES (?, ?, ?, ?)',
            [username, name, hashedPassword, role]
        );
        res.status(201).json({ id: (result as any).insertId, username, name, role });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

app.put('/api/admin/users/:id', authMiddleware, checkRole(['superadmin']), async (req, res) => {
    const { id } = req.params;
    const { username, name, password, role } = req.body;
    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'UPDATE admins SET username = ?, name = ?, password = ?, role = ? WHERE id = ?',
                [username, name, hashedPassword, role, id]
            );
        } else {
            await pool.query(
                'UPDATE admins SET username = ?, name = ?, role = ? WHERE id = ?',
                [username, name, role, id]
            );
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

app.delete('/api/admin/users/:id', authMiddleware, checkRole(['superadmin']), async (req: any, res) => {
    const { id } = req.params;
    try {
        // Prevent deleting self
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }
        await pool.query('DELETE FROM admins WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Profil Sekolah Routes
app.get('/api/profil', async (req, res) => {
    try {
        const [profilRows]: any = await pool.query('SELECT * FROM profil_sekolah LIMIT 1');
        const [misiRows]: any = await pool.query('SELECT * FROM misi_items ORDER BY id ASC');
        const [sejarahRows]: any = await pool.query('SELECT * FROM sejarah ORDER BY year ASC');

        const dummyProfil = {
            hero_title: "Dedikasi Untuk Masa Depan",
            hero_subtitle: "Edukasi Berkualitas Dunia",
            hero_description: "Menjelajahi identitas SMK Nusantara sebagai pelopor pendidikan vokasi modern yang menggabungkan keahlian industri dengan karakter unggul.",
            visi_title: "Visi Utama",
            visi_content: "Menjadi epicenter pendidikan kejuruan yang menghasilkan pemimpin masa depan berkarakter global, kompeten secara teknis, dan memiliki jiwa inovator yang berdaya saing internasional.",
            misi_title: "Misi Strategis"
        };

        const dummyMisi = [
            { id: 1, content: "Menyelenggarakan kurikulum berbasis industri terkini." },
            { id: 2, content: "Membangun ekosistem pendidikan karakter yang inklusif." },
            { id: 3, content: "Memperluas jejaring strategis dengan korporasi global." },
            { id: 4, content: "Mendorong budaya riset dan inovasi teknologi terapan." }
        ];

        const dummySejarah = [
            {
                id: 1,
                year: "1995",
                title: "Era Perintisan",
                description: "Dimulai sebagai STM Nusantara dengan fokus pada teknik mesin dan otomotif. Membangun fondasi pendidikan vokasi yang disiplin."
            },
            {
                id: 2,
                year: "2005",
                title: "Transformasi Digital Pertama",
                description: "Berubah nama menjadi SMK Nusantara and membuka departemen Teknologi Informasi, merespon revolusi digital awal di Indonesia."
            },
            {
                id: 3,
                year: "2024",
                title: "Global Leadership",
                description: "Kini mengelola 6 program keahlian bertaraf internasional dengan kemitraan lebih dari 100 perusahaan global."
            }
        ];

        res.json({
            profil: profilRows.length > 0 ? profilRows[0] : dummyProfil,
            misi: misiRows.length > 0 ? misiRows : dummyMisi,
            sejarah: sejarahRows.length > 0 ? sejarahRows : dummySejarah
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profil data', error });
    }
});

app.put('/api/profil', async (req, res) => {
    const { hero_title, hero_subtitle, hero_description, visi_title, visi_content, misi_title } = req.body;
    try {
        const [rows]: any = await pool.query('SELECT id FROM profil_sekolah LIMIT 1');
        if (rows.length > 0) {
            await pool.query(
                'UPDATE profil_sekolah SET hero_title = ?, hero_subtitle = ?, hero_description = ?, visi_title = ?, visi_content = ?, misi_title = ? WHERE id = ?',
                [hero_title, hero_subtitle, hero_description, visi_title, visi_content, misi_title, rows[0].id]
            );
        } else {
            await pool.query(
                'INSERT INTO profil_sekolah (hero_title, hero_subtitle, hero_description, visi_title, visi_content, misi_title) VALUES (?, ?, ?, ?, ?, ?)',
                [hero_title, hero_subtitle, hero_description, visi_title, visi_content, misi_title]
            );
        }
        res.json({ message: 'Profil updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profil', error });
    }
});

// Misi Items Routes
app.post('/api/misi', async (req, res) => {
    const { content } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO misi_items (content) VALUES (?)', [content]);
        res.status(201).json({ id: (result as any).insertId, content });
    } catch (error) {
        res.status(500).json({ message: 'Error creating misi item', error });
    }
});

app.put('/api/misi/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        await pool.query('UPDATE misi_items SET content = ? WHERE id = ?', [content, id]);
        res.json({ message: 'Misi item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating misi item', error });
    }
});

app.delete('/api/misi/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM misi_items WHERE id = ?', [id]);
        res.json({ message: 'Misi item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting misi item', error });
    }
});

// Sejarah Routes
app.post('/api/sejarah', async (req, res) => {
    const { year, title, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO sejarah (year, title, description) VALUES (?, ?, ?)',
            [year, title, description]
        );
        res.status(201).json({ id: (result as any).insertId, year, title, description });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sejarah entry', error });
    }
});

app.put('/api/sejarah/:id', async (req, res) => {
    const { id } = req.params;
    const { year, title, description } = req.body;
    try {
        await pool.query(
            'UPDATE sejarah SET year = ?, title = ?, description = ? WHERE id = ?',
            [year, title, description, id]
        );
        res.json({ message: 'Sejarah entry updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sejarah entry', error });
    }
});

app.delete('/api/sejarah/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM sejarah WHERE id = ?', [id]);
        res.json({ message: 'Sejarah entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sejarah entry', error });
    }
});

// Struktur Organisasi Routes
app.get('/api/struktur', async (req, res) => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM struktur_organisasi ORDER BY order_priority ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching struktur data', error });
    }
});

app.post('/api/struktur', async (req, res) => {
    const { name, role, image, type, description, order_priority, parent_id, connection_type } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO struktur_organisasi (name, role, image, type, description, order_priority, parent_id, connection_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, role, image, type, description || null, order_priority || 0, parent_id || null, connection_type || 'subordinate']
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating struktur item', error });
    }
});

app.put('/api/struktur/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, image, type, description, order_priority, parent_id, connection_type } = req.body;
    try {
        await pool.query(
            'UPDATE struktur_organisasi SET name = ?, role = ?, image = ?, type = ?, description = ?, order_priority = ?, parent_id = ?, connection_type = ? WHERE id = ?',
            [name, role, image, type, description || null, order_priority || 0, parent_id || null, connection_type || 'subordinate', id]
        );
        res.json({ message: 'Struktur item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating struktur item', error });
    }
});

app.delete('/api/struktur/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM struktur_organisasi WHERE id = ?', [id]);
        res.json({ message: 'Struktur item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting struktur item', error });
    }
});

// Guru Routes
app.get('/api/guru', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM guru ORDER BY order_priority ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guru data', error });
    }
});

app.post('/api/guru', async (req, res) => {
    const { name, subject, image, bio, education, experience, instagram_url, linkedin_url, order_priority, is_pioneer } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO guru (name, subject, image, bio, education, experience, instagram_url, linkedin_url, order_priority, is_pioneer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, subject, image, bio || null, education || null, experience || null, instagram_url || null, linkedin_url || null, order_priority || 0, is_pioneer || false]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating guru item', error });
    }
});

app.put('/api/guru/:id', async (req, res) => {
    const { id } = req.params;
    const { name, subject, image, bio, education, experience, instagram_url, linkedin_url, order_priority, is_pioneer } = req.body;
    try {
        await pool.query(
            'UPDATE guru SET name = ?, subject = ?, image = ?, bio = ?, education = ?, experience = ?, instagram_url = ?, linkedin_url = ?, order_priority = ?, is_pioneer = ? WHERE id = ?',
            [name, subject, image, bio || null, education || null, experience || null, instagram_url || null, linkedin_url || null, order_priority || 0, is_pioneer || false, id]
        );
        res.json({ message: 'Guru item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating guru item', error });
    }
});

app.delete('/api/guru/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM guru WHERE id = ?', [id]);
        res.json({ message: 'Guru item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting guru item', error });
    }
});

// Fasilitas Routes
app.get('/api/fasilitas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM fasilitas ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fasilitas data', error });
    }
});

app.post('/api/fasilitas', async (req, res) => {
    const { title, description, features, image, icon } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO fasilitas (title, description, features, image, icon) VALUES (?, ?, ?, ?, ?)',
            [title, description, JSON.stringify(features), image, icon]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating fasilitas item', error });
    }
});

app.put('/api/fasilitas/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, features, image, icon } = req.body;
    try {
        await pool.query(
            'UPDATE fasilitas SET title = ?, description = ?, features = ?, image = ?, icon = ? WHERE id = ?',
            [title, description, JSON.stringify(features), image, icon, id]
        );
        res.json({ message: 'Fasilitas item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating fasilitas item', error });
    }
});

app.delete('/api/fasilitas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM fasilitas WHERE id = ?', [id]);
        res.json({ message: 'Fasilitas item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fasilitas item', error });
    }
});

// Industry Partners Routes
app.get('/api/industry-partners', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM industry_partners ORDER BY order_priority ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching industry partners', error });
    }
});

app.post('/api/industry-partners', async (req, res) => {
    const { name, logo, category, order_priority } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO industry_partners (name, logo, category, order_priority) VALUES (?, ?, ?, ?)',
            [name, logo, category, order_priority || 0]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating industry partner', error });
    }
});

app.put('/api/industry-partners/:id', async (req, res) => {
    const { id } = req.params;
    const { name, logo, category, order_priority } = req.body;
    try {
        await pool.query(
            'UPDATE industry_partners SET name = ?, logo = ?, category = ?, order_priority = ? WHERE id = ?',
            [name, logo, category, order_priority, id]
        );
        res.json({ message: 'Industry partner updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating industry partner', error });
    }
});

app.delete('/api/industry-partners/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM industry_partners WHERE id = ?', [id]);
        res.json({ message: 'Industry partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting industry partner', error });
    }
});

// Industry Programs Routes
app.get('/api/industry-programs', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM industry_programs ORDER BY order_priority ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching industry programs', error });
    }
});

app.post('/api/industry-programs', async (req, res) => {
    const { title, description, icon, order_priority } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO industry_programs (title, description, icon, order_priority) VALUES (?, ?, ?, ?)',
            [title, description, icon, order_priority || 0]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating industry program', error });
    }
});

app.put('/api/industry-programs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, icon, order_priority } = req.body;
    try {
        await pool.query(
            'UPDATE industry_programs SET title = ?, description = ?, icon = ?, order_priority = ? WHERE id = ?',
            [title, description, icon, order_priority, id]
        );
        res.json({ message: 'Industry program updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating industry program', error });
    }
});

app.delete('/api/industry-programs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM industry_programs WHERE id = ?', [id]);
        res.json({ message: 'Industry program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting industry program', error });
    }
});

// Industry Stats Routes
app.get('/api/industry-stats', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM industry_stats ORDER BY order_priority ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching industry stats', error });
    }
});

app.post('/api/industry-stats', async (req, res) => {
    const { label, value, order_priority } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO industry_stats (label, value, order_priority) VALUES (?, ?, ?)',
            [label, value, order_priority || 0]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating industry stat', error });
    }
});

app.put('/api/industry-stats/:id', async (req, res) => {
    const { id } = req.params;
    const { label, value, order_priority } = req.body;
    try {
        await pool.query(
            'UPDATE industry_stats SET label = ?, value = ?, order_priority = ? WHERE id = ?',
            [label, value, order_priority, id]
        );
        res.json({ message: 'Industry stat updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating industry stat', error });
    }
});

app.delete('/api/industry-stats/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM industry_stats WHERE id = ?', [id]);
        res.json({ message: 'Industry stat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting industry stat', error });
    }
});

// Combined Public Route
app.get('/api/hubungan-industri', async (req, res) => {
    try {
        const [partners] = await pool.query('SELECT * FROM industry_partners ORDER BY order_priority ASC');
        const [programs] = await pool.query('SELECT * FROM industry_programs ORDER BY order_priority ASC');
        const [stats] = await pool.query('SELECT * FROM industry_stats ORDER BY order_priority ASC');
        res.json({ partners, programs, stats });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hubungan industri data', error });
    }
});

// Prestasi Routes
app.get('/api/prestasi', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prestasi ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prestasi', error });
    }
});

app.get('/api/prestasi/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM prestasi WHERE slug = ?', [slug]);
        if ((rows as any[]).length === 0) return res.status(404).json({ message: 'Prestasi not found' });
        res.json((rows as any[])[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prestasi detail', error });
    }
});

app.post('/api/prestasi', async (req, res) => {
    const { title, slug, category, winner, date, level, image, description, long_description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO prestasi (title, slug, category, winner, date, level, image, description, long_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, slug, category, winner, date, level, image, description, long_description]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating prestasi', error });
    }
});

app.put('/api/prestasi/:id', async (req, res) => {
    const { id } = req.params;
    const { title, slug, category, winner, date, level, image, description, long_description } = req.body;
    try {
        await pool.query(
            'UPDATE prestasi SET title = ?, slug = ?, category = ?, winner = ?, date = ?, level = ?, image = ?, description = ?, long_description = ? WHERE id = ?',
            [title, slug, category, winner, date, level, image, description, long_description, id]
        );
        res.json({ message: 'Prestasi updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating prestasi', error });
    }
});

app.delete('/api/prestasi/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM prestasi WHERE id = ?', [id]);
        res.json({ message: 'Prestasi deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting prestasi', error });
    }
});

// Messages Routes
app.get('/api/messages', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

app.post('/api/messages', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

app.patch('/api/messages/:id/read', async (req, res) => {
    const { id } = req.params;
    const { is_read } = req.body;
    try {
        await pool.query('UPDATE messages SET is_read = ? WHERE id = ?', [is_read, id]);
        res.json({ message: 'Message status updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating message status', error });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = ?', [id]);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error });
    }
});

// Contact Info Routes
app.get('/api/contact-info', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contact_info LIMIT 1');
        res.json((rows as any[])[0] || {});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact info', error });
    }
});

app.put('/api/contact-info/:id', async (req, res) => {
    const { id } = req.params;
    const { school_name, address, phone, email, website, maps_url, facebook_url, instagram_url, youtube_url, twitter_url } = req.body;
    try {
        await pool.query(
            'UPDATE contact_info SET school_name = ?, address = ?, phone = ?, email = ?, website = ?, maps_url = ?, facebook_url = ?, instagram_url = ?, youtube_url = ?, twitter_url = ? WHERE id = ?',
            [school_name, address, phone, email, website, maps_url, facebook_url, instagram_url, youtube_url, twitter_url, id]
        );
        res.json({ message: 'Contact info updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact info', error });
    }
});

// PPDB Info Routes
app.get('/api/ppdb-info', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM PPDBInfos LIMIT 1');
        const data = (rows as any[])[0];

        if (data) {
            // Helper to parse if string (mysql2 might return JSON columns as strings)
            const parse = (val: any) => {
                if (typeof val === 'string') {
                    try { return JSON.parse(val); } catch (e) { return []; }
                }
                return val || [];
            };

            data.admission_pathways = parse(data.admission_pathways);
            data.timeline = parse(data.timeline);
            data.required_documents = parse(data.required_documents);
            data.fees = parse(data.fees);
            data.faq = parse(data.faq);

            res.json(data);
        } else {
            res.json({});
        }
    } catch (error) {
        console.error("Error fetching PPDB info:", error);
        res.status(500).json({ message: 'Error fetching ppdb info', error });
    }
});

app.put('/api/ppdb-info', async (req, res) => {
    const { academic_year, registration_link, contact_person, description, admission_pathways, timeline, required_documents, fees, faq, is_active } = req.body;
    try {
        // Check if exists
        const [rows] = await pool.query('SELECT id FROM PPDBInfos LIMIT 1') as any[];
        if (rows.length > 0) {
            await pool.query(
                `UPDATE PPDBInfos SET 
                    academic_year = ?, 
                    registration_link = ?, 
                    contact_person = ?, 
                    description = ?, 
                    admission_pathways = ?, 
                    timeline = ?, 
                    required_documents = ?, 
                    fees = ?, 
                    faq = ?, 
                    is_active = ?, 
                    updatedAt = NOW() 
                WHERE id = ?`,
                [
                    academic_year,
                    registration_link,
                    contact_person,
                    description,
                    JSON.stringify(admission_pathways),
                    JSON.stringify(timeline),
                    JSON.stringify(required_documents),
                    JSON.stringify(fees),
                    JSON.stringify(faq),
                    is_active,
                    rows[0].id
                ]
            );
        } else {
            await pool.query(
                `INSERT INTO PPDBInfos (academic_year, registration_link, contact_person, description, admission_pathways, timeline, required_documents, fees, faq, is_active, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [
                    academic_year,
                    registration_link,
                    contact_person,
                    description,
                    JSON.stringify(admission_pathways),
                    JSON.stringify(timeline),
                    JSON.stringify(required_documents),
                    JSON.stringify(fees),
                    JSON.stringify(faq),
                    is_active
                ]
            );
        }
        res.json({ message: 'PPDB info updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ppdb info', error });
    }
});


// PPDB Info Routes
// ... (omitted same lines)

// -- PRIVACY POLICY ROUTES --
app.get('/api/privacy-policy', async (req, res) => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM privacy_policy LIMIT 1');
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching privacy policy', error });
    }
});

app.put('/api/privacy-policy', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const [rows]: any = await pool.query('SELECT id FROM privacy_policy LIMIT 1');
        if (rows.length > 0) {
            await pool.query(
                'UPDATE privacy_policy SET title = ?, content = ?, last_updated = NOW() WHERE id = ?',
                [title, content, rows[0].id]
            );
        } else {
            await pool.query(
                'INSERT INTO privacy_policy (title, content, last_updated) VALUES (?, ?, NOW())',
                [title, content]
            );
        }
        res.json({ message: 'Privacy policy updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating privacy policy', error });
    }
});

// -- SITE SETTINGS ROUTES --
app.get('/api/settings', async (req, res) => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM site_settings LIMIT 1');
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
});

app.put('/api/settings', async (req, res) => {
    const { school_name, school_logo, seo_keywords, seo_description, footer_description } = req.body;
    try {
        const [rows]: any = await pool.query('SELECT id FROM site_settings LIMIT 1');
        if (rows.length > 0) {
            await pool.query(
                'UPDATE site_settings SET school_name = ?, school_logo = ?, seo_keywords = ?, seo_description = ?, footer_description = ? WHERE id = ?',
                [school_name, school_logo, seo_keywords, seo_description, footer_description, rows[0].id]
            );
        } else {
            await pool.query(
                'INSERT INTO site_settings (school_name, school_logo, seo_keywords, seo_description, footer_description) VALUES (?, ?, ?, ?, ?)',
                [school_name, school_logo, seo_keywords, seo_description, footer_description]
            );
        }
        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error });
    }
});

// -- PUBLIC ANALYTICS TRACKING --
app.post('/api/analytics/track', async (req, res) => {
    const { sessionId, type, path } = req.body;
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const referrer = req.headers['referer'] || req.headers['referrer'];

        await pool.query(
            'INSERT INTO visitor_logs (session_id, log_type, ip_address, user_agent, path, referrer) VALUES (?, ?, ?, ?, ?, ?)',
            [sessionId, type || 'page_view', ip || 'unknown', userAgent || null, path || '/', referrer || null]
        );
        res.json({ success: true });
    } catch (error) {
        // Silently fail to not interrupt user experience
        res.status(200).json({ success: false });
    }
});

// -- VISITOR ANALYTICS ROUTES --
app.get('/api/admin/visitor-stats', authMiddleware, async (req, res) => {
    try {
        // 1. Summary Counts (Focus on session_start for high-level visitors)
        const [totalVisitors]: any = await pool.query("SELECT COUNT(*) as count FROM visitor_logs WHERE log_type = 'session_start'");
        const [todayVisitors]: any = await pool.query("SELECT COUNT(*) as count FROM visitor_logs WHERE log_type = 'session_start' AND DATE(created_at) = CURDATE()");
        const [totalPageViews]: any = await pool.query("SELECT COUNT(*) as count FROM visitor_logs WHERE log_type = 'page_view'");

        // 2. Daily Timeline (Last 14 days of session_starts)
        const [dailyTimeline]: any = await pool.query(`
            SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as date, COUNT(*) as count 
            FROM visitor_logs 
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
            AND log_type = 'session_start'
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        `);

        // 3. Most Popular Pages (Based on page_views)
        const [topPages]: any = await pool.query(`
            SELECT path, COUNT(*) as count 
            FROM visitor_logs 
            WHERE log_type = 'page_view'
            GROUP BY path 
            ORDER BY count DESC 
            LIMIT 8
        `);

        // 4. Latest Sessions Detail
        const [latestVisits]: any = await pool.query(`
            SELECT * FROM visitor_logs 
            WHERE log_type = 'session_start'
            ORDER BY created_at DESC 
            LIMIT 15
        `);

        res.json({
            summary: {
                total: totalVisitors[0].count,
                today: todayVisitors[0].count,
                totalViews: totalPageViews[0].count
            },
            dailyTimeline,
            topPages,
            latestVisits
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error });
    }
});

// -- GLOBAL ERROR HANDLER --
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Unhandled Error:', err);
    res.status(err.status || 500).json({
        message: 'Internal server error',
        // Only show error details in development if needed
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
