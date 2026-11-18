# Sistem Konsisten — Full-Stack Application (Laravel 10 API + PostgreSQL + React + Vite)

Implementasi lengkap sistem pelacak kebiasaan & jadwal **"Konsisten"** berdasarkan desain Figma (Node `0:1`, Frames `2:2` hingga `2:26`), kini dilengkapi dengan backend API **Laravel 10**, database **PostgreSQL**, autentikasi **Laravel Sanctum**, dan frontend **React 18 + Tailwind CSS + TanStack React Query**.

---

## 🏗️ Arsitektur Proyek

```
Sistem Konsisten/
├── backend/                        # Backend API (Laravel 10 + PostgreSQL + Sanctum)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/   # Auth, Dashboard, Schedule, Program, Session, Notification, Push
│   │   │   ├── Requests/          # FormRequests validasi input
│   │   │   └── Resources/         # API Resources (JSON transformation)
│   │   ├── Models/                # User, Schedule, Program, SessionLog, ProgramCompletion, PushSubscription
│   │   └── Policies/              # SchedulePolicy, ProgramPolicy, SessionLogPolicy (data dibatasi per user)
│   ├── config/
│   │   ├── cors.php               # Konfigurasi CORS untuk http://localhost:3000
│   │   └── sanctum.php
│   ├── database/
│   │   ├── factories/             # ScheduleFactory, ProgramFactory
│   │   ├── migrations/            # Tabel users, schedules, programs, session_logs, program_completions, push_subscriptions
│   │   └── seeders/               # DatabaseSeeder (Demo user Raka Pratama + data jadwal asli Figma)
│   ├── routes/
│   │   └── api.php                # 22 RESTful API Endpoints
│   └── .env                       # Konfigurasi PostgreSQL (DB: sistem_konsisten)
│
├── src/                            # Frontend (React 18 + Tailwind CSS + React Query)
│   ├── api.js                     # Axios client terpusat dengan Bearer Token interceptor
│   ├── context/AppContext.jsx     # State terpadu dengan React Query (useQuery, useMutation)
│   ├── components/                # UI kit, Icons SVG asli Figma, PhoneFrame, AuthModal
│   │   └── web/                   # WebSidebar, WebNavbar
│   ├── views/                     # Web Dashboard, Web Jadwal, Web Sesi Fokus, Web Notifikasi, Web Detail Modal
│   └── screens/                   # Layar mobile Figma: Dashboard, Jadwal, Tambah, Detail, Sesi, Notifikasi, UI Kit
└── package.json
```

---

## 🗄️ Skema Database & Relasi (PostgreSQL)

1. **`users`**: Akun pengguna (`id`, `name`, `email`, `password`, `created_at`, `updated_at`).
2. **`schedules`**: Jadwal rutinitas (`id`, `user_id`, `name`, `time`, `days` **jsonb**, `status`, `icon`, `color`).
3. **`programs`**: Aktivitas dalam rutinitas (`id`, `schedule_id`, `title`, `duration`, `duration_seconds`, `quote`, `icon`, `sort_order`).
4. **`session_logs`**: Riwayat sesi fokus (`id`, `user_id`, `schedule_id`, `started_at`, `completed_at`, `duration_seconds`, `status`).
5. **`program_completions`**: Pencatatan program yang selesai per hari (`id`, `user_id`, `program_id`, `session_log_id`, `completed_at`).
6. **`push_subscriptions`**: Token langganan Web Push (`id`, `user_id`, `endpoint`, `keys` **jsonb**).

> **Perhitungan Streak & Progres**: Dihitung secara dinamis dari tabel `session_logs` dan `program_completions` (menghitung hari berurutan aktif dan persentase program yang selesai hari ini).

---

## 📡 Daftar Endpoint API (`/api/*`)

### 1. Autentikasi (`Sanctum`)
* `POST /api/register` — Mendaftar akun baru (`name`, `email`, `password`).
* `POST /api/login` — Masuk dan mendapatkan Bearer Token.
* `GET  /api/me` — Mendapatkan profil pengguna yang sedang login.
* `POST /api/logout` — Mencabut token aktif.

### 2. Dashboard
* `GET  /api/dashboard` — Mengembalikan data agregat: progres hari ini (persen & program), streak saat ini, rekor streak, tren konsistensi 7 hari, dan jadwal aktif hari ini.

