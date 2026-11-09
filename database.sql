-- =====================================================================
-- database.sql - UTS Pemrograman Web (Sistem Manajemen Gym)
-- Berisi DDL (skema tabel) dan DML (data sampel).
-- PERHATIAN: mengimpor ulang berkas ini akan MENGHAPUS dan membuat ulang
-- seluruh tabel (data lokal kembali ke data sampel).
-- =====================================================================
CREATE DATABASE IF NOT EXISTS db_gym CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_gym;

-- Hapus dari tabel anak ke tabel induk (urutan penting karena foreign key)
DROP TABLE IF EXISTS booking_latihan;
DROP TABLE IF EXISTS transaksi;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS paket_membership;

-- ---------------------------------------------------------------------
-- Modul: Paket Membership (Mathew)
-- ---------------------------------------------------------------------
CREATE TABLE paket_membership (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_paket VARCHAR(100) NOT NULL,
  durasi_hari INT NOT NULL,
  harga DECIMAL(10, 2) NOT NULL,
  deskripsi TEXT NULL,
  status ENUM('Aktif', 'Nonaktif') NOT NULL DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Modul: Data Member (Gusin)
-- ---------------------------------------------------------------------
CREATE TABLE member (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  email VARCHAR(100) NULL,
  jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
  tanggal_lahir DATE NOT NULL,
  status ENUM('Aktif', 'Nonaktif') NOT NULL DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Modul: Transaksi (Dika)  -> relasi ke member dan paket_membership
-- ---------------------------------------------------------------------
CREATE TABLE transaksi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_member INT NOT NULL,
  id_paket INT NOT NULL,
  tanggal_transaksi DATE NOT NULL,
  metode_bayar ENUM('Tunai', 'Transfer', 'QRIS') NOT NULL,
  total_bayar DECIMAL(10, 2) NOT NULL,
  status_bayar ENUM('Lunas', 'Belum Lunas') NOT NULL DEFAULT 'Lunas',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_transaksi_member FOREIGN KEY (id_member) REFERENCES member (id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_transaksi_paket FOREIGN KEY (id_paket) REFERENCES paket_membership (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------
-- Modul: Booking Latihan (Dede)  -> relasi ke member
-- ---------------------------------------------------------------------
CREATE TABLE booking_latihan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_member INT NOT NULL,
  jenis_latihan ENUM('Gym Bebas', 'Kelas Yoga', 'Zumba', 'Personal Trainer') NOT NULL,
  tanggal_booking DATE NOT NULL,
  jam_mulai TIME NOT NULL,
  status ENUM('Dipesan', 'Selesai', 'Dibatalkan') NOT NULL DEFAULT 'Dipesan',
  catatan TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_booking_member FOREIGN KEY (id_member) REFERENCES member (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- =====================================================================
-- DML: data sampel
-- =====================================================================
INSERT INTO paket_membership (nama_paket, durasi_hari, harga, deskripsi, status) VALUES
('Harian', 1, 30000.00, 'Akses gym satu hari penuh.', 'Aktif'),
('Bulanan', 30, 250000.00, 'Akses gym 30 hari dan satu kelas gratis.', 'Aktif'),
('Triwulan', 90, 650000.00, 'Akses gym 90 hari, dua kelas gratis per bulan.', 'Aktif'),
('Tahunan', 365, 2300000.00, 'Akses gym satu tahun dan sesi personal trainer perdana.', 'Aktif');

INSERT INTO member (nama, no_hp, email, jenis_kelamin, tanggal_lahir, status) VALUES
('I Made Surya', '081234567801', 'made.surya@example.com', 'Laki-laki', '2001-03-14', 'Aktif'),
('Ni Putu Ayu Lestari', '081234567802', 'putu.ayu@example.com', 'Perempuan', '2002-07-21', 'Aktif'),
('Komang Dwi Putra', '081234567803', NULL, 'Laki-laki', '1999-11-05', 'Aktif'),
('Ni Luh Sari', '081234567804', 'luh.sari@example.com', 'Perempuan', '2000-01-30', 'Nonaktif'),
('Kadek Ananda', '081234567805', 'kadek.ananda@example.com', 'Laki-laki', '2003-09-12', 'Aktif');

INSERT INTO transaksi (id_member, id_paket, tanggal_transaksi, metode_bayar, total_bayar, status_bayar) VALUES
(1, 2, '2026-10-01', 'Transfer', 250000.00, 'Lunas'),
(2, 3, '2026-10-05', 'QRIS', 650000.00, 'Lunas'),
(3, 1, '2026-10-20', 'Tunai', 30000.00, 'Lunas'),
(5, 2, '2026-11-02', 'Transfer', 250000.00, 'Belum Lunas');

INSERT INTO booking_latihan (id_member, jenis_latihan, tanggal_booking, jam_mulai, status, catatan) VALUES
(1, 'Gym Bebas', '2026-11-10', '07:00:00', 'Dipesan', NULL),
(2, 'Kelas Yoga', '2026-11-10', '09:00:00', 'Dipesan', 'Membawa matras sendiri.'),
(3, 'Zumba', '2026-11-08', '17:30:00', 'Selesai', NULL),
(5, 'Personal Trainer', '2026-11-11', '16:00:00', 'Dipesan', 'Fokus latihan beban tubuh bagian atas.'),
(2, 'Gym Bebas', '2026-11-05', '06:30:00', 'Dibatalkan', 'Berhalangan hadir.');
