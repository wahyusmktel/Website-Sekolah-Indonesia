-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 22 Des 2025 pada 19.22
-- Versi server: 12.1.2-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Basis data: `website-sekolah-indonesia`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `role` enum('superadmin','hubin','kesiswaan') NOT NULL DEFAULT 'superadmin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `name`, `created_at`, `role`) VALUES
(1, 'admin', 'admin123', 'Administrator Sekolah', '2025-12-20 13:15:02', 'superadmin'),
(3, 'wahyurah55', '$2b$10$UzDJ66fk6vejduotg/y7Du3.ZOaguMGSWX.gf2YM9xS93LRbR2TCq', 'Wahyu Rahmadhani', '2025-12-22 15:13:09', 'superadmin'),
(4, 'muchlis', '$2b$10$YJ2eC1FmH3gRwkAFFADsg.lQrao8iB6IsLA3MUfsL5oxBG9q18ALe', 'Muchlis Riyadi', '2025-12-22 18:18:30', 'kesiswaan'),
(5, 'wahyurahmat', '$2b$10$s7KXe.EnPKPCZbZud/5/x.A0Bquswwv7NT.ETJMJgEqQrN0FdUtuy', 'wahyurahmat', '2025-12-22 18:19:25', 'kesiswaan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `agenda`
--

INSERT INTO `agenda` (`id`, `title`, `date`, `end_date`, `location`, `description`) VALUES
(1, 'Ujian Tengah Semester Genap', '2024-03-11', '2024-03-15', 'Ruang Kelas', 'Pelaksanaan UTS semester genap untuk semua kelas'),
(2, 'Career Day 2024', '2024-03-20', '2024-03-20', 'Aula Sekolah', 'Pameran karir dengan 30+ perusahaan partner'),
(3, 'Praktik Kerja Lapangan', '2024-04-01', '2024-06-30', 'Perusahaan Mitra', 'PKL untuk siswa kelas XI di perusahaan mitra'),
(4, 'Wisuda Angkatan 2024', '2024-05-25', '2024-05-25', 'Gedung Serbaguna', 'Acara pelepasan siswa kelas XII'),
(5, 'Ujian Tengah Semester Genap', '2024-03-11', '2024-03-15', 'Ruang Kelas', 'Pelaksanaan UTS semester genap untuk semua kelas'),
(6, 'Career Day 2024', '2024-03-20', '2024-03-20', 'Aula Sekolah', 'Pameran karir dengan 30+ perusahaan partner'),
(7, 'Praktik Kerja Lapangan', '2024-04-01', '2024-06-30', 'Perusahaan Mitra', 'PKL untuk siswa kelas XI di perusahaan mitra'),
(8, 'Wisuda Angkatan 2024', '2024-05-25', '2024-05-25', 'Gedung Serbaguna', 'Acara pelepasan siswa kelas XII'),
(9, 'Ujian Tengah Semester Genap', '2024-03-11', '2024-03-15', 'Ruang Kelas', 'Pelaksanaan UTS semester genap untuk semua kelas'),
(10, 'Career Day 2024', '2024-03-20', '2024-03-20', 'Aula Sekolah', 'Pameran karir dengan 30+ perusahaan partner'),
(11, 'Praktik Kerja Lapangan', '2024-04-01', '2024-06-30', 'Perusahaan Mitra', 'PKL untuk siswa kelas XI di perusahaan mitra'),
(12, 'Wisuda Angkatan 2024', '2024-05-25', '2024-05-25', 'Gedung Serbaguna', 'Acara pelepasan siswa kelas XII'),
(13, 'Ujian Tengah Semester Genap', '2024-03-11', '2024-03-15', 'Ruang Kelas', 'Pelaksanaan UTS semester genap untuk semua kelas'),
(14, 'Career Day 2024', '2024-03-20', '2024-03-20', 'Aula Sekolah', 'Pameran karir dengan 30+ perusahaan partner'),
(15, 'Praktik Kerja Lapangan', '2024-04-01', '2024-06-30', 'Perusahaan Mitra', 'PKL untuk siswa kelas XI di perusahaan mitra'),
(16, 'Wisuda Angkatan 2024', '2024-05-25', '2024-05-25', 'Gedung Serbaguna', 'Acara pelepasan siswa kelas XII');

-- --------------------------------------------------------

--
-- Struktur dari tabel `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `album`
--

INSERT INTO `album` (`id`, `slug`, `title`, `cover_image`, `category`, `date`, `description`, `created_at`) VALUES
(1, 'wisuda-2023', 'Wisuda Angkatan 2023', 'https://images.unsplash.com/photo-1523050335456-c3cc73c68326?auto=format&fit=crop&q=80&w=800', 'Kegiatan', '2023-05-25', 'Momen membanggakan pelepasan siswa-siswi SMK Nusantara angkatan ke-25.', '2025-12-21 02:30:09'),
(2, 'lks-nasional-2024', 'LKS Nasional 2024', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', 'Prestasi', '2024-02-15', 'Dokumentasi perjuangan siswa SMK Nusantara dalam ajang Lomba Kompetensi Siswa tingkat Nasional.', '2025-12-21 02:30:09'),
(3, 'praktik-industri-tjat', 'Praktik Industri TJAT', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', 'Pembelajaran', '2024-01-20', 'Kegiatan praktik lapangan siswa jurusan Teknik Jaringan Akses Telekomunikasi di mitra industri.', '2025-12-21 02:30:09'),
(4, 'pentas-seni-budaya', 'Pentas Seni Budaya', 'https://images.unsplash.com/photo-1514525253344-f81fbd67b551?auto=format&fit=crop&q=80&w=800', 'Ekstrakurikuler', '2023-11-10', 'Pertunjukan bakat dan kreativitas siswa dalam melestarikan budaya nusantara.', '2025-12-21 02:30:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `berita`
--

INSERT INTO `berita` (`id`, `title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `date`, `views`, `created_at`) VALUES
(1, 'Edit Lorem ipsum dolor sit amet consectetur, adipiscing elit taciti.', 'edit-lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-taciti', 'Lorem ipsum dolor sit amet consectetur adipiscing elit nibh parturient taciti platea penatibus nascetur, eu blandit non tempor maecenas senectus rutrum praesent...', '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit nibh parturient taciti platea penatibus nascetur, eu blandit non tempor maecenas senectus rutrum praesent cras mollis bibendum laoreet. Pretium orci nascetur cum in vulputate pellentesque scelerisque ac porttitor ante ad mus convallis, vivamus himenaeos eleifend dis faucibus tellus nibh nulla massa turpis odio justo. Duis turpis accumsan dignissim felis rutrum integer fusce platea interdum aliquet, commodo tincidunt magna cursus nulla purus quis semper odio, nisl eros ullamcorper lectus potenti tempus diam hendrerit porttitor. Sed eleifend potenti interdum nulla penatibus ridiculus primis posuere a, iaculis proin vestibulum ante tristique porta ac bibendum, tempus ultricies dignissim scelerisque rutrum ullamcorper</p><p><img src=\"http://localhost:5000/uploads/1766250000699-761173909.png\"></p><p>volutpat fusce. Nulla aliquam neque vulputate molestie ac porta himenaeos donec eros tempus velit, sociosqu fringilla malesuada magna eleifend laoreet nibh netus cubilia auctor fermentum, purus ligula ante est euismod integer maecenas odio luctus libero. Facilisis velit varius massa magnis aenean luctus suspendisse sagittis aliquam, elementum sodales orci arcu nullam lacinia diam praesent sollicitudin rhoncus, eros mattis penatibus montes nunc porttitor libero fusce. <strong>Ut cubilia pulvinar urna auctor scelerisque sodales facilisis rhoncus cras, in lobortis convallis hendrerit donec curabitur ac.</strong></p>', '/uploads/1766249363775-316878382.png', 'Berita', 'Admin', '2025-12-12', 14, '2025-12-20 13:48:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `contact_info`
--

CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL,
  `school_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `maps_url` text DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `contact_info`
--

INSERT INTO `contact_info` (`id`, `school_name`, `address`, `phone`, `email`, `website`, `maps_url`, `facebook_url`, `instagram_url`, `youtube_url`, `twitter_url`, `created_at`, `updated_at`) VALUES
(1, 'SMK Nusantara', 'Jl. Pendidikan No. 123, Kota Bandung, Jawa Barat 4012317', '(022) 1234567', 'info@smknusantara.sch.id', 'www.smknusantara.sch.id', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311640625!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63982542a7d%3A0xbb585df5d5483244!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid', 'https://facebook.com/smknusantara12', 'https://instagram.com/smknusantara12', 'https://youtube.com/smknusantara12', 'https://twitter.com/smknusantara12', '2025-12-22 14:03:02', '2025-12-22 14:03:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `fasilitas`
--

CREATE TABLE `fasilitas` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `fasilitas`
--

INSERT INTO `fasilitas` (`id`, `title`, `description`, `features`, `image`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Smart Digital Classroom', 'Ruang belajar futuristik yang dirancang untuk kenyamanan maksimal dan efektivitas digital.', '[\"AC & Air Purifier\",\"Smart TV 75 inch\",\"Glassboard\",\"High-speed WiFi 6\",\"CCTV 24/7\",\"Ergonomic Chairs\"]', 'https://images.unsplash.com/photo-1541339907198-e08756dee9b8?auto=format&fit=crop&q=80&w=1000', 'Monitor', '2025-12-22 13:40:47', '2025-12-22 13:40:47'),
(2, 'Advanced IT & Networking Lab', 'Laboratorium berstandar industri dengan perangkat Cisco dan server mumpuni untuk praktek jaringan.', '[\"Cisco Routers & Switches\",\"Rack Server\",\"Fiber Optic Splicer\",\"PC Core i9\",\"Dual Monitor Setup\"]', 'https://images.unsplash.com/photo-1558494949-ef010ccdcc58?auto=format&fit=crop&q=80&w=1000', 'Cpu', '2025-12-22 13:40:47', '2025-12-22 13:40:47'),
(3, 'Animation & Multimedia Studio', 'Studio kreatif untuk produksi animasi dan konten multimedia dengan hardware kartu grafis tinggi.', '[\"Wacom Cintiq Tablet\",\"Render Farm\",\"Green Screen Area\",\"Soundproof Room\",\"Professional Camera Gear\"]', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000', 'Layers', '2025-12-22 13:40:47', '2025-12-22 13:40:47'),
(4, 'Futuristic Library & Co-working', 'Ruang baca digital dan area kolaborasi yang memacu lahirnya ide-ide inovatif.', '[]', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000', 'BookOpen', '2025-12-22 13:40:47', '2025-12-22 13:40:47'),
(5, 'Techno Hall & Arena', 'Gedung serbaguna indoor untuk kegiatan olahraga, seminar teknologi, dan showcase karya.', '[\"Full Sound System\",\"LED Videotron\",\"Basketball Court\",\"Badminton Court\",\"Retractable Seating\"]', 'https://images.unsplash.com/photo-1577416414929-7a4c9f1ac3c6?auto=format&fit=crop&q=80&w=1000', 'Activity', '2025-12-22 13:40:47', '2025-12-22 13:40:47'),
(6, 'Digital Smart Canteen', 'Kantin bersih dan sehat dengan sistem pembayaran non-tunai dan pemesanan digital.', '[\"Cashless Payment\",\"Digital Order Kiosks\",\"Eco-friendly Area\",\"Healthy Food Audit\",\"Outdoor Seating\"]', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=1000', 'Coffee', '2025-12-22 13:40:47', '2025-12-22 13:40:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `galeri`
--

CREATE TABLE `galeri` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `album_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `galeri`
--

INSERT INTO `galeri` (`id`, `title`, `category`, `image`, `created_at`, `album_id`) VALUES
(1, 'Upacara Bendera', 'Kegiatan', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(2, 'Praktik Lab Komputer', 'Pembelajaran', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(3, 'Lomba Kompetensi', 'Prestasi', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(4, 'Kunjungan Industri', 'Kegiatan', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(5, 'Pentas Seni', 'Ekstrakurikuler', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(6, 'Wisuda 2023', 'Kegiatan', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(7, 'Workshop IT', 'Pembelajaran', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(8, 'Olahraga Bersama', 'Ekstrakurikuler', '/placeholder.svg', '2025-12-21 02:30:09', NULL),
(9, 'Prosesi Wisuda', 'Kegiatan', 'https://images.unsplash.com/photo-1523050335456-c3cc73c68326?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 1),
(10, 'Pemberian Piagam', 'Kegiatan', 'https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 1),
(11, 'Foto Bersama Guru', 'Kegiatan', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 1),
(12, 'Keceriaan Wisudawan', 'Kegiatan', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 1),
(13, 'Persiapan Lomba', 'Prestasi', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 2),
(14, 'Presentasi Karya', 'Prestasi', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 2),
(15, 'Penilaian Juri', 'Prestasi', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 2),
(16, 'Pengumuman Juara', 'Prestasi', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 2),
(17, 'Instalasi Fiber Optik', 'Pembelajaran', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 3),
(18, 'Konfigurasi Perangkat', 'Pembelajaran', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 3),
(19, 'Pengecekan Jaringan', 'Pembelajaran', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 3),
(20, 'Diskusi Teknis', 'Pembelajaran', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 3),
(21, 'Tari Tradisional', 'Ekstrakurikuler', 'https://images.unsplash.com/photo-1514525253344-f81fbd67b551?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 4),
(22, 'Band Sekolah', 'Ekstrakurikuler', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 4),
(23, 'Teater', 'Ekstrakurikuler', 'https://images.unsplash.com/photo-1503095396549-807a8bc3667c?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 4),
(24, 'Pameran Lukisan', 'Ekstrakurikuler', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', '2025-12-21 02:30:09', 4),
(25, 'Pembagian Rapor', 'Prestasi', '/uploads/1766284684526-181986930.png', '2025-12-21 02:38:04', NULL),
(26, 'Pemabagian Rapor 2', 'Kegiatan', '/uploads/1766285373441-346983869.png', '2025-12-21 02:49:33', NULL),
(27, 'Pemabagian Rapor 2', 'Kegiatan', '/uploads/1766285373452-498911262.jpg', '2025-12-21 02:49:33', NULL),
(28, 'Pemabagian Rapor 2', 'Kegiatan', '/uploads/1766285373453-296391657.jpg', '2025-12-21 02:49:33', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `guru`
--

CREATE TABLE `guru` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `order_priority` int(11) DEFAULT 0,
  `is_pioneer` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `guru`
--

INSERT INTO `guru` (`id`, `name`, `subject`, `image`, `bio`, `education`, `experience`, `instagram_url`, `linkedin_url`, `order_priority`, `is_pioneer`, `createdAt`, `updatedAt`) VALUES
(1, 'Budi Santoso, S.Kom, M.T.', 'RPL & Cyber Security', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 'Seorang ahli teknologi dengan pengalaman lebih dari 15 tahun di industri software development.', 'S2 Magister Teknik Informatika', '15+ Tahun', '#', '#', 1, 1, '2025-12-22 12:26:13', '2025-12-22 12:26:13'),
(2, 'Siti Aminah, M.Pd.', 'Bahasa Inggris & Literasi', 'https://images.unsplash.com/photo-1580894732230-28d1d0c11438?auto=format&fit=crop&q=80&w=400', 'Dedikasi tinggi dalam mengembangkan kemampuan komunikasi global siswa melalui metode pengajaran interaktif.', 'S2 Pendidikan Bahasa Inggris', '10+ Tahun', '#', '#', 2, 0, '2025-12-22 12:26:13', '2025-12-22 12:26:13'),
(3, 'Drs. Heru Wijaya', 'Fisika Terapan & Robotik', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', 'Mengintegrasikan prinsip fisika ke dalam teknologi modern khususnya dalam bidang otomasi dan robotika.', 'S1 Pendidikan Fisika', '25+ Tahun', '#', '#', 3, 0, '2025-12-22 12:26:13', '2025-12-22 12:26:13'),
(4, 'Ani Maryani, S.ST, M.Kom', 'UI/UX Design & Multimedia', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400', 'Fokus pada pengembangan sisi kreatif siswa dalam menciptakan desain solusi digital yang human-centric.', 'S2 Sistem Informasi', '8+ Tahun', '#', '#', 4, 0, '2025-12-22 12:26:13', '2025-12-22 12:26:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cta` varchar(50) DEFAULT NULL,
  `cta_link` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `title`, `subtitle`, `image`, `cta`, `cta_link`, `tag`) VALUES
(1, 'Masa Depan Digital Dimulai di Sini', 'SMK Nusantara menghadirkan pendidikan vokasi berbasis teknologi masa depan dengan standar industri global.', '/uploads/1766298279278-931828356.jpg', 'Mulai Jelajahi', '/program', 'Inovasi Pendidikan'),
(2, 'Kembangkan Bakat Tanpa Batas', 'Fasilitas laboratorium kelas dunia dan pengajar praktisi siap membimbingmu menjadi ahli di bidangnya.', '/uploads/1766298364323-651434105.jpg', 'Lihat Fasilitas', '/profil', 'Fasilitas Unggul'),
(3, 'Siap Kerja & Siap Wirausaha', 'Kurikulum yang dirancang khusus untuk memenuhi kebutuhan dunia kerja modern dan ekosistem startup.', '/uploads/1766298427562-22876418.jpg', 'Daftar Sekarang', '/ppdb', 'Karir Global');

-- --------------------------------------------------------

--
-- Struktur dari tabel `industry_partners`
--

CREATE TABLE `industry_partners` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `order_priority` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `industry_partners`
--

INSERT INTO `industry_partners` (`id`, `name`, `logo`, `category`, `order_priority`, `created_at`, `updated_at`) VALUES
(1, 'PT Telkom Indonesia', 'https://upload.wikimedia.org/wikipedia/id/thumb/c/c8/Telkom_Indonesia_logo_2013.svg/1200px-Telkom_Indonesia_logo_2013.svg.png', 'Telecommunication', 1, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(2, 'Cisco Systems', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png', 'Networking', 2, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(3, 'Google Cloud', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1280px-Google_Cloud_logo.svg.png', 'Cloud Computing', 3, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(4, 'PT Huawei Tech', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Huawei_Logo.svg/1200px-Huawei_Logo.svg.png', 'Telecommunication', 4, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(5, 'Adobe Inc.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/1200px-Adobe_Systems_logo_and_wordmark.svg.png', 'Creative Industry', 5, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(6, 'Tokopedia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_Tokopedia.svg/1200px-Logo_Tokopedia.svg.png', 'Technology', 6, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(7, 'Traveloka', 'https://upload.wikimedia.org/wikipedia/id/thumb/e/e9/Traveloka_logo.svg/1200px-Traveloka_logo.svg.png', 'Technology', 7, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(8, 'Gojek', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png', 'Technology', 8, '2025-12-22 13:56:59', '2025-12-22 13:56:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `industry_programs`
--

CREATE TABLE `industry_programs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order_priority` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `industry_programs`
--

INSERT INTO `industry_programs` (`id`, `title`, `description`, `icon`, `order_priority`, `created_at`, `updated_at`) VALUES
(1, 'Kelas Industri (Co-Branded)', 'Kurikulum yang disusun bersama industri untuk memastikan lulusan memiliki skill yang tepat sasaran.', 'Building2', 1, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(2, 'Sertifikasi Internasional', 'Siswa dibekali sertifikasi dari vendor global seperti Cisco (CCNA), Huawei (HCIA), dan Adobe (ACA).', 'Award', 2, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(3, 'Praktik Kerja Lapangan (PKL)', 'Penempatan magang minimal 6 bulan di perusahaan mitra strategis dengan bimbingan mentor profesional.', 'Briefcase', 3, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(4, 'Bursa Kerja Khusus (BKK)', 'Layanan penempatan kerja bagi alumni dengan jaringan lebih dari 100+ perusahaan nasional.', 'Target', 4, '2025-12-22 13:56:59', '2025-12-22 13:56:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `industry_stats`
--

CREATE TABLE `industry_stats` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `order_priority` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `industry_stats`
--

INSERT INTO `industry_stats` (`id`, `label`, `value`, `order_priority`, `created_at`, `updated_at`) VALUES
(1, 'Partner Aktif', '120+', 1, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(2, 'Serapan Lulusan', '92%', 2, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(3, 'Kelas Industri', '8', 3, '2025-12-22 13:56:59', '2025-12-22 13:56:59'),
(4, 'MoU International', '5', 4, '2025-12-22 13:56:59', '2025-12-22 13:56:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `info_sekolah`
--

CREATE TABLE `info_sekolah` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `maps` text DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `info_sekolah`
--

INSERT INTO `info_sekolah` (`id`, `name`, `address`, `phone`, `email`, `website`, `maps`, `facebook`, `instagram`, `youtube`, `twitter`) VALUES
(1, 'SMK Nusantara', 'Jl. Pendidikan No. 123, Kota Bandung, Jawa Barat 40123', '(022) 1234567', 'info@smknusantara.sch.id', 'www.smknusantara.sch.id', 'https://maps.google.com', 'https://facebook.com/smknusantara', 'https://instagram.com/smknusantara', 'https://youtube.com/smknusantara', 'https://twitter.com/smknusantara');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_berita`
--

CREATE TABLE `kategori_berita` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `kategori_berita`
--

INSERT INTO `kategori_berita` (`id`, `name`, `created_at`) VALUES
(2, 'Berita', '2025-12-20 23:49:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `keunggulan`
--

CREATE TABLE `keunggulan` (
  `id` int(11) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `keunggulan`
--

INSERT INTO `keunggulan` (`id`, `icon`, `title`, `description`) VALUES
(1, 'GraduationCap', 'Kurikulum Industri', 'Kurikulum yang disesuaikan dengan kebutuhan industri terkini'),
(2, 'Users', 'Guru Profesional', 'Tenaga pengajar bersertifikat dan berpengalaman di bidangnya'),
(3, 'Building', 'Fasilitas Lengkap', 'Lab komputer, workshop, dan ruang praktik standar industri'),
(4, 'Briefcase', 'Kerja Sama Industri', 'Bermitra dengan 50+ perusahaan untuk magang dan penempatan kerja'),
(5, 'Award', 'Prestasi Gemilang', 'Ratusan prestasi di tingkat regional, nasional, dan internasional'),
(6, 'Heart', 'Pendidikan Karakter', 'Pembentukan karakter dan soft skill untuk kesuksesan masa depan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 'Andian Sinaga', 'wah@mgm.com', 'tes', 'okeee', 1, '2025-12-22 23:56:01', '2025-12-22 23:56:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `misi_items`
--

CREATE TABLE `misi_items` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `misi_items`
--

INSERT INTO `misi_items` (`id`, `content`) VALUES
(1, 'Menyelenggarakan kurikulum berbasis industri terkini.'),
(2, 'Membangun ekosistem pendidikan karakter yang inklusif.'),
(3, 'Memperluas jejaring strategis dengan korporasi global.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ppdbinfos`
--

CREATE TABLE `ppdbinfos` (
  `id` int(11) NOT NULL,
  `academic_year` varchar(255) DEFAULT NULL,
  `registration_link` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `admission_pathways` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`admission_pathways`)),
  `timeline` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`timeline`)),
  `required_documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`required_documents`)),
  `fees` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`fees`)),
  `faq` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`faq`)),
  `is_active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `ppdbinfos`
--

INSERT INTO `ppdbinfos` (`id`, `academic_year`, `registration_link`, `contact_person`, `description`, `admission_pathways`, `timeline`, `required_documents`, `fees`, `faq`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, '2026/2027', 'https://wa.me/628123456789', '628123456789', 'Pendaftaran Peserta Didik Baru (PPDB) SMK Nusantara Tahun Pelajaran 2026/2027. Wujudkan mimpimu bersama sekolah teknologi unggulan.', '[{\"title\":\"Jalur Prestasi\",\"description\":\"Bagi siswa dengan prestasi akademik (Rapor) atau non-akademik (Lomba/Seni/Olahraga).\",\"icon\":\"Trophy\",\"benefit\":\"Bebas Biaya Pendaftaran\",\"color\":\"text-amber-500\",\"bg\":\"bg-amber-500/10\"},{\"title\":\"Jalur Reguler\",\"description\":\"Penerimaan umum melalui seleksi tes minat bakat dan wawancara kompetensi.\",\"icon\":\"Zap\",\"benefit\":\"Kuota Terbatas\",\"color\":\"text-blue-500\",\"bg\":\"bg-blue-500/10\"},{\"title\":\"Jalur Afirmasi\",\"description\":\"Khusus bagi calon siswa dari keluarga prasejahtera (KIP/PKH) yang bersemangat belajar.\",\"icon\":\"ShieldCheck\",\"benefit\":\"Subsidi Biaya Pendidikan\",\"color\":\"text-emerald-500\",\"bg\":\"bg-emerald-500/10\"}]', '[{\"date\":\"Januari - Maret 2026\",\"step\":\"01\",\"title\":\"Pendaftaran Gelombang 1\",\"description\":\"Pembukaan pendaftaran jalur prestasi dan reguler dengan potongan biaya khusus (Early Bird).\"},{\"date\":\"Mei 2026\",\"step\":\"02\",\"title\":\"Tes Seleksi & Wawancara\",\"description\":\"Pelaksanaan tes akademik, minat bakat, dan wawancara calon siswa beserta orang tua.\"},{\"date\":\"Juni 2026\",\"step\":\"03\",\"title\":\"Pengumuman Hasil\",\"description\":\"Pengumuman hasil seleksi secara online melalui website dan papan pengumuman sekolah.\"},{\"date\":\"Juli 2026\",\"step\":\"04\",\"title\":\"Daftar Ulang & MPLS\",\"description\":\"Proses administrasi daftar ulang bagi siswa yang diterima dilanjutkan Masa Pengenalan Lingkungan Sekolah.\"}]', '[{\"title\":\"Fotokopi Ijazah / SKL\",\"status\":\"Wajib\"},{\"title\":\"Fotokopi Akta Kelahiran\",\"status\":\"Wajib\"},{\"title\":\"Fotokopi Kartu Keluarga\",\"status\":\"Wajib\"},{\"title\":\"Pas Foto 3x4 (4 Lembar)\",\"status\":\"Wajib\"},{\"title\":\"Sertifikat Prestasi\",\"status\":\"Opsional\"},{\"title\":\"Kartu KIP/PKH\",\"status\":\"Jalur Afirmasi\"}]', '[{\"item\":\"Uang Pangkal (Gedung)\",\"biaya\":3500000},{\"item\":\"Seragam (3 Setel + Olahraga)\",\"biaya\":850000},{\"item\":\"Buku & Modul Digital (1 Thn)\",\"biaya\":600000},{\"item\":\"SPP Bulan Juli\",\"biaya\":350000},{\"item\":\"Kegiatan MPLS & Asuransi\",\"biaya\":250000}]', '[{\"q\":\"Kapan penutupan pendaftaran Gelombang 1?\",\"a\":\"Pendaftaran Gelombang 1 (Early Bird) akan ditutup pada akhir Maret 2026 atau ketika kuota khusus prestasi telah terpenuhi.\"},{\"q\":\"Apakah ada tes fisik untuk masuk SMK Nusantara?\",\"a\":\"Untuk jurusan tertentu sepert Teknik Komputer, kami melakukan tes penglihatan (warna) untuk memastikan kompetensi teknis di lab.\"},{\"q\":\"Mungkinkah mendaftar jika Ijazah belum keluar?\",\"a\":\"Tentu. Anda dapat mendaftar menggunakan Rapor Semester 1-5 atau Surat Keterangan Lulus (SKL) sementara.\"},{\"q\":\"Apa keuntungan Jalur Prestasi?\",\"a\":\"Selain pembebasan biaya pendaftaran, jalur prestasi berhak mengikuti program beasiswa penuh untuk SPP tahun pertama.\"}]', 1, '2025-12-22 15:20:31', '2025-12-22 22:29:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `prestasi`
--

CREATE TABLE `prestasi` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `winner` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `long_description` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `prestasi`
--

INSERT INTO `prestasi` (`id`, `title`, `slug`, `category`, `winner`, `date`, `level`, `image`, `description`, `long_description`, `created_at`, `updated_at`) VALUES
(1, 'Juara 1 LKS Nasional Bidang IT Software Solution', 'juara-1-lks-nasional-it-software', 'Akademik', 'Zaky Ahmad', '2023', 'Nasional', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800', 'Prestasi gemilang di tingkat nasional dalam pengembangan solusi perangkat lunak berbasis industri.', 'Zaky Ahmad berhasil meraih gelar terbaik pada Lomba Kompetensi Siswa (LKS) Tingkat Nasional tahun 2023. Dalam kompetisi ini, Zaky berhasil merancang sistem ERP berbasis cloud yang efisien dalam waktu kurang dari 15 jam kerja. Kemenangan ini membuktikan kualitas kurikulum IT di SMK Nusantara yang selaras dengan standar industri global.', '2025-12-22 14:09:27', '2025-12-22 14:09:27'),
(2, 'Medali Emas Olimpiade Jaringan Telkom', 'medali-emas-olimpiade-jaringan-telkom', 'Jurusan', 'Team TJAT SMK Nusantara', '2023', 'Nasional', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', 'Keunggulan dalam konfigurasi dan optimasi jaringan fiber optik skala enterprise.', 'Tim Teknik Jaringan Akses Telekomunikasi (TJAT) SMK Nusantara menunjukkan dominasinya dalam Olimpiade Jaringan yang diselenggarakan oleh PT Telkom Indonesia. Mereka berhasil melakukan penyambungan fiber optik (splicing) tercepat dengan loss signal hampir nol persen, serta melakukan instalasi FTTH yang rapi sesuai standar teknis perusahaan.', '2025-12-22 14:09:27', '2025-12-22 14:09:27'),
(3, 'Juara 1 English Debate Competition (EDC)', 'juara-1-english-debate-competition-edc', 'Bahasa', 'English Club SMK Nusantara', '2023', 'Provinsi', 'https://images.unsplash.com/photo-1475721027785-f74dea99990b?auto=format&fit=crop&q=80&w=800', 'Kecerdasan artikulasi dan argumentasi kritis dalam bahasa Inggris di tingkat provinsi.', 'Tim debat bahasa Inggris SMK Nusantara membuktikan bahwa kompetensi siswa vokasi tidak hanya terbatas pada skill teknis. Dalam EDC tingkat provinsi, mereka berhasil memenangkan mosi mengenai dampak AI terhadap lapangan kerja masa depan dengan argumen yang solid dan riset mendalam.', '2025-12-22 14:09:27', '2025-12-22 14:09:27'),
(4, 'Medali Perak National Robotic Olympiad', 'medali-perak-national-robotic-olympiad', 'Teknologi', 'Robotic Team', '2023', 'Nasional', 'https://images.unsplash.com/photo-1531746790731-6c2079ee3a4b?auto=format&fit=crop&q=80&w=800', 'Inovasi robot penyelamat (rescue robot) dengan sistem kendali cerdas dan responsif.', 'Tim Robotik SMK Nusantara merancang Prototipe Rescue Robot yang mampu melewati rintangan sulit dan memetakan lokasi bencana secara real-time. Karya ini mendapatkan apresiasi tinggi dari dewan juri National Robotic Olympiad karena efisiensi algoritma navigasinya.', '2025-12-22 14:09:27', '2025-12-22 14:09:27'),
(5, 'Juara 1 Futsal Championship Pelajar', 'juara-1-futsal-championship-pelajar', 'Olahraga', 'Tim Futsal SMK Nusantara', '2023', 'Kota', 'https://images.unsplash.com/photo-1510051646651-d410098f95c4?auto=format&fit=crop&q=80&w=800', 'Semangat tim dan sportivitas tinggi yang mengantarkan gelar juara pertama.', 'Setelah melalui perjuangan panjang di babak penyisihan, tim futsal sekolah berhasil membawa pulang trofi juara pertama. Kemenangan ini diraih berkat kerjasama tim yang solid, strategi pelatih yang jitu, dan dukungan penuh dari seluruh suporter sekolah di stadion.', '2025-12-22 14:09:27', '2025-12-22 14:09:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `privacy_policy`
--

CREATE TABLE `privacy_policy` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Kebijakan Privasi',
  `content` longtext NOT NULL,
  `last_updated` datetime DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `privacy_policy`
--

INSERT INTO `privacy_policy` (`id`, `title`, `content`, `last_updated`, `created_at`, `updated_at`) VALUES
(1, 'Kebijakan Privasi', '\n        <h2>1. Pendahuluan</h2>\n        <p>Selamat datang di Website Resmi SMK Indonesia. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.</p>\n        \n        <h2>2. Informasi yang Kami Kumpulkan</h2>\n        <p>Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat menggunakan website kami, termasuk namun tidak terbatas pada:</p>\n        <ul>\n          <li>Nama lengkap</li>\n          <li>Alamat email</li>\n          <li>Nomor telepon</li>\n          <li>Alamat rumah</li>\n          <li>Informasi akademik (untuk keperluan PPDB)</li>\n        </ul>\n\n        <h2>3. Penggunaan Informasi</h2>\n        <p>Informasi yang kami kumpulkan digunakan untuk:</p>\n        <ul>\n          <li>Memproses pendaftaran siswa baru (PPDB).</li>\n          <li>Memberikan informasi terkini mengenai kegiatan sekolah.</li>\n          <li>Menyediakan layanan administrasi akademik.</li>\n          <li>Meningkatkan pengalaman pengguna di website kami.</li>\n        </ul>\n\n        <h2>4. Perlindungan Data</h2>\n        <p>Kami mengimplementasikan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Data Anda disimpan dalam jaringan yang aman dan hanya dapat diakses oleh sejumlah orang terbatas yang memiliki hak akses khusus.</p>\n\n        <h2>5. Cookies</h2>\n        <p>Website kami dapat menggunakan cookies untuk meningkatkan pengalaman navigasi Anda. Anda dapat memilih untuk menonaktifkan cookies melalui pengaturan browser Anda.</p>\n\n        <h2>6. Kontak Kami</h2>\n        <p>Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui halaman kontak yang tersedia.</p>\n      ', '2025-12-22 17:32:43', '2025-12-22 17:32:43', '2025-12-22 17:32:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `profil_sekolah`
--

CREATE TABLE `profil_sekolah` (
  `id` int(11) NOT NULL,
  `hero_title` varchar(255) NOT NULL,
  `hero_subtitle` varchar(255) NOT NULL,
  `hero_description` text NOT NULL,
  `visi_title` varchar(255) NOT NULL,
  `visi_content` text NOT NULL,
  `misi_title` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `profil_sekolah`
--

INSERT INTO `profil_sekolah` (`id`, `hero_title`, `hero_subtitle`, `hero_description`, `visi_title`, `visi_content`, `misi_title`, `updated_at`) VALUES
(1, 'Dedikasi Untuk Masa Depan', 'Edukasi Berkualitas Dunia', 'Menjelajahi identitas SMK Nusantara sebagai pelopor pendidikan vokasi modern yang menggabungkan keahlian industri dengan karakter unggul.', 'Visi Utama', 'Menjadi epicenter pendidikan kejuruan yang menghasilkan pemimpin masa depan berkarakter global, kompeten secara teknis, dan memiliki jiwa inovator yang berdaya saing internasional.', 'Misi Strategis', '2025-12-22 11:50:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `program_keahlian`
--

CREATE TABLE `program_keahlian` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `short_desc` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `prospects` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`prospects`)),
  `key_techs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`key_techs`)),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `program_keahlian`
--

INSERT INTO `program_keahlian` (`id`, `name`, `slug`, `short_desc`, `description`, `image`, `icon`, `prospects`, `key_techs`, `created_at`, `updated_at`) VALUES
(7, 'Teknik Jaringan Akses Telekomunikasi', 'tjat', 'Membangun konektivitas masa depan dengan teknologi serat optik dan nirkabel', 'Program keahlian ini berfokus pada teknik pembangunan, pengoperasian, dan pemeliharaan jaringan akses telekomunikasi, termasuk fiber optik (FTTH), sistem radio, dan infrastruktur seluler.', '/uploads/1766358259217-343573149.jpg', 'Network', '[\"Fiber Optic Specialist\",\"Telecom Engineer\",\"Maintenance Technical Staff\",\"RF Engineer\"]', '[\"Smart Home\",\"Smart Village​\"]', '2025-12-21 13:47:49', '2025-12-22 06:04:21'),
(8, 'Teknik Komputer dan Jaringan', 'tkj', 'Ahli dalam membangun dan mengelola infrastruktur IT modern', 'Mempelajari instalasi, konfigurasi, dan troubleshooting jaringan komputer serta sistem server dan keamanan jaringan untuk mendukung kebutuhan perusahaan IT.', '/uploads/1766358265544-795977485.jpg', 'Network', '[\"Network Administrator\",\"System Administrator\",\"Cyber Security Staff\",\"Cloud Engineer\"]', '[\"Cloud Infrastructure​\"]', '2025-12-21 13:47:59', '2025-12-22 06:04:26'),
(9, 'Rekayasa Perangkat Lunak', 'rpl', 'Kembangkan aplikasi cerdas untuk berbagai platform digital', 'Mempelajari siklus pengembangan perangkat lunak lengkap, mulai dari pemrograman web, mobile, hingga integasi AI dan manajemen database.', '/uploads/1766358272990-243784980.jpg', 'Code', '[\"Fullstack Developer\",\"Mobile Developer\",\"UI/UX Designer\",\"Software Architect\"]', '[\"Artificial Intelligence\",\"Digital Product Development​\"]', '2025-12-21 13:47:59', '2025-12-22 06:04:33'),
(10, 'Animasi', 'ani', 'Wujudkan imajinasi melalui karya visual 2D dan 3D yang hidup', 'Program keahlian yang mempelajari teknik pembuatan animasi, peragaan visual, modeling 3D, serta manajemen produksi konten visual untuk industri kreatif.', '/uploads/1766358279022-70624340.jpg', 'Palette', '[\"Animator\",\"3D Modeler\",\"Creative Director\",\"Storyboard Artist\"]', '[\"Creative Digital Content\"]', '2025-12-21 13:47:59', '2025-12-22 06:04:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sambutan`
--

CREATE TABLE `sambutan` (
  `id` int(11) NOT NULL,
  `principal_name` varchar(255) NOT NULL,
  `principal_role` varchar(255) NOT NULL,
  `principal_image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `greeting` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `quote_footer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `sambutan`
--

INSERT INTO `sambutan` (`id`, `principal_name`, `principal_role`, `principal_image`, `title`, `greeting`, `content`, `quote_footer`) VALUES
(1, 'Drs. H. Mulyadi, M.Pd.', 'Kepala Sekolah SMK Nusantara', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', 'Membangun Generasi Siap Kerja & Inovatif', 'Assalamu\'alaikum Warahmatullahi Wabarakatuh,', 'Selamat datang di portal informasi resmi SMK Nusantara. Era digital menuntut kita untuk selalu adaptif dan inovatif. Di SMK Nusantara, kami berkomitmen untuk tidak hanya membekali siswa dengan keahlian teknis (hard skills) yang mumpuni sesuai standar industri, tetapi juga karakter yang kuat dan etos kerja yang tinggi.\n\nBersama tenaga pendidik yang profesional dan fasilitas laboratorium yang modern, kami mengundang putra-putri terbaik bangsa untuk bergabung dan bertransformasi menjadi tenaga kerja unggul yang siap menghadapi tantangan global.', '- Maju Bersama, Hebat Semua!');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sejarah`
--

CREATE TABLE `sejarah` (
  `id` int(11) NOT NULL,
  `year` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `sejarah`
--

INSERT INTO `sejarah` (`id`, `year`, `title`, `description`) VALUES
(1, '1995', 'Era Perintisan', 'Dimulai sebagai STM Nusantara dengan fokus pada teknik mesin dan otomotif. Membangun fondasi pendidikan vokasi yang disiplin.'),
(2, '2005', 'Transformasi Digital Pertama', 'Berubah nama menjadi SMK Nusantara dan membuka departemen Teknologi Informasi, merespon revolusi digital awal di Indonesia.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20251220164052-create-admins-table.js'),
('20251220164230-create-kategori-berita-table.js'),
('20251221022906-create-album-and-update-galeri.js'),
('20251221061500-add-tag-to-hero-slides.js'),
('20251221064509-add-fields-to-program-keahlian.js'),
('20251221065446-add-key-techs-to-program-keahlian.js'),
('20251222120006-create-struktur-organisasi-table.js'),
('20251222121528-update-struktur-organisasi-hierarchy.js'),
('20251222122513-create-guru-table.js'),
('20251222132301-create-keunggulan-table.js'),
('20251222133020-create-sambutan-table.js'),
('20251222133834-create-fasilitas.js'),
('20251222133943-create-statistik-table.js'),
('20251222135247-create-industry-partners.js'),
('20251222135253-create-industry-programs.js'),
('20251222135258-create-industry-stats.js'),
('20251222140100-create-prestasi-table.js'),
('20251222140105-create-messages-table.js'),
('20251222140111-create-contact-info-table.js'),
('20251222151922-create-ppdb-info.js'),
('20251222173153-add-footer-desc-and-privacy-policy.js'),
('20251222175630-create-visitor-logs-table.js'),
('20251222180320-add-session-id-to-visitor-logs.js'),
('20251222181004-add-role-to-admins-table.js'),
('20251222183000-create-profil-tables.js'),
('20251222233000-create-site-settings-table.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `school_name` varchar(255) NOT NULL DEFAULT 'SMK Indonesia',
  `school_logo` varchar(255) DEFAULT NULL,
  `seo_keywords` text DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `footer_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `site_settings`
--

INSERT INTO `site_settings` (`id`, `school_name`, `school_logo`, `seo_keywords`, `seo_description`, `created_at`, `updated_at`, `footer_description`) VALUES
(1, 'SMK TELKOM LAMPUNG', '/uploads/1766421686454-476553267.png', 'smk, sekolah, indonesia, pendidikan, vokasi', 'Website resmi SMK Indonesia untuk informasi pendaftaran, kegiatan sekolah, dan prestasi siswa.', '2025-12-22 16:26:06', '2025-12-23 00:31:45', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `statistik`
--

CREATE TABLE `statistik` (
  `id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `value` int(11) NOT NULL DEFAULT 0,
  `icon` varchar(100) NOT NULL,
  `suffix` varchar(20) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `statistik`
--

INSERT INTO `statistik` (`id`, `label`, `value`, `icon`, `suffix`) VALUES
(1, 'Siswa Aktif', 1250, 'Users', '+'),
(2, 'Guru & Staff', 85, 'GraduationCap', ''),
(3, 'Program Keahlian', 6, 'Building', ''),
(4, 'Prestasi', 200, 'Trophy', '+'),
(5, 'Mitra Industri', 50, 'Briefcase', '+'),
(6, 'Alumni Sukses', 5000, 'Award', '+');

-- --------------------------------------------------------

--
-- Struktur dari tabel `struktur_organisasi`
--

CREATE TABLE `struktur_organisasi` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `order_priority` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `parent_id` int(11) DEFAULT NULL,
  `connection_type` enum('subordinate','coordination') DEFAULT 'subordinate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `struktur_organisasi`
--

INSERT INTO `struktur_organisasi` (`id`, `name`, `role`, `image`, `type`, `description`, `order_priority`, `created_at`, `updated_at`, `parent_id`, `connection_type`) VALUES
(11, 'Dr. H. Ahmad Fauzi, M.Pd.', 'Kepala Sekolah', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', 'kepala_sekolah', 'Memimpin dengan visi teknologi dan integritas untuk mencetak generasi unggul.', 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', NULL, 'subordinate'),
(12, 'Ir. H. Mulyadi, M.T.', 'Ketua Komite Sekolah', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', 'komite_sekolah', NULL, 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'coordination'),
(13, 'Dra. Hj. Siti Sarah', 'Kepala Administrasi', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 'kepala_administrasi', NULL, 2, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'subordinate'),
(14, 'Ani Maryani, S.E.', 'Kaur Keuangan', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 13, 'subordinate'),
(15, 'Dedi Setiadi, S.Sos.', 'Kaur Human Capital, Logistik & Sekretariat', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 2, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 13, 'subordinate'),
(16, 'Rina Wijaya, M.Pd.', 'Kaur Quality Development & Performance Management', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 3, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'coordination'),
(17, 'Drs. Bambang Sudarsono', 'Waka Bidang Kurikulum', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', 'wakil_kepala_sekolah', NULL, 4, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'subordinate'),
(18, 'Eko Prasetyo, S.Pd.', 'Kaur Pengembangan KurSilMat', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 17, 'subordinate'),
(19, 'Maya Sofia, S.I.Pust.', 'Admin Pelaksana Pembelajaran Perpustakaan', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', 'staf', NULL, 2, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 17, 'subordinate'),
(20, 'Budi Pratama, S.T.', 'Ketua Program Studi TJKT', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', 'ketua_prodi', NULL, 3, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 17, 'subordinate'),
(21, 'Siska Putri, M.Sn.', 'Ketua Program Studi PPLG Animasi', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', 'ketua_prodi', NULL, 4, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 17, 'subordinate'),
(22, 'Siti Aminah, S.Pd.', 'Waka Bidang Kesiswaan', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 'wakil_kepala_sekolah', NULL, 5, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'subordinate'),
(23, 'Hendra Kurniawan, S.Pd.', 'Admin Pelaksana BK Karakter', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', 'staf', NULL, 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 22, 'subordinate'),
(24, 'Andi Wijaya, S.Pd.', 'Admin Pelaksana Ekstrakurikuler Pembinaan Prestasi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 'staf', NULL, 2, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 22, 'subordinate'),
(25, 'Taufik Hidayat, M.T.', 'Waka Bidang Hubungan Industri', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', 'wakil_kepala_sekolah', NULL, 6, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'subordinate'),
(26, 'Lilis Suryani, S.I.Kom.', 'Kaur SPMB Komunikasi', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 25, 'subordinate'),
(27, 'Bambang Heru, S.T.', 'Kaur Sinergi Unit Produksi Alumni', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 2, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 25, 'subordinate'),
(28, 'M. Ridwan, S.T.', 'Waka Bidang IT, Laboratorium Sarpra', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 'wakil_kepala_sekolah', NULL, 7, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 11, 'subordinate'),
(29, 'Fajar Ramadhan, S.Kom.', 'Kaur IT', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 1, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 12, 'subordinate'),
(30, 'Agus Santoso, S.T.', 'Kaur Sarana Prasarana', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 2, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 12, 'subordinate'),
(31, 'Dewi Lestari, M.T.', 'Kaur Laboratorium', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 'kaur', NULL, 3, '2025-12-22 12:17:27', '2025-12-22 12:17:27', 12, 'subordinate');

-- --------------------------------------------------------

--
-- Struktur dari tabel `testimoni`
--

CREATE TABLE `testimoni` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `testimoni`
--

INSERT INTO `testimoni` (`id`, `name`, `role`, `content`, `image`) VALUES
(1, 'Budi Santoso', 'Alumni 2022 - Software Developer di Tokopedia', 'SMK Nusantara memberikan fondasi yang kuat untuk karir saya di dunia IT. Ilmu yang didapat sangat relevan dengan kebutuhan industri.', '/uploads/1766289331653-253073641.jpg'),
(2, 'Siti Nurhaliza', 'Alumni 2021 - Network Engineer di Telkom', 'Fasilitas praktik yang lengkap dan guru-guru yang kompeten membuat pembelajaran sangat efektif. Terima kasih SMK Nusantara!', '/uploads/1766289325054-667886792.JPG'),
(3, 'Ahmad Rizki', 'Alumni 2023 - Graphic Designer Freelance', 'Di sini saya belajar tidak hanya skill teknis, tapi juga soft skill dan karakter yang dibutuhkan di dunia kerja.', '/uploads/1766289317320-483186089.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `visitor_logs`
--

CREATE TABLE `visitor_logs` (
  `id` int(11) NOT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `log_type` enum('session_start','page_view') DEFAULT 'page_view',
  `ip_address` varchar(45) NOT NULL,
  `user_agent` text DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `referrer` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data untuk tabel `visitor_logs`
--

INSERT INTO `visitor_logs` (`id`, `session_id`, `log_type`, `ip_address`, `user_agent`, `path`, `referrer`, `created_at`) VALUES
(1, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 00:58:35'),
(2, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:58:35'),
(3, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 00:58:35'),
(4, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 00:59:09'),
(5, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:09'),
(6, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 00:59:22'),
(7, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 00:59:22'),
(8, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:22'),
(9, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/settings', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(10, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/hero-slides', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(11, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/keunggulan', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(12, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/sambutan', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(13, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(14, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/statistik', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(15, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/testimoni', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(16, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(17, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:33'),
(18, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 00:59:40'),
(19, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 00:59:40'),
(20, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:40'),
(21, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/hero-slides', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(22, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/keunggulan', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(23, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/sambutan', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(24, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(25, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/statistik', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(26, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/testimoni', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(27, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(28, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:44'),
(29, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 00:59:45'),
(30, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 00:59:45'),
(31, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 00:59:46'),
(32, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 00:59:46'),
(33, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:46'),
(34, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 00:59:48'),
(35, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 00:59:48'),
(36, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 00:59:48'),
(37, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 00:59:48'),
(38, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 00:59:48'),
(39, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 01:00:02'),
(40, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 01:00:02'),
(41, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:07'),
(42, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:07'),
(43, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:07'),
(44, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 01:00:09'),
(45, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 01:00:09'),
(46, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:11'),
(47, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:11'),
(48, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:11'),
(49, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 01:00:13'),
(50, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 01:00:13'),
(51, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/hero-slides', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(52, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/sambutan', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(53, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/keunggulan', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(54, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/programs', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(55, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/statistik', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(56, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(57, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/testimoni', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(58, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/contact-info', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(59, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(60, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(61, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:14'),
(62, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:23'),
(63, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:26'),
(64, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:26'),
(65, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:26'),
(66, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:30'),
(67, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:30'),
(68, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/settings', 'http://127.0.0.1:8080/', '2025-12-23 01:00:30'),
(69, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:30'),
(70, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/settings', 'http://127.0.0.1:8080/', '2025-12-23 01:00:32'),
(71, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:32'),
(72, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:32'),
(73, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:32'),
(74, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:35'),
(75, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/statistik', 'http://127.0.0.1:8080/', '2025-12-23 01:00:35'),
(76, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:36'),
(77, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/sambutan', 'http://127.0.0.1:8080/', '2025-12-23 01:00:36'),
(78, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:00:39'),
(79, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:00:39'),
(80, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:00:39'),
(81, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/settings', 'http://127.0.0.1:8080/', '2025-12-23 01:01:08'),
(82, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/messages', 'http://127.0.0.1:8080/', '2025-12-23 01:01:08'),
(83, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/stats', 'http://127.0.0.1:8080/', '2025-12-23 01:01:08'),
(84, NULL, 'page_view', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/api/berita', 'http://127.0.0.1:8080/', '2025-12-23 01:01:08'),
(85, '10e78a19-f280-444b-b7a7-27f7a4b50b67', 'session_start', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '/', 'http://127.0.0.1:8080/', '2025-12-23 01:05:22');

--
-- Indeks untuk tabel yang dibuang
--

--
-- Indeks untuk tabel `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `fasilitas`
--
ALTER TABLE `fasilitas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `galeri`
--
ALTER TABLE `galeri`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galeri_album_id_foreign_idx` (`album_id`);

--
-- Indeks untuk tabel `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `industry_partners`
--
ALTER TABLE `industry_partners`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `industry_programs`
--
ALTER TABLE `industry_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `industry_stats`
--
ALTER TABLE `industry_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `info_sekolah`
--
ALTER TABLE `info_sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kategori_berita`
--
ALTER TABLE `kategori_berita`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `keunggulan`
--
ALTER TABLE `keunggulan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `misi_items`
--
ALTER TABLE `misi_items`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `ppdbinfos`
--
ALTER TABLE `ppdbinfos`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `prestasi`
--
ALTER TABLE `prestasi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `privacy_policy`
--
ALTER TABLE `privacy_policy`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `profil_sekolah`
--
ALTER TABLE `profil_sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `program_keahlian`
--
ALTER TABLE `program_keahlian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `sambutan`
--
ALTER TABLE `sambutan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sejarah`
--
ALTER TABLE `sejarah`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `statistik`
--
ALTER TABLE `statistik`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `struktur_organisasi`
--
ALTER TABLE `struktur_organisasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `struktur_organisasi_parent_id_foreign_idx` (`parent_id`);

--
-- Indeks untuk tabel `testimoni`
--
ALTER TABLE `testimoni`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `visitor_logs`
--
ALTER TABLE `visitor_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visitor_logs_created_at` (`created_at`),
  ADD KEY `visitor_logs_ip_address` (`ip_address`),
  ADD KEY `visitor_logs_session_id` (`session_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `berita`
--
ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `fasilitas`
--
ALTER TABLE `fasilitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `galeri`
--
ALTER TABLE `galeri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `industry_partners`
--
ALTER TABLE `industry_partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `industry_programs`
--
ALTER TABLE `industry_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `industry_stats`
--
ALTER TABLE `industry_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `info_sekolah`
--
ALTER TABLE `info_sekolah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `kategori_berita`
--
ALTER TABLE `kategori_berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `keunggulan`
--
ALTER TABLE `keunggulan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `misi_items`
--
ALTER TABLE `misi_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `ppdbinfos`
--
ALTER TABLE `ppdbinfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `prestasi`
--
ALTER TABLE `prestasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `privacy_policy`
--
ALTER TABLE `privacy_policy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `profil_sekolah`
--
ALTER TABLE `profil_sekolah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `program_keahlian`
--
ALTER TABLE `program_keahlian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `sambutan`
--
ALTER TABLE `sambutan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `sejarah`
--
ALTER TABLE `sejarah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `statistik`
--
ALTER TABLE `statistik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `struktur_organisasi`
--
ALTER TABLE `struktur_organisasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `testimoni`
--
ALTER TABLE `testimoni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `visitor_logs`
--
ALTER TABLE `visitor_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `galeri`
--
ALTER TABLE `galeri`
  ADD CONSTRAINT `galeri_album_id_foreign_idx` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `struktur_organisasi`
--
ALTER TABLE `struktur_organisasi`
  ADD CONSTRAINT `struktur_organisasi_parent_id_foreign_idx` FOREIGN KEY (`parent_id`) REFERENCES `struktur_organisasi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
