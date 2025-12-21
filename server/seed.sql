-- Insert Dummy Berita
INSERT INTO berita (title, slug, excerpt, content, image, category, author, date, views) VALUES
('SMK Nusantara Raih Juara 1 LKS Tingkat Nasional', 'smk-nusantara-juara-lks-nasional', 'Siswa SMK Nusantara berhasil meraih juara pertama dalam Lomba Kompetensi Siswa (LKS) tingkat nasional bidang IT Software Solution.', 'Lorem ipsum dolor sit amet...', '/placeholder.svg', 'Prestasi', 'Admin', '2024-01-15', 1250),
('Kunjungan Industri ke PT Telkom Indonesia', 'kunjungan-industri-telkom', 'Siswa jurusan TKJ dan RPL melakukan kunjungan industri ke PT Telkom Indonesia untuk melihat langsung dunia kerja.', 'Lorem ipsum dolor sit amet...', '/placeholder.svg', 'Kegiatan', 'Admin', '2024-01-10', 890),
('Workshop Digital Marketing Bersama Praktisi', 'workshop-digital-marketing', 'SMK Nusantara mengadakan workshop digital marketing dengan menghadirkan praktisi berpengalaman dari industri.', 'Lorem ipsum dolor sit amet...', '/placeholder.svg', 'Kegiatan', 'Admin', '2024-01-05', 567),
('Pembukaan Pendaftaran Siswa Baru 2024/2025', 'ppdb-2024-2025', 'SMK Nusantara membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025 dengan berbagai keunggulan.', 'Lorem ipsum dolor sit amet...', '/placeholder.svg', 'Pengumuman', 'Admin', '2024-01-01', 2340);

-- Insert Dummy Agenda
INSERT INTO agenda (title, date, end_date, location, description) VALUES
('Ujian Tengah Semester Genap', '2024-03-11', '2024-03-15', 'Ruang Kelas', 'Pelaksanaan UTS semester genap untuk semua kelas'),
('Career Day 2024', '2024-03-20', '2024-03-20', 'Aula Sekolah', 'Pameran karir dengan 30+ perusahaan partner'),
('Praktik Kerja Lapangan', '2024-04-01', '2024-06-30', 'Perusahaan Mitra', 'PKL untuk siswa kelas XI di perusahaan mitra'),
('Wisuda Angkatan 2024', '2024-05-25', '2024-05-25', 'Gedung Serbaguna', 'Acara pelepasan siswa kelas XII');

-- Insert Dummy Galeri
INSERT INTO galeri (title, category, image) VALUES
('Upacara Bendera', 'Kegiatan', '/placeholder.svg'),
('Praktik Lab Komputer', 'Pembelajaran', '/placeholder.svg'),
('Lomba Kompetensi', 'Prestasi', '/placeholder.svg'),
('Kunjungan Industri', 'Kegiatan', '/placeholder.svg'),
('Pentas Seni', 'Ekstrakurikuler', '/placeholder.svg'),
('Wisuda 2023', 'Kegiatan', '/placeholder.svg'),
('Workshop IT', 'Pembelajaran', '/placeholder.svg'),
('Olahraga Bersama', 'Ekstrakurikuler', '/placeholder.svg');
