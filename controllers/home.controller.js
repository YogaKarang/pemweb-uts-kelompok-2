exports.getBeranda = (req, res) => {
  const modulList = [
    { nama: 'Data Member', path: '/member', pemegang: 'Gusin', deskripsi: 'Kelola data anggota gym.' },
    { nama: 'Paket Membership', path: '/paket', pemegang: 'Mathew', deskripsi: 'Kelola paket keanggotaan dan harganya.' },
    { nama: 'Transaksi', path: '/transaksi', pemegang: 'Dika', deskripsi: 'Catat pembelian paket oleh member.' },
    { nama: 'Booking Latihan', path: '/booking', pemegang: 'Dede', deskripsi: 'Kelola jadwal latihan member.' }
  ];

  res.render('pages/home', {
    pageTitle: 'Beranda',
    modulList
  });
};
