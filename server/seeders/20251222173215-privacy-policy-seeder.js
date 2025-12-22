'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('privacy_policy', [{
      title: 'Kebijakan Privasi',
      content: `
        <h2>1. Pendahuluan</h2>
        <p>Selamat datang di Website Resmi SMK Indonesia. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.</p>
        
        <h2>2. Informasi yang Kami Kumpulkan</h2>
        <p>Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat menggunakan website kami, termasuk namun tidak terbatas pada:</p>
        <ul>
          <li>Nama lengkap</li>
          <li>Alamat email</li>
          <li>Nomor telepon</li>
          <li>Alamat rumah</li>
          <li>Informasi akademik (untuk keperluan PPDB)</li>
        </ul>

        <h2>3. Penggunaan Informasi</h2>
        <p>Informasi yang kami kumpulkan digunakan untuk:</p>
        <ul>
          <li>Memproses pendaftaran siswa baru (PPDB).</li>
          <li>Memberikan informasi terkini mengenai kegiatan sekolah.</li>
          <li>Menyediakan layanan administrasi akademik.</li>
          <li>Meningkatkan pengalaman pengguna di website kami.</li>
        </ul>

        <h2>4. Perlindungan Data</h2>
        <p>Kami mengimplementasikan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Data Anda disimpan dalam jaringan yang aman dan hanya dapat diakses oleh sejumlah orang terbatas yang memiliki hak akses khusus.</p>

        <h2>5. Cookies</h2>
        <p>Website kami dapat menggunakan cookies untuk meningkatkan pengalaman navigasi Anda. Anda dapat memilih untuk menonaktifkan cookies melalui pengaturan browser Anda.</p>

        <h2>6. Kontak Kami</h2>
        <p>Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui halaman kontak yang tersedia.</p>
      `,
      last_updated: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('privacy_policy', null, {});
  }
};
