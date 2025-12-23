CREATE DATABASE `website-sekolah-indonesia` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sekolah_user'@'localhost' IDENTIFIED BY 'SekolahInd0nes1a!2025';
GRANT ALL PRIVILEGES ON `website-sekolah-indonesia`.* TO 'sekolah_user'@'localhost';
FLUSH PRIVILEGES;
