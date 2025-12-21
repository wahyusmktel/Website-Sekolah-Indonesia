CREATE DATABASE IF NOT EXISTS `website-sekolah-indonesia`;
USE `website-sekolah-indonesia`;

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    image VARCHAR(255),
    cta VARCHAR(50),
    cta_link VARCHAR(255)
);

-- Keunggulan Table
CREATE TABLE IF NOT EXISTS keunggulan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(50),
    title VARCHAR(100) NOT NULL,
    description TEXT
);

-- Program Keahlian Table
CREATE TABLE IF NOT EXISTS program_keahlian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    short_desc TEXT,
    description TEXT,
    image VARCHAR(255),
    icon VARCHAR(50),
    prospects JSON
);

-- Berita Table
CREATE TABLE IF NOT EXISTS berita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    image VARCHAR(255),
    category VARCHAR(50),
    author VARCHAR(100),
    date DATE,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agenda Table
CREATE TABLE IF NOT EXISTS agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    end_date DATE,
    location VARCHAR(255),
    description TEXT
);

-- Galeri Table
CREATE TABLE IF NOT EXISTS galeri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(50),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimoni Table
CREATE TABLE IF NOT EXISTS testimoni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(255),
    content TEXT,
    image VARCHAR(255)
);

-- Info Sekolah Table
CREATE TABLE IF NOT EXISTS info_sekolah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(100),
    maps TEXT,
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    youtube VARCHAR(255),
    twitter VARCHAR(255)
);

-- Insert Default Admin (password: admin123 - though in production it should be hashed)
INSERT INTO admins (username, password, name) VALUES ('admin', 'admin123', 'Administrator Sekolah');

-- Insert Initial Info Sekolah
INSERT INTO info_sekolah (name, address, phone, email, website, maps, facebook, instagram, youtube, twitter) 
VALUES (
    'SMK Nusantara', 
    'Jl. Pendidikan No. 123, Kota Bandung, Jawa Barat 40123', 
    '(022) 1234567', 
    'info@smknusantara.sch.id', 
    'www.smknusantara.sch.id', 
    'https://maps.google.com',
    'https://facebook.com/smknusantara',
    'https://instagram.com/smknusantara',
    'https://youtube.com/smknusantara',
    'https://twitter.com/smknusantara'
);
