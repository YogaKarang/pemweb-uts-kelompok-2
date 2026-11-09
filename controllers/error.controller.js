// Penanganan error terpusat untuk seluruh aplikasi

// 404: dipasang SETELAH semua rute
exports.notFound = (req, res) => {
  res.status(404).render('pages/404', { pageTitle: '404 - Tidak Ditemukan' });
};

// 500: error handler Express (wajib 4 parameter). Menangkap error yang
// dilempar controller (next(err)) maupun promise yang ditolak (Express 5).
exports.serverError = (err, req, res, next) => {
  console.error(`[ERROR ${req.method} ${req.originalUrl}]:`, err);
  if (res.headersSent) return next(err);
  res.status(500).render('pages/error', {
    pageTitle: 'Terjadi Kesalahan',
    pesan: 'Terjadi galat internal pada peladen. Silakan coba lagi.'
  });
};
