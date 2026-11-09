# Website Portofolio — Intan Dwi Anggreini

Website portofolio yang dibangun dengan **React** (JavaScript), **Vite**, dan **Tailwind CSS**. Tampilannya mengikuti gaya template **Ovro** dengan palet abu-abu, biru, dan kuning gold: judul besar dengan kata miring bergaris bawah, kartu profil, galeri proyek, dan logo "INTAN" dengan mawar sebagai huruf "I".

Kode ditulis dari nol (tidak menyalin file template Ovro), jadi Anda tidak memerlukan lisensi template tersebut.

**Responsif** untuk semua ukuran layar dan sudah diuji di:

| Perangkat | Lebar | Tata letak |
|---|---|---|
| Android kecil | 360 px | satu kolom, navigasi ikon di bawah layar |
| Android / iPhone | 390–412 px | satu kolom, navigasi ikon di bawah layar |
| Tablet tegak | 768 px | kartu profil melebar, grid dua kolom |
| Tablet mendatar | 1024 px | grid dua kolom, navigasi di bawah |
| Laptop | 1280–1440 px | navigasi ikon di kiri, kartu profil menempel di samping |
| Desktop | 1920 px ke atas | sama seperti laptop, konten di tengah |

---

## Isi paket

```
portfolio-intan/
├── src/                          ← kode React
│   ├── data/portfolio.js         ← proyek, skill, kredensial, kegiatan
│   ├── data/profile.js           ← nama, bio, pengalaman, pendidikan, kontak, media sosial
│   ├── components/               ← bagian-bagian halaman (Hero, About, Projects, ...)
│   ├── hooks/                    ← logika scroll, menu, dialog
│   ├── index.css                 ← tema Tailwind (warna, huruf, breakpoint)
│   └── assets/sprite.svg         ← ikon + logo INTAN
├── public/                       ← file yang disalin apa adanya
│   ├── assets/img/               ← foto profil, gambar proyek & kegiatan (WebP), favicon
│   ├── assets/fonts/             ← huruf Figtree dan Playfair Display
│   ├── files/CV_IntanDwiAnggreini_ATS.pdf   ← file tombol "Download CV"
│   ├── .htaccess                 ← aturan cache, header keamanan, 404 (shared hosting cPanel)
│   └── static/.htaccess          ← cache 1 tahun untuk JS/CSS berhash
├── .github/workflows/deploy.yml  ← build + deploy otomatis ke GitHub Pages (bagian 2c)
├── index.html                    ← kerangka halaman + tag SEO
├── package.json, vite.config.js  ← pengaturan proyek
├── dist/                         ← hasil build yang siap di-upload (untuk Opsi C)
├── Dockerfile                    ← build React lalu sajikan dengan nginx
├── docker-compose.https.yml      ← Opsi A: domain + HTTPS otomatis (Caddy)
├── docker-compose.yml            ← Opsi B: HTTP saja (tes lewat IP VPS)
├── Caddyfile, .env.example       ← pengaturan HTTPS dan domain
├── nginx/                        ← konfigurasi nginx (cache, gzip, security headers)
├── docker/40-site-url.sh         ← mengisi alamat domain ke tag SEO saat container start
├── deploy/                       ← skrip instal Docker, deploy, dan konfigurasi nginx tanpa Docker
└── cv-source/cv.html             ← sumber CV ATS (edit lalu Print to PDF)
```

---

## 1. Menjalankan di komputer sendiri

Butuh **Node.js 20.19 atau lebih baru** (disarankan Node 22 LTS, unduh di nodejs.org).

```bash
cd portfolio-intan
npm install        # sekali saja
npm run dev        # buka alamat yang muncul, mis. http://localhost:5173
```

Setiap kali file disimpan, halaman langsung diperbarui. Untuk melihat di HP pada Wi-Fi yang sama, buka alamat **Network** yang ditampilkan (mis. `http://192.168.1.10:5173`).

Membuat versi siap-upload:

```bash
npm run build      # hasilnya di folder dist/
npm run preview    # cek hasil build di http://localhost:4173
```

---

## 2. Deploy ke VPS

**Yang dibutuhkan:** VPS Ubuntu 22.04/24.04 atau Debian 12 (RAM 1 GB disarankan karena ada proses build), akses SSH, dan (untuk HTTPS) sebuah domain. Opsi A dan B tidak perlu Node.js di VPS: proses build berjalan di dalam Docker.

### Langkah 0 — Upload file ke VPS

```bash
scp portfolio-intan.zip root@IP_VPS:~/
ssh root@IP_VPS
sudo apt update && sudo apt install -y unzip
unzip portfolio-intan.zip -d ~ && cd ~/portfolio-intan
```

Ganti `root` dan `IP_VPS` sesuai VPS Anda.

