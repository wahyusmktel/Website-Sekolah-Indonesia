'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('industry_partners', [
      { name: "PT Telkom Indonesia", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/c/c8/Telkom_Indonesia_logo_2013.svg/1200px-Telkom_Indonesia_logo_2013.svg.png", category: "Telecommunication", order_priority: 1, created_at: new Date(), updated_at: new Date() },
      { name: "Cisco Systems", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png", category: "Networking", order_priority: 2, created_at: new Date(), updated_at: new Date() },
      { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1280px-Google_Cloud_logo.svg.png", category: "Cloud Computing", order_priority: 3, created_at: new Date(), updated_at: new Date() },
      { name: "PT Huawei Tech", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Huawei_Logo.svg/1200px-Huawei_Logo.svg.png", category: "Telecommunication", order_priority: 4, created_at: new Date(), updated_at: new Date() },
      { name: "Adobe Inc.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/1200px-Adobe_Systems_logo_and_wordmark.svg.png", category: "Creative Industry", order_priority: 5, created_at: new Date(), updated_at: new Date() },
      { name: "Tokopedia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_Tokopedia.svg/1200px-Logo_Tokopedia.svg.png", category: "Technology", order_priority: 6, created_at: new Date(), updated_at: new Date() },
      { name: "Traveloka", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/e/e9/Traveloka_logo.svg/1200px-Traveloka_logo.svg.png", category: "Technology", order_priority: 7, created_at: new Date(), updated_at: new Date() },
      { name: "Gojek", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png", category: "Technology", order_priority: 8, created_at: new Date(), updated_at: new Date() }
    ], {});

    await queryInterface.bulkInsert('industry_programs', [
      {
        title: "Kelas Industri (Co-Branded)",
        description: "Kurikulum yang disusun bersama industri untuk memastikan lulusan memiliki skill yang tepat sasaran.",
        icon: "Building2",
        order_priority: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Sertifikasi Internasional",
        description: "Siswa dibekali sertifikasi dari vendor global seperti Cisco (CCNA), Huawei (HCIA), dan Adobe (ACA).",
        icon: "Award",
        order_priority: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Praktik Kerja Lapangan (PKL)",
        description: "Penempatan magang minimal 6 bulan di perusahaan mitra strategis dengan bimbingan mentor profesional.",
        icon: "Briefcase",
        order_priority: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Bursa Kerja Khusus (BKK)",
        description: "Layanan penempatan kerja bagi alumni dengan jaringan lebih dari 100+ perusahaan nasional.",
        icon: "Target",
        order_priority: 4,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('industry_stats', [
      { label: "Partner Aktif", value: "120+", order_priority: 1, created_at: new Date(), updated_at: new Date() },
      { label: "Serapan Lulusan", value: "92%", order_priority: 2, created_at: new Date(), updated_at: new Date() },
      { label: "Kelas Industri", value: "8", order_priority: 3, created_at: new Date(), updated_at: new Date() },
      { label: "MoU International", value: "5", order_priority: 4, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('industry_partners', null, {});
    await queryInterface.bulkDelete('industry_programs', null, {});
    await queryInterface.bulkDelete('industry_stats', null, {});
  }
};
