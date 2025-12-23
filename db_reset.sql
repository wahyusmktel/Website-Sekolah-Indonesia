DROP DATABASE `website-sekolah-indonesia`;
CREATE DATABASE `website-sekolah-indonesia` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON `website-sekolah-indonesia`.* TO 'sekolah_user'@'localhost';
FLUSH PRIVILEGES;
