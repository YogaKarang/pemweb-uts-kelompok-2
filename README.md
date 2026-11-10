# UTS Pemrograman Web - Sistem Manajemen Gym (GYM FORGE)

Aplikasi web monolit Server-Side Rendering (SSR) berbasis **Node.js, Express, EJS, dan MySQL** dengan arsitektur **MVC**, connection pool berbasis Promise (`mysql2/promise`), prepared statement (`?`), serta antarmuka modern berkonsep **Dark Glassmorphism** yang memenuhi standar aksesibilitas WCAG.

## Anggota dan Pembagian Modul

| Anggota | Modul (Entitas) | Tabel | Prefix Rute | Branch Fitur |
| ----- | ----- | ----- | ----- | ----- |
| **Gusin_42530034** | Data Member | `member` | `/member` | `feat/member` |
| **Mathew_42530042** | Paket Membership | `paket_membership` | `/paket` | `feat/paket` |
| **Dika_42530015** | Transaksi | `transaksi` | `/transaksi` | `feat/transaksi` |
| **Yoga_42530013** | Booking Latihan | `booking_latihan` | `/booking` | `feat/booking` |

### Relasi Antartabel (ERD):

```
paket_membership (1) ──< transaksi >── (1) member (1) ──< booking_latihan
```

* `transaksi.id_member` mengacu ke `member.id`, dan `transaksi.id_paket` mengacu ke `paket_membership.id`.
* `booking_latihan.id_member` mengacu ke `member.id`.
* **Constraint Safety**: Semua *Foreign Key* memakai `ON DELETE RESTRICT`. Controller menangkap galat database `ER_ROW_IS_REFERENCED_2` dan menampilkan pesan yang ramah kepada pengguna tanpa memicu error 500.

## Fitur Utama & Keunggulan

* **Dark Glassmorphism UI/UX**: Tampilan modern menggunakan efek *blur backdrop-filter*, *sticky navbar*, serta skema warna kontras tinggi yang aman diakses (*WCAG Compliant*).
* **Penanganan Validasi Sisi Server**: Pengecekan *type constraint* dan *range validation* dilakukan secara ketat sebelum query dipanggil (mencegah data cacat masuk ke database).
* **Pola PRG (Post-Redirect-Get)**: Seluruh pemrosesan form POST diakhiri dengan `res.redirect()` untuk mencegah duplikasi submission saat halaman di-refresh.
* **Arsitektur Modular EJS**: Menggunakan `views/partials/` (`header.ejs`, `navbar.ejs`, `footer.ejs`) untuk menghindari duplikasi kode HTML (Prinsip *DRY*).

## Cara Menjalankan Aplikasi

1. **Clone Repositori**
   ```bash
   git clone https://github.com/YogaKarang/pemweb-uts-kelompok-2.git
   cd pemweb-uts-kelompok-2
   npm install
   ```

2. **Siapkan Variabel Lingkungan (.env)**
   Salin `.env.example` menjadi `.env`, lalu sesuaikan konfigurasi kredensial MySQL milik Anda:
   ```bash
   cp .env.example .env
   ```
   *(Catatan: Berkas `.env` telah diabaikan oleh Git via `.gitignore` demi keamanan).*

3. **Impor Skema Database**
   Jalankan seluruh isi file `database.sql` pada MySQL Client Anda (phpMyAdmin, DBeaver, atau MySQL Workbench). Skrip ini akan membuat database `db_gym`, 4 tabel entitas, relasi *Foreign Key*, beserta data sampel pendukung.

4. **Jalankan Server Development**
   ```bash
   npm run dev
   ```
   Server akan aktif di `http://localhost:3000` dengan indikator koneksi MySQL Pool aman di terminal.

## Struktur Proyek

