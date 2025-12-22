'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Seed Profil Sekolah
        await queryInterface.bulkInsert('profil_sekolah', [
            {
                id: 1,
                hero_title: "Dedikasi Untuk Masa Depan",
                hero_subtitle: "Edukasi Berkualitas Dunia",
                hero_description: "Menjelajahi identitas SMK Nusantara sebagai pelopor pendidikan vokasi modern yang menggabungkan keahlian industri dengan karakter unggul.",
                visi_title: "Visi Utama",
                visi_content: "Menjadi epicenter pendidikan kejuruan yang menghasilkan pemimpin masa depan berkarakter global, kompeten secara teknis, dan memiliki jiwa inovator yang berdaya saing internasional.",
                misi_title: "Misi Strategis"
            }
        ], {});

        // Seed Misi Items
        await queryInterface.bulkInsert('misi_items', [
            { content: "Menyelenggarakan kurikulum berbasis industri terkini." },
            { content: "Membangun ekosistem pendidikan karakter yang inklusif." },
            { content: "Memperluas jejaring strategis dengan korporasi global." },
            { content: "Mendorong budaya riset dan inovasi teknologi terapan." }
        ], {});

        // Seed Sejarah
        await queryInterface.bulkInsert('sejarah', [
            {
                year: "1995",
                title: "Era Perintisan",
                description: "Dimulai sebagai STM Nusantara dengan fokus pada teknik mesin dan otomotif. Membangun fondasi pendidikan vokasi yang disiplin."
            },
            {
                year: "2005",
                title: "Transformasi Digital Pertama",
                description: "Berubah nama menjadi SMK Nusantara dan membuka departemen Teknologi Informasi, merespon revolusi digital awal di Indonesia."
            },
            {
                year: "2024",
                title: "Global Leadership",
                description: "Kini mengelola 6 program keahlian bertaraf internasional dengan kemitraan lebih dari 100 perusahaan global."
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('profil_sekolah', null, {});
        await queryInterface.bulkDelete('misi_items', null, {});
        await queryInterface.bulkDelete('sejarah', null, {});
    }
};
