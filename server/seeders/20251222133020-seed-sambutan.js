'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('sambutan', [
            {
                principal_name: "Drs. H. Mulyadi, M.Pd.",
                principal_role: "Kepala Sekolah SMK Nusantara",
                principal_image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
                title: "Membangun Generasi Siap Kerja & Inovatif",
                greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh,",
                content: "Selamat datang di portal informasi resmi SMK Nusantara. Era digital menuntut kita untuk selalu adaptif dan inovatif. Di SMK Nusantara, kami berkomitmen untuk tidak hanya membekali siswa dengan keahlian teknis (hard skills) yang mumpuni sesuai standar industri, tetapi juga karakter yang kuat dan etos kerja yang tinggi.\n\nBersama tenaga pendidik yang profesional dan fasilitas laboratorium yang modern, kami mengundang putra-putri terbaik bangsa untuk bergabung dan bertransformasi menjadi tenaga kerja unggul yang siap menghadapi tantangan global.",
                quote_footer: "- Maju Bersama, Hebat Semua!",
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('sambutan', null, {});
    }
};
