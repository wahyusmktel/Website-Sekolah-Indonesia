'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('prestasi', [
      {
        title: "Juara 1 LKS Nasional Bidang IT Software Solution",
        slug: "juara-1-lks-nasional-it-software",
        category: "Akademik",
        winner: "Zaky Ahmad",
        date: "2023",
        level: "Nasional",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        description: "Prestasi gemilang di tingkat nasional dalam pengembangan solusi perangkat lunak berbasis industri.",
        long_description: "Zaky Ahmad berhasil meraih gelar terbaik pada Lomba Kompetensi Siswa (LKS) Tingkat Nasional tahun 2023. Dalam kompetisi ini, Zaky berhasil merancang sistem ERP berbasis cloud yang efisien dalam waktu kurang dari 15 jam kerja. Kemenangan ini membuktikan kualitas kurikulum IT di SMK Nusantara yang selaras dengan standar industri global.",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Medali Emas Olimpiade Jaringan Telkom",
        slug: "medali-emas-olimpiade-jaringan-telkom",
        category: "Jurusan",
        winner: "Team TJAT SMK Nusantara",
        date: "2023",
        level: "Nasional",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
        description: "Keunggulan dalam konfigurasi dan optimasi jaringan fiber optik skala enterprise.",
        long_description: "Tim Teknik Jaringan Akses Telekomunikasi (TJAT) SMK Nusantara menunjukkan dominasinya dalam Olimpiade Jaringan yang diselenggarakan oleh PT Telkom Indonesia. Mereka berhasil melakukan penyambungan fiber optik (splicing) tercepat dengan loss signal hampir nol persen, serta melakukan instalasi FTTH yang rapi sesuai standar teknis perusahaan.",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Juara 1 English Debate Competition (EDC)",
        slug: "juara-1-english-debate-competition-edc",
        category: "Bahasa",
        winner: "English Club SMK Nusantara",
        date: "2023",
        level: "Provinsi",
        image: "https://images.unsplash.com/photo-1475721027785-f74dea99990b?auto=format&fit=crop&q=80&w=800",
        description: "Kecerdasan artikulasi dan argumentasi kritis dalam bahasa Inggris di tingkat provinsi.",
        long_description: "Tim debat bahasa Inggris SMK Nusantara membuktikan bahwa kompetensi siswa vokasi tidak hanya terbatas pada skill teknis. Dalam EDC tingkat provinsi, mereka berhasil memenangkan mosi mengenai dampak AI terhadap lapangan kerja masa depan dengan argumen yang solid dan riset mendalam.",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Medali Perak National Robotic Olympiad",
        slug: "medali-perak-national-robotic-olympiad",
        category: "Teknologi",
        winner: "Robotic Team",
        date: "2023",
        level: "Nasional",
        image: "https://images.unsplash.com/photo-1531746790731-6c2079ee3a4b?auto=format&fit=crop&q=80&w=800",
        description: "Inovasi robot penyelamat (rescue robot) dengan sistem kendali cerdas dan responsif.",
        long_description: "Tim Robotik SMK Nusantara merancang Prototipe Rescue Robot yang mampu melewati rintangan sulit dan memetakan lokasi bencana secara real-time. Karya ini mendapatkan apresiasi tinggi dari dewan juri National Robotic Olympiad karena efisiensi algoritma navigasinya.",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: "Juara 1 Futsal Championship Pelajar",
        slug: "juara-1-futsal-championship-pelajar",
        category: "Olahraga",
        winner: "Tim Futsal SMK Nusantara",
        date: "2023",
        level: "Kota",
        image: "https://images.unsplash.com/photo-1510051646651-d410098f95c4?auto=format&fit=crop&q=80&w=800",
        description: "Semangat tim dan sportivitas tinggi yang mengantarkan gelar juara pertama.",
        long_description: "Setelah melalui perjuangan panjang di babak penyisihan, tim futsal sekolah berhasil membawa pulang trofi juara pertama. Kemenangan ini diraih berkat kerjasama tim yang solid, strategi pelatih yang jitu, dan dukungan penuh dari seluruh suporter sekolah di stadion.",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('prestasi', null, {});
  }
};
