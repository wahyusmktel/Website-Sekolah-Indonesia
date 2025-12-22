'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contact_info', [{
      school_name: "SMK Nusantara",
      address: "Jl. Pendidikan No. 123, Kota Bandung, Jawa Barat 40123",
      phone: "(022) 1234567",
      email: "info@smknusantara.sch.id",
      website: "www.smknusantara.sch.id",
      maps_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311640625!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63982542a7d%3A0xbb585df5d5483244!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
      facebook_url: "https://facebook.com/smknusantara",
      instagram_url: "https://instagram.com/smknusantara",
      youtube_url: "https://youtube.com/smknusantara",
      twitter_url: "https://twitter.com/smknusantara",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contact_info', null, {});
  }
};