### 3. Jadwal & Rutinitas (`schedules`)
* `GET    /api/schedules` — Mengambil semua jadwal milik pengguna beserta programnya.
* `POST   /api/schedules` — Membuat jadwal baru (opsional menyertakan array `programs`).
* `GET    /api/schedules/{id}` — Detail jadwal tertentu.
* `PUT    /api/schedules/{id}` — Memperbarui data jadwal.
* `DELETE /api/schedules/{id}` — Menghapus jadwal.
* `PATCH  /api/schedules/{id}/toggle-status` — Mengubah status antara `'Aktif'` dan `'Nonaktif'`.

### 4. Program Aktivitas (`programs`)
* `GET    /api/schedules/{schedule}/programs` — Mengambil program dalam jadwal.
* `POST   /api/schedules/{schedule}/programs` — Menambahkan program baru ke jadwal.
* `PUT    /api/programs/{id}` — Memperbarui program.
* `DELETE /api/programs/{id}` — Menghapus program.
* `POST   /api/schedules/{schedule}/programs/reorder` — Mengatur ulang urutan program (`program_ids: []`).
* `POST   /api/programs/{id}/toggle-completion` — Centang selesai/belum program untuk hari ini.

### 5. Sesi Fokus (`sessions`)
* `POST /api/sessions/start` — Memulai sesi fokus baru (status `'in_progress'`).
* `POST /api/sessions/{session}/complete` — Menyelesaikan sesi fokus (mencatat durasi & memperbarui status `'completed'`).

### 6. Pengingat & Notifikasi
* `GET  /api/notifications/upcoming` — Mengambil daftar pengingat jadwal yang akan datang hari ini.
* `POST /api/push-subscriptions` — Menyimpan endpoint langganan Web Push.
* `DELETE /api/push-subscriptions` — Menghapus langganan Web Push.

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Prasyarat
* **PHP** >= 8.1 (dengan ekstensi `pdo_pgsql` aktif)
* **Composer**
* **PostgreSQL** aktif di port 5432 (default DB: `sistem_konsisten`, user: `postgres`, password: `root`)
* **Node.js** >= 18 & **npm**

---

### 2. Menjalankan Backend Laravel

```bash
# 1. Pindah ke direktori backend
cd backend

# 2. Instal dependensi PHP (jika baru di-clone)
composer install

# 3. Konfigurasi file .env (sudah tersetel untuk PostgreSQL)
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=sistem_konsisten
# DB_USERNAME=postgres
# DB_PASSWORD=root

# 4. Jalankan migrasi dan seeder awal
php artisan migrate:fresh --seed

# 5. Jalankan server backend (port 8000)
php artisan serve --host=127.0.0.1 --port=8000
```

> **Akun Demo Bawaan**:
> - Email: `raka@konsisten.id`
> - Password: `password`

---

### 3. Menjalankan Frontend React

```bash
# 1. Pastikan berada di root direktori proyek (bukan di dalam /backend)
cd ..

# 2. Instal dependensi frontend (React Query, Axios, Tailwind, dsb.)
npm install

# 3. Jalankan server pengembangan Vite (port 3000)
npm run dev
```

Buka peramban di: **[http://localhost:3000](http://localhost:3000)**

---

## 💡 Fitur Frontend & Backend Terpadu

1. **React Query Caching & Revalidasi**:
   - Seluruh mutasi data (centang program, ubah status jadwal, buat jadwal baru, selesaikan sesi) langsung menginvaliasi query cache secara otomatis.
2. **Autentikasi Modal & Demo Instan**:
   - Terdapat tombol **"⚡ Masuk Instan sebagai Raka Pratama (Demo)"** di modal autentikasi untuk pengujian cepat tanpa mengetik manual.
3. **CORS Aman**:
   - File `backend/config/cors.php` telah dikonfigurasi mengizinkan `http://localhost:3000` dengan dukungan `credentials: true`.
4. **Dual Interface**:
   - **Tampilan Website (Desktop)**: Dashboard metrik, pengelola jadwal, ruang sesi fokus Mode Zen, dan pusat notifikasi.
   - **Tampilan Mobile Simulator**: Phone frame realistis dengan fitur **Bandingkan Figma** (overlay screenshot asli Figma) dan galeri 6 layar.
