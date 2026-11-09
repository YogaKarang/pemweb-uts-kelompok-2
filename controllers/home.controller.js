// controllers/home.controller.js
const pool = require('../config/database');

const HomeController = {
  async index(req, res, next) {
    try {
      let totalMember = 0;
      let totalPaket = 0;
      let totalTransaksi = 0;
      let totalBooking = 0;

      // 1. Hitung Member
      try {
        const [[rMember]] = await pool.query("SELECT COUNT(*) AS count FROM member");
        totalMember = rMember ? rMember.count : 0;
      } catch (e) {}

      // 2. Hitung Paket Latihan (Mencoba tabel 'paket', jika gagal mencoba 'paket_membership')
      try {
        const [[rPaket]] = await pool.query("SELECT COUNT(*) AS count FROM paket");
        totalPaket = rPaket ? rPaket.count : 0;
      } catch (e) {
        try {
          const [[rPaketAlt]] = await pool.query("SELECT COUNT(*) AS count FROM paket_membership");
          totalPaket = rPaketAlt ? rPaketAlt.count : 0;
        } catch (errAlt) {}
      }

      // 3. Hitung Transaksi
      try {
        const [[rTrx]] = await pool.query("SELECT COUNT(*) AS count FROM transaksi");
        totalTransaksi = rTrx ? rTrx.count : 0;
      } catch (e) {}

      // 4. Hitung Booking Latihan
      try {
        const [[rBook]] = await pool.query("SELECT COUNT(*) AS count FROM booking_latihan");
        totalBooking = rBook ? rBook.count : 0;
      } catch (e) {
        try {
          const [[rBookAlt]] = await pool.query("SELECT COUNT(*) AS count FROM booking");
          totalBooking = rBookAlt ? rBookAlt.count : 0;
        } catch (errBook) {}
      }

      // Render data ke view beranda dengan nama properti ganda agar 100% terbaca EJS
      res.render('pages/home', {
        pageTitle: 'Beranda',
        totalMember,
        totalPaket,
        totalTransaksi,
        totalBooking,
        stats: {
          totalMember,
          totalPaket,
          totalTransaksi,
          totalBooking
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = HomeController;