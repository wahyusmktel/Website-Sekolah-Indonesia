'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Insert freestanding Galeri items
        await queryInterface.bulkInsert('galeri', [
            { title: "Upacara Bendera", category: "Kegiatan", image: "/placeholder.svg", album_id: null },
            { title: "Praktik Lab Komputer", category: "Pembelajaran", image: "/placeholder.svg", album_id: null },
            { title: "Lomba Kompetensi", category: "Prestasi", image: "/placeholder.svg", album_id: null },
            { title: "Kunjungan Industri", category: "Kegiatan", image: "/placeholder.svg", album_id: null },
            { title: "Pentas Seni", category: "Ekstrakurikuler", image: "/placeholder.svg", album_id: null },
            { title: "Wisuda 2023", category: "Kegiatan", image: "/placeholder.svg", album_id: null },
            { title: "Workshop IT", category: "Pembelajaran", image: "/placeholder.svg", album_id: null },
            { title: "Olahraga Bersama", category: "Ekstrakurikuler", image: "/placeholder.svg", album_id: null },
        ], {});

        // 2. Insert Albums
        const albums = [
            {
                slug: "wisuda-2023",
                title: "Wisuda Angkatan 2023",
                cover_image: "https://images.unsplash.com/photo-1523050335456-c3cc73c68326?auto=format&fit=crop&q=80&w=800",
                category: "Kegiatan",
                date: "2023-05-25",
                description: "Momen membanggakan pelepasan siswa-siswi SMK Nusantara angkatan ke-25.",
            },
            {
                slug: "lks-nasional-2024",
                title: "LKS Nasional 2024",
                cover_image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
                category: "Prestasi",
                date: "2024-02-15",
                description: "Dokumentasi perjuangan siswa SMK Nusantara dalam ajang Lomba Kompetensi Siswa tingkat Nasional.",
            },
            {
                slug: "praktik-industri-tjat",
                title: "Praktik Industri TJAT",
                cover_image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
                category: "Pembelajaran",
                date: "2024-01-20",
                description: "Kegiatan praktik lapangan siswa jurusan Teknik Jaringan Akses Telekomunikasi di mitra industri.",
            },
            {
                slug: "pentas-seni-budaya",
                title: "Pentas Seni Budaya",
                cover_image: "https://images.unsplash.com/photo-1514525253344-f81fbd67b551?auto=format&fit=crop&q=80&w=800",
                category: "Ekstrakurikuler",
                date: "2023-11-10",
                description: "Pertunjukan bakat dan kreativitas siswa dalam melestarikan budaya nusantara.",
            }
        ];

        await queryInterface.bulkInsert('album', albums, {});

        // 3. Get Album IDs and Insert linked Galeri items
        const [albumRows] = await queryInterface.sequelize.query('SELECT id, slug FROM album');
        const albumMap = albumRows.reduce((acc, row) => {
            acc[row.slug] = row.id;
            return acc;
        }, {});

        const galleryItems = [];

        // Album 1 Items
        galleryItems.push(
            { title: "Prosesi Wisuda", image: "https://images.unsplash.com/photo-1523050335456-c3cc73c68326?auto=format&fit=crop&q=80&w=800", category: "Kegiatan", album_id: albumMap["wisuda-2023"] },
            { title: "Pemberian Piagam", image: "https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?auto=format&fit=crop&q=80&w=800", category: "Kegiatan", album_id: albumMap["wisuda-2023"] },
            { title: "Foto Bersama Guru", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800", category: "Kegiatan", album_id: albumMap["wisuda-2023"] },
            { title: "Keceriaan Wisudawan", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", category: "Kegiatan", album_id: albumMap["wisuda-2023"] }
        );

        // Album 2 Items
        galleryItems.push(
            { title: "Persiapan Lomba", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", category: "Prestasi", album_id: albumMap["lks-nasional-2024"] },
            { title: "Presentasi Karya", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", category: "Prestasi", album_id: albumMap["lks-nasional-2024"] },
            { title: "Penilaian Juri", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", category: "Prestasi", album_id: albumMap["lks-nasional-2024"] },
            { title: "Pengumuman Juara", image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800", category: "Prestasi", album_id: albumMap["lks-nasional-2024"] }
        );

        // Album 3 Items
        galleryItems.push(
            { title: "Instalasi Fiber Optik", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800", category: "Pembelajaran", album_id: albumMap["praktik-industri-tjat"] },
            { title: "Konfigurasi Perangkat", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800", category: "Pembelajaran", album_id: albumMap["praktik-industri-tjat"] },
            { title: "Pengecekan Jaringan", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800", category: "Pembelajaran", album_id: albumMap["praktik-industri-tjat"] },
            { title: "Diskusi Teknis", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", category: "Pembelajaran", album_id: albumMap["praktik-industri-tjat"] }
        );

        // Album 4 Items
        galleryItems.push(
            { title: "Tari Tradisional", image: "https://images.unsplash.com/photo-1514525253344-f81fbd67b551?auto=format&fit=crop&q=80&w=800", category: "Ekstrakurikuler", album_id: albumMap["pentas-seni-budaya"] },
            { title: "Band Sekolah", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800", category: "Ekstrakurikuler", album_id: albumMap["pentas-seni-budaya"] },
            { title: "Teater", image: "https://images.unsplash.com/photo-1503095396549-807a8bc3667c?auto=format&fit=crop&q=80&w=800", category: "Ekstrakurikuler", album_id: albumMap["pentas-seni-budaya"] },
            { title: "Pameran Lukisan", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800", category: "Ekstrakurikuler", album_id: albumMap["pentas-seni-budaya"] }
        );

        await queryInterface.bulkInsert('galeri', galleryItems, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('galeri', null, {});
        await queryInterface.bulkDelete('album', null, {});
    }
};
