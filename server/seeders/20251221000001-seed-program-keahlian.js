'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('program_keahlian', [
            {
                name: "Teknik Jaringan Akses Telekomunikasi",
                slug: "tjat",
                short_desc: "Membangun konektivitas masa depan dengan teknologi serat optik dan nirkabel",
                description: "Program keahlian ini berfokus pada teknik pembangunan, pengoperasian, dan pemeliharaan jaringan akses telekomunikasi, termasuk fiber optik (FTTH), sistem radio, dan infrastruktur seluler.",
                image: "/placeholder.svg",
                icon: "Network",
                prospects: JSON.stringify(["Fiber Optic Specialist", "Telecom Engineer", "Maintenance Technical Staff", "RF Engineer"]),
            },
            {
                name: "Teknik Komputer dan Jaringan",
                slug: "tkj",
                short_desc: "Ahli dalam membangun dan mengelola infrastruktur IT modern",
                description: "Mempelajari instalasi, konfigurasi, dan troubleshooting jaringan komputer serta sistem server dan keamanan jaringan untuk mendukung kebutuhan perusahaan IT.",
                image: "/placeholder.svg",
                icon: "Network",
                prospects: JSON.stringify(["Network Administrator", "System Administrator", "Cyber Security Staff", "Cloud Engineer"]),
            },
            {
                name: "Rekayasa Perangkat Lunak",
                slug: "rpl",
                short_desc: "Kembangkan aplikasi cerdas untuk berbagai platform digital",
                description: "Mempelajari siklus pengembangan perangkat lunak lengkap, mulai dari pemrograman web, mobile, hingga integasi AI dan manajemen database.",
                image: "/placeholder.svg",
                icon: "Code",
                prospects: JSON.stringify(["Fullstack Developer", "Mobile Developer", "UI/UX Designer", "Software Architect"]),
            },
            {
                name: "Animasi",
                slug: "ani",
                short_desc: "Wujudkan imajinasi melalui karya visual 2D dan 3D yang hidup",
                description: "Program keahlian yang mempelajari teknik pembuatan animasi, peragaan visual, modeling 3D, serta manajemen produksi konten visual untuk industri kreatif.",
                image: "/placeholder.svg",
                icon: "Palette",
                prospects: JSON.stringify(["Animator", "3D Modeler", "Creative Director", "Storyboard Artist"]),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('program_keahlian', null, {});
    }
};
