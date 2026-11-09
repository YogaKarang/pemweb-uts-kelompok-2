# UTS Pemrograman Web - Sistem Manajemen Gym (Kelompok 2)

Aplikasi web monolit Server-Side Rendering berbasis **Node.js, Express, EJS, dan MySQL** dengan arsitektur **MVC**, connection pool berbasis Promise (`mysql2/promise`), dan prepared statement (`?`).

## Anggota dan Pembagian Modul

| Anggota | Modul (entitas) | Tabel | Prefix rute | Branch |
|---|---|---|---|---|
| Gusin | Data Member | `member` | `/member` | `feat/member` |
| Mathew | Paket Membership | `paket_membership` | `/paket` | `feat/paket` |
| Dika | Transaksi | `transaksi` | `/transaksi` | `feat/transaksi` |
| Dede | Booking Latihan | `booking_latihan` | `/booking` | `feat/booking` |

Relasi antartabel (ERD):

```
paket_membership (1) ──< transaksi >── (1) member (1) ──< booking_latihan
```

- `transaksi.id_member` mengacu ke `member.id`, dan `transaksi.id_paket` mengacu ke `paket_membership.id`.
- `booking_latihan.id_member` mengacu ke `member.id`.
- Semua foreign key memakai `ON DELETE RESTRICT`: data induk yang masih dipakai tabel lain **tidak bisa dihapus**. Controller harus menangkap galat `ER_ROW_IS_REFERENCED_2` dan menampilkan pesan yang ramah, bukan halaman 500.

## Cara Menjalankan

1. **Clone repositori**

   ```bash
   git clone https://github.com/YogaKarang/pemweb-uts-kelompok-2.git
   cd pemweb-uts-kelompok-2
   npm install
   ```

2. **Siapkan variabel lingkungan.** Salin `.env.example` menjadi `.env`, lalu isi sandi MySQL milik laptop Anda (berkas `.env` tidak ikut di Git).

   ```bash
   cp .env.example .env
   ```

3. **Impor database.** Jalankan seluruh isi `database.sql` di MySQL Client (phpMyAdmin, MySQL Workbench, atau DBeaver). Membuat database `db_gym`, empat tabel, dan data sampel.
   Catatan: mengimpor ulang akan menghapus dan membuat ulang tabel (data lokal kembali ke data sampel).

4. **Jalankan server**

   ```bash
   npm run dev
   ```

   Terminal menampilkan `[DATABASE] Terhubung ke MySQL Pool secara aman.` lalu `[SERVER] Aktif di http://localhost:3000`.

## Struktur Proyek

```
├── app.js                       # Entry point: middleware, helper tampilan, error handler
├── database.sql                 # DDL dan data sampel (db_gym)
├── config/database.js           # Connection pool (mysql2) + interface Promise
├── controllers/                 # Logika alur request dan response
│   ├── home.controller.js
│   └── error.controller.js      # 404 dan error handler terpusat
├── models/                      # Seluruh query SQL (prepared statement)
├── routes/
│   ├── index.js                 # Menggabungkan semua rute modul
│   ├── member.routes.js         # milik Gusin
│   ├── paket.routes.js          # milik Mathew
│   ├── transaksi.routes.js      # milik Dika
│   └── booking.routes.js        # milik Dede
├── views/
│   ├── pages/                   # Halaman EJS
│   └── partials/                # header.ejs, navbar.ejs, footer.ejs
├── public/css/style.css         # Aset statis
└── .env.example                 # Contoh variabel lingkungan
```

## Cara Mengerjakan Modul

Berkas bersama (`app.js`, `routes/index.js`, navbar) **sudah disiapkan** dan semua modul sudah didaftarkan. Anda hanya perlu mengerjakan berkas milik modul Anda sendiri.

Contoh untuk modul `member` (ganti nama sesuai modul Anda):

| Berkas | Isi |
|---|---|
| `models/member.model.js` | Semua query SQL (`getAll`, `getById`, `create`, `update`, `delete`), memakai `?` |
| `controllers/member.controller.js` | Validasi input, memanggil model, `render` atau `redirect` (pola PRG) |
| `routes/member.routes.js` | **Ganti rute sementara (placeholder)** dengan rute CRUD |
| `views/pages/member-list.ejs` | Tabel data, dengan penanganan data kosong |
| `views/pages/member-form.ejs` | Formulir tambah dan edit (pre-filled) |

Rute CRUD yang dianjurkan (ganti `member` sesuai prefix modul):

| Operasi | Method | Rute |
|---|---|---|
| Read (All) | GET | `/member` |
| Form tambah | GET | `/member/tambah` |
| Create | POST | `/member/tambah` lalu `res.redirect('/member')` |
| Form edit (pre-filled) | GET | `/member/edit/:id` |
| Update | POST | `/member/edit/:id` lalu `res.redirect('/member')` |
| Delete | POST | `/member/hapus/:id` lalu `res.redirect('/member')` |

Helper yang tersedia di semua view EJS: `formatRupiah(angka)`, `formatTanggal(teks)`, dan `formatJam(teks)`.

## Aturan Wajib (dari ketentuan UTS)

- Seluruh query dinamis memakai placeholder `?`. **Dilarang** string concatenation atau `${}` pada SQL.
- Setiap rute POST diakhiri `res.redirect()` (pola PRG).
- Validasi input di sisi server, serta tangani data tidak ditemukan (404) dan kegagalan foreign key.
- Komponen berulang memakai `views/partials/` dan `<%- include() %>`.
- `.env` tidak boleh di-commit.

## Aturan Kerja Git

1. Jangan bekerja langsung di `main`. Buat branch sendiri:

   ```bash
   git switch -c feat/member
   ```

2. Commit kecil dan sering dengan format **Conventional Commits**:

   ```bash
   git add .
   git commit -m "feat: tambah model dan query member"
   git push -u origin feat/member
   ```

   Awalan: `feat:` fitur baru, `fix:` perbaikan, `refactor:` perapian kode, `style:` tampilan, `docs:` dokumentasi, `chore:` konfigurasi.

3. Sebelum mulai bekerja dan sebelum push, ambil pembaruan terbaru:

   ```bash
   git switch main
   git pull
   git switch feat/member
   git merge main
   ```

4. Gabungkan ke `main` lewat **Pull Request** dengan pilihan **Create a merge commit** (bukan squash), agar riwayat commit tiap anggota tetap terlihat.
5. Jangan `git push --force`, dan jangan commit `.env` atau `node_modules/`.
6. Pastikan `git config user.email` sama dengan email akun GitHub masing-masing, agar commit tercatat atas nama sendiri.
