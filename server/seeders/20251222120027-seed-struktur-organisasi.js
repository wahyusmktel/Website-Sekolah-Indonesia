'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('struktur_organisasi', null, {});

    // 1. Kepala Sekolah
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Dr. H. Ahmad Fauzi, M.Pd.",
      role: "Kepala Sekolah",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      type: "kepala_sekolah",
      description: "Memimpin dengan visi teknologi dan integritas untuk mencetak generasi unggul.",
      order_priority: 1
    }]);

    const kepsek = await queryInterface.sequelize.query(
      `SELECT id from struktur_organisasi where type = 'kepala_sekolah' LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const kepsekId = kepsek[0].id;

    // 2. Komite Sekolah (Coordination with Kepsek)
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Ir. H. Mulyadi, M.T.",
      role: "Ketua Komite Sekolah",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      type: "komite_sekolah",
      parent_id: kepsekId,
      connection_type: "coordination",
      order_priority: 1
    }]);

    // 3. Kepala Administrasi (Right of Kepsek / Subordinate)
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Dra. Hj. Siti Sarah",
      role: "Kepala Administrasi",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      type: "kepala_administrasi",
      parent_id: kepsekId,
      order_priority: 2
    }]);

    const kaAdmin = await queryInterface.sequelize.query(
      `SELECT id from struktur_organisasi where type = 'kepala_administrasi' LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const kaAdminId = kaAdmin[0].id;

    // 4. Under Kepala Administrasi
    await queryInterface.bulkInsert('struktur_organisasi', [
      {
        name: "Ani Maryani, S.E.",
        role: "Kaur Keuangan",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: kaAdminId,
        order_priority: 1
      },
      {
        name: "Dedi Setiadi, S.Sos.",
        role: "Kaur Human Capital, Logistik & Sekretariat",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: kaAdminId,
        order_priority: 2
      }
    ]);

    // 5. Kaur Quality Development (Coordination with Kepsek)
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Rina Wijaya, M.Pd.",
      role: "Kaur Quality Development & Performance Management",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
      type: "kaur",
      parent_id: kepsekId,
      connection_type: "coordination",
      order_priority: 3
    }]);

    // 6. Waka Kurikulum
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Drs. Bambang Sudarsono",
      role: "Waka Bidang Kurikulum",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      type: "wakil_kepala_sekolah",
      parent_id: kepsekId,
      order_priority: 4
    }]);

    const wakaKur = await queryInterface.sequelize.query(
      `SELECT id from struktur_organisasi where role LIKE '%Kurikulum%' LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const wakaKurId = wakaKur[0].id;

    // Under Waka Kurikulum
    await queryInterface.bulkInsert('struktur_organisasi', [
      {
        name: "Eko Prasetyo, S.Pd.",
        role: "Kaur Pengembangan KurSilMat",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: wakaKurId,
        order_priority: 1
      },
      {
        name: "Maya Sofia, S.I.Pust.",
        role: "Admin Pelaksana Pembelajaran Perpustakaan",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        type: "staf",
        parent_id: wakaKurId,
        order_priority: 2
      },
      {
        name: "Budi Pratama, S.T.",
        role: "Ketua Program Studi TJKT",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
        type: "ketua_prodi",
        parent_id: wakaKurId,
        order_priority: 3
      },
      {
        name: "Siska Putri, M.Sn.",
        role: "Ketua Program Studi PPLG Animasi",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        type: "ketua_prodi",
        parent_id: wakaKurId,
        order_priority: 4
      }
    ]);

    // 7. Waka Kesiswaan
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Siti Aminah, S.Pd.",
      role: "Waka Bidang Kesiswaan",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      type: "wakil_kepala_sekolah",
      parent_id: kepsekId,
      order_priority: 5
    }]);

    const wakaKes = await queryInterface.sequelize.query(
      `SELECT id from struktur_organisasi where role LIKE '%Kesiswaan%' LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const wakaKesId = wakaKes[0].id;

    // Under Waka Kesiswaan
    await queryInterface.bulkInsert('struktur_organisasi', [
      {
        name: "Hendra Kurniawan, S.Pd.",
        role: "Admin Pelaksana BK Karakter",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        type: "staf",
        parent_id: wakaKesId,
        order_priority: 1
      },
      {
        name: "Andi Wijaya, S.Pd.",
        role: "Admin Pelaksana Ekstrakurikuler Pembinaan Prestasi",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        type: "staf",
        parent_id: wakaKesId,
        order_priority: 2
      }
    ]);

    // 8. Waka Hubungan Industri
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "Taufik Hidayat, M.T.",
      role: "Waka Bidang Hubungan Industri",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      type: "wakil_kepala_sekolah",
      parent_id: kepsekId,
      order_priority: 6
    }]);

    const wakaHubin = await queryInterface.sequelize.query(
      `SELECT id from struktur_organisasi where role LIKE '%Hubungan Industri%' LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const wakaHubinId = wakaHubin[0].id;

    // Under Waka Hubungan Industri
    await queryInterface.bulkInsert('struktur_organisasi', [
      {
        name: "Lilis Suryani, S.I.Kom.",
        role: "Kaur SPMB Komunikasi",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: wakaHubinId,
        order_priority: 1
      },
      {
        name: "Bambang Heru, S.T.",
        role: "Kaur Sinergi Unit Produksi Alumni",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: wakaHubinId,
        order_priority: 2
      }
    ]);

    // 9. Waka IT, Laboratorium Sarpra
    await queryInterface.bulkInsert('struktur_organisasi', [{
      name: "M. Ridwan, S.T.",
      role: "Waka Bidang IT, Laboratorium Sarpra",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      type: "wakil_kepala_sekolah",
      parent_id: kepsekId,
      order_priority: 7
    }]);

    const wakaIt = await queryInterface.sequelize.query(
      `SELECT id from struktur_organisasi where role LIKE '%IT%' LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const wakaItId = wakaIt[0].id;

    // Under Waka IT
    await queryInterface.bulkInsert('struktur_organisasi', [
      {
        name: "Fajar Ramadhan, S.Kom.",
        role: "Kaur IT",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: wakaItId,
        order_priority: 1
      },
      {
        name: "Agus Santoso, S.T.",
        role: "Kaur Sarana Prasarana",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: wakaItId,
        order_priority: 2
      },
      {
        name: "Dewi Lestari, M.T.",
        role: "Kaur Laboratorium",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        type: "kaur",
        parent_id: wakaItId,
        order_priority: 3
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('struktur_organisasi', null, {});
  }
};