```
├── app.js                         # Entry point: Middleware, Helper, dan Global Error Handler
├── database.sql                   # DDL & Data sampel awal (db_gym)
├── .env.example                   # Template variabel lingkungan
├── config/
│   └── database.js                # Konfigurasi mysql2/promise Connection Pool
├── controllers/                   # Logika kontroler request/response
│   ├── home.controller.js         # Dashboard statistik & statistik fallback
│   ├── member.controller.js
│   ├── paket.controller.js
│   ├── transaksi.controller.js
│   ├── booking.controller.js
│   └── error.controller.js        # Error handler terpusat (404 & 500)
├── models/                        # Layer Query SQL (Prepared Statement)
│   ├── member.model.js
│   ├── paket.model.js
│   ├── transaksi.model.js
│   └── booking.model.js
├── routes/                        # Pendaftaran rute aplikasi
│   ├── index.js                    # Hub rute utama
│   ├── member.routes.js
│   ├── paket.routes.js
│   ├── transaksi.routes.js
│   └── booking.routes.js
├── views/                         # Template Engine (EJS)
│   ├── pages/                     # Tampilan halaman per modul (List & Form)
│   └── partials/                  # Dynamic Header, Sticky Navbar, & Footer
└── public/
    ├── css/style.css              # Custom Glassmorphism Stylesheet
    └── images/                    # Aset gambar & logo aplikasi
```

## Rute CRUD & Standardisasi Modul

Setiap modul entitas mengimplementasikan struktur rute RESTful standar sebagai berikut:

| Operasi | HTTP Method | Endpoint Rute | Aksi Controller |
| ----- | ----- | ----- | ----- |
| **Read (All)** | GET | `/[modul]` | Menampilkan tabel data & fitur *search* |
| **Form Tambah** | GET | `/[modul]/tambah` | Menampilkan form input data baru |
| **Create** | POST | `/[modul]/tambah` | Menyimpan data $\rightarrow$ `res.redirect('/[modul]')` |
| **Form Edit** | GET | `/[modul]/edit/:id` | Menampilkan form dengan data *pre-filled* |
| **Update** | POST | `/[modul]/edit/:id` | Memperbarui data $\rightarrow$ `res.redirect('/[modul]')` |
| **Delete** | POST | `/[modul]/hapus/:id` | Menghapus data $\rightarrow$ `res.redirect('/[modul]')` |

### Helper Global yang Tersedia di View:
* `formatRupiah(angka)`: Mengubah angka numerik ke format mata uang Rupiah (`Rp 150.000`).
* `formatTanggal(teks)`: Format tanggal standar Indonesia (`DD MMMM YYYY`).
* `formatJam(teks)`: Format waktu/jam (`HH:mm WITA`).

## Aturan Kerja Git & Kolaborasi Tim

1. **Gunakan Feature Branch**: Dilarang melakukan commit langsung pada branch `main`. Buat branch fitur masing-masing:
   ```bash
   git switch -c feat/nama-modul
   ```

2. **Format Commit**: Gunakan konvensi **Conventional Commits**:
   * `feat:` Penambahan fitur baru.
   * `fix:` Perbaikan bug / error.
   * `refactor:` Perapian kode tanpa mengubah fungsionalitas.
   * `style:` Perbaikan antarmuka / CSS.
   * `docs:` Pembaruan dokumentasi.

3. **Sinkronisasi Berkala**:
   ```bash
   git switch main
   git pull origin main
   git switch feat/nama-modul
   git merge main
   ```

4. **Penggabungan Kode (Pull Request)**:
   * Penggabungan kode wajib melalui **Pull Request (PR)** di GitHub.
   * Pilih opsi **Create a merge commit** (atau *Rebase and merge*). **DILARANG** menggunakan *Squash and merge* agar riwayat commit seluruh kontributor tetap terjaga di grafik *Contributors*.
   * Jika terjadi *Merge Conflict* yang kompleks, selesaikan secara lokal di VS Code dengan menjalankan `git pull origin main` di branch fitur, atur *Accept Both Changes*, lalu push kembali.
