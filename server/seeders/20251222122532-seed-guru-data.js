'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('guru', [
      {
        name: "Budi Santoso, S.Kom, M.T.",
        subject: "RPL & Cyber Security",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        bio: "Seorang ahli teknologi dengan pengalaman lebih dari 15 tahun di industri software development.",
        education: "S2 Magister Teknik Informatika",
        experience: "15+ Tahun",
        instagram_url: "#",
        linkedin_url: "#",
        order_priority: 1,
        is_pioneer: true
      },
      {
        name: "Siti Aminah, M.Pd.",
        subject: "Bahasa Inggris & Literasi",
        image: "https://images.unsplash.com/photo-1580894732230-28d1d0c11438?auto=format&fit=crop&q=80&w=400",
        bio: "Dedikasi tinggi dalam mengembangkan kemampuan komunikasi global siswa melalui metode pengajaran interaktif.",
        education: "S2 Pendidikan Bahasa Inggris",
        experience: "10+ Tahun",
        instagram_url: "#",
        linkedin_url: "#",
        order_priority: 2,
        is_pioneer: false
      },
      {
        name: "Drs. Heru Wijaya",
        subject: "Fisika Terapan & Robotik",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        bio: "Mengintegrasikan prinsip fisika ke dalam teknologi modern khususnya dalam bidang otomasi dan robotika.",
        education: "S1 Pendidikan Fisika",
        experience: "25+ Tahun",
        instagram_url: "#",
        linkedin_url: "#",
        order_priority: 3,
        is_pioneer: false
      },
      {
        name: "Ani Maryani, S.ST, M.Kom",
        subject: "UI/UX Design & Multimedia",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
        bio: "Fokus pada pengembangan sisi kreatif siswa dalam menciptakan desain solusi digital yang human-centric.",
        education: "S2 Sistem Informasi",
        experience: "8+ Tahun",
        instagram_url: "#",
        linkedin_url: "#",
        order_priority: 4,
        is_pioneer: false
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('guru', null, {});
  }
};
