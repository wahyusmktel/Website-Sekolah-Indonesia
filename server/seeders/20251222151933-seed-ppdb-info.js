'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PPDBInfos', [
      {
        academic_year: '2026/2027',
        registration_link: 'https://wa.me/628123456789',
        contact_person: '628123456789',
        description: 'Pendaftaran Peserta Didik Baru (PPDB) SMK Nusantara Tahun Pelajaran 2026/2027. Wujudkan mimpimu bersama sekolah teknologi unggulan.',
        admission_pathways: JSON.stringify([
          {
            title: "Jalur Prestasi",
            description: "Bagi siswa dengan prestasi akademik (Rapor) atau non-akademik (Lomba/Seni/Olahraga).",
            icon: "Trophy",
            benefit: "Bebas Biaya Pendaftaran",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            title: "Jalur Reguler",
            description: "Penerimaan umum melalui seleksi tes minat bakat dan wawancara kompetensi.",
            icon: "Zap",
            benefit: "Kuota Terbatas",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            title: "Jalur Afirmasi",
            description: "Khusus bagi calon siswa dari keluarga prasejahtera (KIP/PKH) yang bersemangat belajar.",
            icon: "ShieldCheck",
            benefit: "Subsidi Biaya Pendidikan",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
        ]),
        timeline: JSON.stringify([
          { date: "Januari - Maret 2026", step: "01", title: "Pendaftaran Gelombang 1", description: "Pembukaan pendaftaran jalur prestasi dan reguler dengan potongan biaya khusus (Early Bird)." },
          { date: "Mei 2026", step: "02", title: "Tes Seleksi & Wawancara", description: "Pelaksanaan tes akademik, minat bakat, dan wawancara calon siswa beserta orang tua." },
          { date: "Juni 2026", step: "03", title: "Pengumuman Hasil", description: "Pengumuman hasil seleksi secara online melalui website dan papan pengumuman sekolah." },
          { date: "Juli 2026", step: "04", title: "Daftar Ulang & MPLS", description: "Proses administrasi daftar ulang bagi siswa yang diterima dilanjutkan Masa Pengenalan Lingkungan Sekolah." }
        ]),
        required_documents: JSON.stringify([
          { title: "Fotokopi Ijazah / SKL", status: "Wajib" },
          { title: "Fotokopi Akta Kelahiran", status: "Wajib" },
          { title: "Fotokopi Kartu Keluarga", status: "Wajib" },
          { title: "Pas Foto 3x4 (4 Lembar)", status: "Wajib" },
          { title: "Sertifikat Prestasi", status: "Opsional" },
          { title: "Kartu KIP/PKH", status: "Jalur Afirmasi" },
        ]),
        fees: JSON.stringify([
          { item: "Uang Pangkal (Gedung)", biaya: 3500000 },
          { item: "Seragam (3 Setel + Olahraga)", biaya: 850000 },
          { item: "Buku & Modul Digital (1 Thn)", biaya: 600000 },
          { item: "SPP Bulan Juli", biaya: 350000 },
          { item: "Kegiatan MPLS & Asuransi", biaya: 250000 },
        ]),
        faq: JSON.stringify([
          { q: "Kapan penutupan pendaftaran Gelombang 1?", a: "Pendaftaran Gelombang 1 (Early Bird) akan ditutup pada akhir Maret 2026 atau ketika kuota khusus prestasi telah terpenuhi." },
          { q: "Apakah ada tes fisik untuk masuk SMK Nusantara?", a: "Untuk jurusan tertentu sepert Teknik Komputer, kami melakukan tes penglihatan (warna) untuk memastikan kompetensi teknis di lab." },
          { q: "Mungkinkah mendaftar jika Ijazah belum keluar?", a: "Tentu. Anda dapat mendaftar menggunakan Rapor Semester 1-5 atau Surat Keterangan Lulus (SKL) sementara." },
          { q: "Apa keuntungan Jalur Prestasi?", a: "Selain pembebasan biaya pendaftaran, jalur prestasi berhak mengikuti program beasiswa penuh untuk SPP tahun pertama." }
        ]),
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PPDBInfos', null, {});
  }
};