### Langkah 1 — Instal Docker (sekali saja)

```bash
sudo bash deploy/install-docker.sh
```

### Opsi A (disarankan) — Domain + HTTPS otomatis

1. Di pengelola DNS domain Anda, buat **A record**: `@` → IP VPS. Tunggu sampai aktif (cek dengan `ping domainanda.com`).
2. Buat file pengaturan:
   ```bash
   cp .env.example .env
   nano .env
   ```
   Isi `DOMAIN=domainanda.com` dan `SITE_URL=https://domainanda.com`, simpan (`Ctrl+O`, `Enter`, `Ctrl+X`).
3. Jalankan (build pertama butuh 1–3 menit):
   ```bash
   docker compose -f docker-compose.https.yml up -d --build
   ```
4. Buka `https://domainanda.com`. Sertifikat HTTPS dibuat dan diperpanjang otomatis oleh Caddy.

### Opsi B — HTTP saja (tanpa domain, tes lewat IP)

```bash
docker compose up -d --build
```

Buka `http://IP_VPS`. Kalau port 80 sudah dipakai, isi `HTTP_PORT=8080` di `.env`, lalu buka `http://IP_VPS:8080`.

### Opsi C — Tanpa Docker (nginx langsung + Certbot)

Memakai folder `dist/` yang sudah jadi, jadi VPS tidak perlu Node.js.

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/intan-portfolio /etc/nginx/snippets
sudo cp -r dist/. /var/www/intan-portfolio/
sudo sh deploy/apply-site-url.sh /var/www/intan-portfolio https://domainanda.com
sudo cp nginx/security-headers.conf /etc/nginx/snippets/
sudo cp deploy/nginx-host.conf /etc/nginx/sites-available/intan-portfolio
sudo sed -i 's/example.com/domainanda.com/g' /etc/nginx/sites-available/intan-portfolio
sudo ln -s /etc/nginx/sites-available/intan-portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d domainanda.com -d www.domainanda.com
```

---

## 2b. Deploy ke shared hosting (cPanel, mis. Biznet Gio NEO Web Hosting)

Website ini hanya file statis, jadi cukup diunggah ke `public_html`. Docker dan Node.js tidak dipakai di hosting.

1. Di komputer Anda: `npm install` lalu `npm run build` (atau pakai folder `dist/` yang sudah ada di paket ini).
2. Ganti alamat domain: di `dist/index.html`, `dist/robots.txt`, dan `dist/sitemap.xml`, ganti `__SITE_URL__` dengan alamat Anda (mis. `https://namadomain.com`, tanpa garis miring di akhir). Di Linux/macOS: `SITE_ROOT=dist SITE_URL=https://namadomain.com sh docker/40-site-url.sh`.
3. Buat zip dari **isi** `dist/` (bukan folder `dist` itu sendiri), pastikan `.htaccess` ikut. Unggah zip ke `public_html` lewat cPanel File Manager, lalu Extract.
4. Aktifkan SSL (cPanel → SSL/TLS Status → Run AutoSSL). Setelah gembok muncul, buka `.htaccess` di `public_html` dan hapus tanda `#` pada 4 baris redirect HTTPS.

`public/.htaccess` berisi aturan yang setara dengan konfigurasi nginx di folder `nginx/` (cache, header keamanan, halaman 404, kompresi). Aturan ini sudah diuji di Apache; LiteSpeed membaca `.htaccess` dengan cara yang sama.

---

## 2c. Deploy gratis ke GitHub Pages dengan domain sendiri

Cara paling hemat: kode di repositori GitHub (publik), GitHub Actions membangun website, GitHub Pages menayangkannya. Berkas `.github/workflows/deploy.yml` sudah menyiapkan semuanya.

