# Laravel Project
Proyek Laravel ini dibuat untuk membuat portal berita dengan menggunakan API External Winnicode.

## Persyaratan Sistem
Pastikan sistem Anda memiliki:
- PHP >= 8.1
- Composer
- Node.js & NPM
- MySQL/PostgreSQL/SQLite
- Web server (Apache/Nginx) atau gunakan built-in server Laravel

## Instalasi
### 1. Clone Repository

### 2. Instalasi Dependencies
Install/update PHP dependencies:
```bash
composer install          # Gunakan ini pertama kali
```
```bash
composer update           # Jalankan ini jika ingin update ke versi terbaru sesuai composer.json
```

Install/update JavaScript dependencies (Node.js):
```bash
npm install               # Menginstal semua dependencies sesuai package-lock.json
```
```bash
npm update                # (Opsional) Update package yang sudah terinstall ke versi terbaru yang diizinkan
```

### 3. Konfigurasi Environment
```bash
# Copy file environment
cp .env.example .env
```
```bash
# Generate application key
php artisan key:generate
```

### 4. Konfigurasi Database
Edit file `.env` dan sesuaikan konfigurasi database:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=username_database
DB_PASSWORD=password_database
```

### 5. Konfigurasi Email (Untuk Reset Password)
Tambahkan konfigurasi email di file `.env` untuk mengaktifkan fitur reset password:

```env
# Konfigurasi Email
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your-email@gmail.com"
MAIL_FROM_NAME="${APP_NAME}"
```

**Untuk Gmail:**
- Aktifkan 2-Factor Authentication di akun Gmail Anda
- Generate App Password khusus untuk aplikasi Laravel
- Gunakan App Password tersebut sebagai `MAIL_PASSWORD`

### 6. Migrasi Database
```bash
# Jalankan migrasi
php artisan migrate
```
```bash
# (Opsional) Jalankan seeder untuk data dummy
php artisan db:seed
```

### 7. Storage Link
```bash
# Jika menggunakan file upload
php artisan storage:link
```

**Catatan:** Pastikan anda memiliki avatar default yang tersedia di direktori `public/storage/avatars` dengan nama `default-avatar.png`. Jika file tersebut belum ada, tambahkan file avatar default ke lokasi berikut:
```
public/storage/avatars/default-avatar.png
```
File ini akan digunakan sebagai fallback jika pengguna tidak memiliki avatar yang diunggah dan perhatikan namanya.

## Menjalankan Aplikasi
### 1. Development Server
```bash
php artisan serve
```
Aplikasi akan berjalan di `http://localhost:8000`

**Clear Cache (jika diperlukan):**
```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```
