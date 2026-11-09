const express = require('express');
const path = require('path');
require('dotenv').config();

const db = require('./config/database');
const routes = require('./routes');
const errorController = require('./controllers/error.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine dengan path absolut (__dirname)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper tampilan: tersedia di SEMUA view EJS
app.locals.formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n));
app.locals.formatTanggal = (s) =>
  s ? new Date(`${String(s).slice(0, 10)}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
app.locals.formatJam = (s) => (s ? String(s).slice(0, 5) : '-');

// Path aktif (dipakai navbar untuk menandai menu)
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Rute aplikasi
app.use('/', routes);

// Penanganan error terpusat (harus paling akhir)
app.use(errorController.notFound);
app.use(errorController.serverError);

// Verifikasi koneksi basis data saat startup
db.query('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('[DATABASE] Terhubung ke MySQL Pool secara aman.');
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`[SERVER] Aktif di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[DATABASE ERROR] Gagal terhubung ke MySQL:', err.message);
  });
