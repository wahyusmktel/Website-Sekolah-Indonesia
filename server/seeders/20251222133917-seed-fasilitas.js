'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fasilitas', [
      {
        title: "Smart Digital Classroom",
        description: "Ruang belajar futuristik yang dirancang untuk kenyamanan maksimal dan efektivitas digital.",
        features: JSON.stringify(["AC & Air Purifier", "Smart TV 75 inch", "Glassboard", "High-speed WiFi 6", "CCTV 24/7", "Ergonomic Chairs"]),
        image: "https://images.unsplash.com/photo-1541339907198-e08756dee9b8?auto=format&fit=crop&q=80&w=1000",
        icon: "Monitor",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Advanced IT & Networking Lab",
        description: "Laboratorium berstandar industri dengan perangkat Cisco dan server mumpuni untuk praktek jaringan.",
        features: JSON.stringify(["Cisco Routers & Switches", "Rack Server", "Fiber Optic Splicer", "PC Core i9", "Dual Monitor Setup"]),
        image: "https://images.unsplash.com/photo-1558494949-ef010ccdcc58?auto=format&fit=crop&q=80&w=1000",
        icon: "Cpu",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Animation & Multimedia Studio",
        description: "Studio kreatif untuk produksi animasi dan konten multimedia dengan hardware kartu grafis tinggi.",
        features: JSON.stringify(["Wacom Cintiq Tablet", "Render Farm", "Green Screen Area", "Soundproof Room", "Professional Camera Gear"]),
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
        icon: "Layers",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Futuristic Library & Co-working",
        description: "Ruang baca digital dan area kolaborasi yang memacu lahirnya ide-ide inovatif.",
        features: JSON.stringify(["Digital Library App", "E-Book Tablets", "Bean Bag Area", "Discussion Pods", "Free Coffee Station"]),
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
        icon: "BookOpen",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Techno Hall & Arena",
        description: "Gedung serbaguna indoor untuk kegiatan olahraga, seminar teknologi, dan showcase karya.",
        features: JSON.stringify(["Full Sound System", "LED Videotron", "Basketball Court", "Badminton Court", "Retractable Seating"]),
        image: "https://images.unsplash.com/photo-1577416414929-7a4c9f1ac3c6?auto=format&fit=crop&q=80&w=1000",
        icon: "Activity",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Digital Smart Canteen",
        description: "Kantin bersih dan sehat dengan sistem pembayaran non-tunai dan pemesanan digital.",
        features: JSON.stringify(["Cashless Payment", "Digital Order Kiosks", "Eco-friendly Area", "Healthy Food Audit", "Outdoor Seating"]),
        image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=1000",
        icon: "Coffee",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fasilitas', null, {});
  }
};