1. Buat repositori **publik** di GitHub, lalu push seluruh isi folder ini ke cabang `main`:
   ```bash
   git init -b main
   git add .
   git commit -m "Website portofolio"
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
2. Di repositori: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Push berikutnya otomatis memicu deploy (lihat tab **Actions**).
3. Alamat website ada di baris `SITE_URL` pada `deploy.yml`. Ubah kalau domain Anda berbeda.
4. Arahkan DNS domain ke GitHub: empat record `A` untuk domain utama (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) dan satu `CNAME` untuk `www` ke `USERNAME.github.io`.
5. Di **Settings → Pages → Custom domain**, isi domain Anda, Save, tunggu sertifikat terbit, lalu centang **Enforce HTTPS**.

File `.htaccess`, `Dockerfile`, dan `nginx/` tidak dipakai di GitHub Pages (khusus Apache/VPS). Folder `dist/` tidak perlu di-commit karena dibangun otomatis (sudah ada di `.gitignore`).

---

## 3. Memperbarui website

1. Ubah file di `src/` atau `public/` (lihat bagian 4).
2. Upload ulang ke VPS, lalu jalankan lagi:
   ```bash
   docker compose -f docker-compose.https.yml up -d --build   # Opsi A
   docker compose up -d --build                               # Opsi B
   ```
   Untuk **Opsi C**: jalankan `npm run build` di komputer Anda, salin isi `dist/` ke `/var/www/intan-portfolio/`, lalu jalankan `apply-site-url.sh` lagi.

Pengguna Linux/macOS/WSL bisa memakai satu perintah dari komputer sendiri (perlu `rsync`):

```bash
./deploy/deploy.sh root@IP_VPS https    # atau: http
```

Perintah berguna di VPS: `docker compose ps` (status), `docker compose logs -f` (log), `docker compose down` (berhenti). Untuk Opsi A tambahkan `-f docker-compose.https.yml`.

---

## 4. Mengubah konten

| Yang ingin diubah | File |
|---|---|
| Proyek, skill, kredensial, kegiatan | `src/data/portfolio.js` |
| Nama, intro, bio, fokus keahlian, pengalaman, pendidikan, bahasa, email, WhatsApp, media sosial | `src/data/profile.js` |
| Judul tiap bagian, teks hero | file di `src/components/` (mis. `Hero.jsx`) |
| Foto profil | ganti `public/assets/img/profile.webp` (rasio 4:5, mis. 720×900 px) |
| File CV untuk tombol Download | ganti `public/files/CV_IntanDwiAnggreini_ATS.pdf` (nama file tetap sama) |
| Warna, huruf, breakpoint | blok `@theme` di `src/index.css` (skala `gray-*`, `blue-*`, `gold-*`) |
| Tampilan per bagian | class Tailwind langsung di komponen, mis. `md:grid-cols-2` |

**Menambah proyek:** salin satu blok proyek di `portfolio.js`, ubah teksnya, lalu simpan gambar ke `public/assets/img/projects/` dalam dua versi: `nama.webp` (lebar ±2000 px) dan `nama-thumb.webp` (lebar ±960 px). Isi `images: [{ src: "nama", caption: "..." }]`. Gambar pertama dipakai sebagai sampul kartu. Filter kategori dan jumlah proyek ikut diperbarui otomatis.

**Breakpoint Tailwind yang dipakai:** `xs` 400 px, `sm` 640 px, `md` 768 px (tablet), `lg` 1024 px, `xl` 1280 px (laptop: muncul navigasi kiri dan kartu profil samping), `2xl` 1536 px.

**Mengubah CV:** buka `cv-source/cv.html` di Chrome, edit teksnya, lalu `Ctrl+P` → *Save as PDF* (A4, margin Default, centang *Background graphics*, matikan *Headers and footers*). Simpan sebagai `public/files/CV_IntanDwiAnggreini_ATS.pdf`.

**Formulir kontak:** tidak butuh server. *Send by email* membuka aplikasi email pengunjung dengan pesan terisi; *Send on WhatsApp* membuka WhatsApp ke nomor Anda. Alamat email dan nomor diambil dari `src/data/profile.js`.

---

## 5. Kalau ada masalah

- **Situs tidak bisa dibuka:** pastikan port 80/443 terbuka di firewall VPS dan di panel penyedia VPS (security group). Cek `docker compose ps`.
- **Build gagal di VPS (`npm ci` error / kehabisan memori):** VPS dengan RAM 512 MB bisa kehabisan memori saat build. Tambahkan swap (`sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`) atau pakai Opsi C dengan folder `dist/`.
- **HTTPS gagal (Opsi A):** biasanya DNS belum mengarah ke VPS. Cek `docker compose -f docker-compose.https.yml logs caddy`.
- **`port is already allocated`:** ada layanan lain di port 80 (mis. Apache/nginx bawaan). Hentikan (`sudo systemctl stop apache2 nginx`) atau pakai `HTTP_PORT` lain.
- **Perubahan tidak muncul:** jalankan ulang dengan `--build`, lalu muat ulang browser dengan `Ctrl + Shift + R`.
- **`npm run dev` error di komputer:** cek versi Node dengan `node -v` (minimal 20.19).

---

## Kredit

- Teknologi: React 19, Vite 8, Tailwind CSS 4 (semua lisensi MIT).
- Huruf: Figtree dan Playfair Display (SIL Open Font License), di-host sendiri.
- Ikon: Lucide (lisensi ISC) dan Simple Icons (CC0); ikon LinkedIn, Power BI dan Tableau digambar sederhana.
- Gambar proyek dan foto kegiatan dari dokumen portofolio Intan. Akun demo pada diagram RiskFinder sudah disamarkan; screenshot MIS yang memuat password atau data pribadi siswa/guru tidak dipakai.
