---
description: Panduan deployment ke Google Cloud Platform
---

# 🚀 Panduan Deployment Website Sekolah ke Google Cloud Platform

Dokumentasi lengkap untuk men-deploy aplikasi Website Sekolah Indonesia ke Google Cloud Platform (GCP).

## 📋 Prasyarat

Sebelum memulai deployment, pastikan Anda memiliki:

1. **Akun Google Cloud Platform** dengan billing aktif
2. **Google Cloud SDK (gcloud CLI)** terinstal di komputer lokal
3. **Akses SSH** ke VM instance yang akan dibuat
4. **Domain** (opsional, untuk custom domain)

---

## 🏗️ Arsitektur Deployment

```
┌─────────────────────────────────────────────────┐
│          Google Cloud Platform                  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │   Compute Engine VM Instance             │  │
│  │                                          │  │
│  │   ┌──────────────┐  ┌─────────────────┐ │  │
│  │   │   Frontend   │  │    Backend      │ │  │
│  │   │   (Nginx)    │  │   (Node.js)     │ │  │
│  │   │   Port 80    │  │   Port 5000     │ │  │
│  │   └──────────────┘  └─────────────────┘ │  │
│  │                                          │  │
│  │   ┌─────────────────────────────────────┐ │  │
│  │   │   MySQL Database                    │ │  │
│  │   │   Port 3306                         │ │  │
│  │   └─────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │   Cloud Storage (untuk uploads)          │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 📝 BAGIAN 1: Persiapan Google Cloud Platform

### 1.1 Setup Project GCP

```bash
# Login ke Google Cloud
gcloud auth login

# Buat project baru (atau gunakan yang sudah ada)
gcloud projects create website-sekolah-indonesia --name="Website Sekolah Indonesia"

# Set project sebagai default
gcloud config set project website-sekolah-indonesia

# Enable API yang diperlukan
gcloud services enable compute.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable storage-api.googleapis.com
```

### 1.2 Buat VM Instance

```bash
# Buat VM instance dengan spesifikasi yang sesuai
gcloud compute instances create sekolah-web-server \
    --zone=asia-southeast2-a \
    --machine-type=e2-medium \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=30GB \
    --boot-disk-type=pd-standard \
    --tags=http-server,https-server

# Buat firewall rule untuk HTTP/HTTPS
gcloud compute firewall-rules create allow-http \
    --allow tcp:80 \
    --target-tags http-server

gcloud compute firewall-rules create allow-https \
    --allow tcp:443 \
    --target-tags https-server

# Buat firewall rule untuk backend (opsional, jika ingin akses langsung)
gcloud compute firewall-rules create allow-backend \
    --allow tcp:5000 \
    --target-tags http-server
```

### 1.3 Dapatkan IP Address

```bash
# Dapatkan external IP address
gcloud compute instances describe sekolah-web-server \
    --zone=asia-southeast2-a \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)'

# Atau reserve static IP (recommended untuk production)
gcloud compute addresses create sekolah-web-ip --region=asia-southeast2
gcloud compute instances add-access-config sekolah-web-server \
    --zone=asia-southeast2-a \
    --access-config-name="External NAT" \
    --address=$(gcloud compute addresses describe sekolah-web-ip --region=asia-southeast2 --format='get(address)')
```

---

## 🔧 BAGIAN 2: Setup Server (SSH ke VM)

### 2.1 Connect ke VM Instance

```bash
# SSH ke VM instance
gcloud compute ssh sekolah-web-server --zone=asia-southeast2-a
```

### 2.2 Update System & Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install build tools
sudo apt install -y build-essential git

# Install PM2 untuk process management
sudo npm install -g pm2

# Install Nginx sebagai reverse proxy
sudo apt install -y nginx
```

### 2.3 Install & Setup MySQL

```bash
# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation
# Ikuti prompt:
# - Set root password: [PASSWORD_ANDA]
# - Remove anonymous users: Y
# - Disallow root login remotely: Y
# - Remove test database: Y
# - Reload privilege tables: Y

# Login ke MySQL
sudo mysql -u root -p

# Buat database dan user untuk aplikasi
CREATE DATABASE `website-sekolah-indonesia` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Buat user khusus untuk aplikasi (lebih aman daripada menggunakan root)
CREATE USER 'sekolah_user'@'localhost' IDENTIFIED BY 'PASSWORD_KUAT_ANDA';

# Berikan privileges
GRANT ALL PRIVILEGES ON `website-sekolah-indonesia`.* TO 'sekolah_user'@'localhost';
FLUSH PRIVILEGES;

# Keluar dari MySQL
EXIT;

# Test koneksi dengan user baru
mysql -u sekolah_user -p website-sekolah-indonesia
EXIT;
```

---

## 📦 BAGIAN 3: Deploy Aplikasi

### 3.1 Clone Repository

```bash
# Buat directory untuk aplikasi
sudo mkdir -p /var/www
cd /var/www

# Clone repository (ganti dengan URL repo Anda)
sudo git clone https://github.com/wahyusmktel/Website-Sekolah-Indonesia.git
sudo chown -R $USER:$USER /var/www/Website-Sekolah-Indonesia
cd Website-Sekolah-Indonesia
```

### 3.2 Setup Environment Variables - Backend

```bash
# Masuk ke directory server
cd /var/www/Website-Sekolah-Indonesia/server

# Buat file .env untuk production
cat > .env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_USER=sekolah_user
DB_PASS=PASSWORD_KUAT_ANDA
DB_NAME=website-sekolah-indonesia

# JWT Secret (GANTI dengan random string yang kuat!)
JWT_SECRET=GANTI_DENGAN_SECRET_KEY_YANG_SANGAT_KUAT_DAN_RANDOM

# Client URL (ganti dengan domain/IP Anda)
CLIENT_URL=http://YOUR_IP_OR_DOMAIN
EOF

# Set permission yang aman untuk .env
chmod 600 .env

# Install dependencies
npm install --production
```

**⚠️ PENTING - Generate JWT Secret yang Kuat:**

```bash
# Generate random JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Copy output dan ganti JWT_SECRET di file .env
nano .env
```

### 3.3 Setup Database - Migrasi & Seeder

```bash
# Masih di directory /var/www/Website-Sekolah-Indonesia/server

# Install sequelize-cli secara global (jika belum)
sudo npm install -g sequelize-cli

# Jalankan migrasi database
npx sequelize-cli db:migrate

# Jalankan seeder untuk data awal
npx sequelize-cli db:seed:all

# Atau jalankan seeder satu per satu jika diperlukan:
# npx sequelize-cli db:seed --seed 20251221000000-seed-agenda.js
# npx sequelize-cli db:seed --seed 20251221000001-seed-program-keahlian.js
# ... dst
```

**Troubleshooting Migrasi:**

Jika ada error saat migrasi, periksa:

```bash
# Cek koneksi database
mysql -u sekolah_user -p website-sekolah-indonesia -e "SHOW TABLES;"

# Jika perlu reset database (HATI-HATI: akan menghapus semua data!)
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 3.4 Setup Frontend

```bash
# Kembali ke root project
cd /var/www/Website-Sekolah-Indonesia

# Buat file .env untuk frontend
cat > .env << 'EOF'
# API URL - ganti dengan IP/domain server Anda
VITE_API_URL=http://YOUR_IP_OR_DOMAIN:5000
EOF

# Install dependencies
npm install

# Build frontend untuk production
npm run build

# Hasil build akan ada di folder 'dist'
ls -la dist/
```

### 3.5 Setup Upload Directory

```bash
# Buat directory untuk uploads
mkdir -p /var/www/Website-Sekolah-Indonesia/server/uploads

# Set permission yang tepat
sudo chown -R www-data:www-data /var/www/Website-Sekolah-Indonesia/server/uploads
sudo chmod -R 755 /var/www/Website-Sekolah-Indonesia/server/uploads
```

---

## 🔄 BAGIAN 4: Setup PM2 untuk Backend

### 4.1 Konfigurasi PM2

```bash
# Masuk ke directory server
cd /var/www/Website-Sekolah-Indonesia/server

# Start aplikasi dengan PM2
pm2 start src/index.ts --name "sekolah-backend" --interpreter ts-node

# Atau jika menggunakan compiled JavaScript:
# npm run build (jika ada build script)
# pm2 start dist/index.js --name "sekolah-backend"

# Save PM2 process list
pm2 save

# Setup PM2 startup script (agar otomatis start saat server reboot)
pm2 startup systemd
# Copy dan jalankan command yang muncul (biasanya dimulai dengan 'sudo env PATH=...')

# Verify PM2 status
pm2 status
pm2 logs sekolah-backend --lines 50
```

### 4.2 PM2 Management Commands

```bash
# Restart aplikasi
pm2 restart sekolah-backend

# Stop aplikasi
pm2 stop sekolah-backend

# Delete dari PM2
pm2 delete sekolah-backend

# Monitor aplikasi
pm2 monit

# View logs
pm2 logs sekolah-backend
pm2 logs sekolah-backend --lines 100
pm2 logs sekolah-backend --err  # Error logs only
```

---

## 🌐 BAGIAN 5: Setup Nginx sebagai Reverse Proxy

### 5.1 Konfigurasi Nginx

```bash
# Buat konfigurasi Nginx untuk website
sudo nano /etc/nginx/sites-available/sekolah-website
```

**Paste konfigurasi berikut:**

```nginx
# Upstream untuk backend API
upstream backend_api {
    server localhost:5000;
    keepalive 64;
}

# HTTP Server
server {
    listen 80;
    listen [::]:80;
    
    # Ganti dengan domain Anda, atau gunakan IP
    server_name YOUR_DOMAIN_OR_IP;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Root directory untuk frontend
    root /var/www/Website-Sekolah-Indonesia/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    
    # Client max body size (untuk upload file)
    client_max_body_size 20M;
    
    # API Proxy
    location /api/ {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        
        # Proxy headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Cache bypass
        proxy_cache_bypass $http_upgrade;
    }
    
    # Uploads directory
    location /uploads/ {
        alias /var/www/Website-Sekolah-Indonesia/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Frontend routing (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /index.html;
}
```

### 5.2 Enable Site & Restart Nginx

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/sekolah-website /etc/nginx/sites-enabled/

# Remove default site (opsional)
sudo rm /etc/nginx/sites-enabled/default

# Test konfigurasi Nginx
sudo nginx -t

# Jika test OK, restart Nginx
sudo systemctl restart nginx

# Enable Nginx auto-start
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

---

## 🔒 BAGIAN 6: Setup CORS untuk Production

### 6.1 Update CORS Configuration di Backend

```bash
# Edit file index.ts
nano /var/www/Website-Sekolah-Indonesia/server/src/index.ts
```

**Update bagian CORS (sekitar baris 26-45):**

```typescript
// 2. CORS configuration
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://YOUR_DOMAIN_OR_IP',
    'https://YOUR_DOMAIN_OR_IP',
    'http://localhost:5173',  // Keep untuk development
    'http://127.0.0.1:5173'
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            console.log('CORS blocked origin:', origin);
            return callback(new Error('CORS Policy Error'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
```

**Restart backend setelah perubahan:**

```bash
pm2 restart sekolah-backend
pm2 logs sekolah-backend --lines 20
```

---

## 🔐 BAGIAN 7: Setup SSL/HTTPS dengan Let's Encrypt (Opsional tapi Recommended)

### 7.1 Install Certbot

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Dapatkan SSL Certificate

```bash
# Pastikan domain sudah pointing ke IP server Anda
# Kemudian jalankan:
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Ikuti prompt:
# - Email address: [email Anda]
# - Agree to terms: Y
# - Share email: N (opsional)
# - Redirect HTTP to HTTPS: 2 (recommended)

# Certbot akan otomatis update konfigurasi Nginx
```

### 7.3 Auto-renewal SSL

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot sudah setup cron job otomatis untuk renewal
# Cek dengan:
sudo systemctl status certbot.timer
```

---

## 🧪 BAGIAN 8: Testing & Verification

### 8.1 Test Backend API

```bash
# Test dari server
curl http://localhost:5000/

# Test dari luar (ganti YOUR_IP)
curl http://YOUR_IP:5000/

# Test API endpoint
curl http://YOUR_IP/api/berita
curl http://YOUR_IP/api/programs
```

### 8.2 Test Frontend

```bash
# Buka di browser
http://YOUR_IP
# atau
https://YOUR_DOMAIN (jika sudah setup SSL)
```

### 8.3 Test Upload Functionality

1. Login ke admin panel
2. Coba upload gambar
3. Verify file tersimpan di `/var/www/Website-Sekolah-Indonesia/server/uploads/`
4. Verify gambar bisa diakses via browser: `http://YOUR_IP/uploads/filename.jpg`

### 8.4 Check Logs

```bash
# Backend logs
pm2 logs sekolah-backend

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# MySQL logs (jika ada masalah database)
sudo tail -f /var/log/mysql/error.log
```

---

## 🔄 BAGIAN 9: Update & Maintenance

### 9.1 Update Aplikasi (Deploy Update Baru)

```bash
# SSH ke server
gcloud compute ssh sekolah-web-server --zone=asia-southeast2-a

# Masuk ke directory project
cd /var/www/Website-Sekolah-Indonesia

# Pull update dari Git
git pull origin main

# Update Backend
cd server
npm install --production
pm2 restart sekolah-backend

# Update Frontend
cd ..
npm install
npm run build

# Restart Nginx (jika perlu)
sudo systemctl restart nginx

# Verify
pm2 status
pm2 logs sekolah-backend --lines 20
```

### 9.2 Backup Database

```bash
# Buat directory untuk backup
mkdir -p ~/backups

# Backup database
mysqldump -u sekolah_user -p website-sekolah-indonesia > ~/backups/db-backup-$(date +%Y%m%d-%H%M%S).sql

# Backup dengan kompresi
mysqldump -u sekolah_user -p website-sekolah-indonesia | gzip > ~/backups/db-backup-$(date +%Y%m%d-%H%M%S).sql.gz

# Setup automated backup (crontab)
crontab -e

# Tambahkan line berikut untuk backup harian jam 2 pagi:
0 2 * * * mysqldump -u sekolah_user -pPASSWORD_ANDA website-sekolah-indonesia | gzip > ~/backups/db-backup-$(date +\%Y\%m\%d).sql.gz

# Backup uploads directory
tar -czf ~/backups/uploads-backup-$(date +%Y%m%d).tar.gz /var/www/Website-Sekolah-Indonesia/server/uploads/
```

### 9.3 Restore Database

```bash
# Restore dari backup
mysql -u sekolah_user -p website-sekolah-indonesia < ~/backups/db-backup-YYYYMMDD-HHMMSS.sql

# Restore dari backup terkompresi
gunzip < ~/backups/db-backup-YYYYMMDD-HHMMSS.sql.gz | mysql -u sekolah_user -p website-sekolah-indonesia
```

### 9.4 Monitor Resources

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check PM2 processes
pm2 monit

# Check Nginx status
sudo systemctl status nginx

# Check MySQL status
sudo systemctl status mysql
```

---

## 🐛 BAGIAN 10: Troubleshooting

### 10.1 Backend Tidak Bisa Diakses

```bash
# Check PM2 status
pm2 status
pm2 logs sekolah-backend --err

# Check port 5000
sudo netstat -tulpn | grep 5000

# Restart backend
pm2 restart sekolah-backend

# Check environment variables
cd /var/www/Website-Sekolah-Indonesia/server
cat .env
```

### 10.2 Frontend Tidak Muncul

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check file permissions
ls -la /var/www/Website-Sekolah-Indonesia/dist/

# Rebuild frontend
cd /var/www/Website-Sekolah-Indonesia
npm run build
sudo systemctl restart nginx
```

### 10.3 Database Connection Error

```bash
# Check MySQL status
sudo systemctl status mysql

# Test database connection
mysql -u sekolah_user -p website-sekolah-indonesia

# Check database exists
mysql -u sekolah_user -p -e "SHOW DATABASES;"

# Check user privileges
mysql -u root -p -e "SHOW GRANTS FOR 'sekolah_user'@'localhost';"

# Restart MySQL
sudo systemctl restart mysql
```

### 10.4 Upload File Gagal

```bash
# Check upload directory permissions
ls -la /var/www/Website-Sekolah-Indonesia/server/uploads/

# Fix permissions
sudo chown -R www-data:www-data /var/www/Website-Sekolah-Indonesia/server/uploads/
sudo chmod -R 755 /var/www/Website-Sekolah-Indonesia/server/uploads/

# Check Nginx client_max_body_size
sudo nano /etc/nginx/sites-available/sekolah-website
# Pastikan ada: client_max_body_size 20M;

# Restart Nginx
sudo systemctl restart nginx
```

### 10.5 CORS Error

```bash
# Check CORS configuration di backend
nano /var/www/Website-Sekolah-Indonesia/server/src/index.ts

# Check CLIENT_URL di .env
cat /var/www/Website-Sekolah-Indonesia/server/.env

# Check browser console untuk detail error
# Update allowedOrigins sesuai kebutuhan
# Restart backend
pm2 restart sekolah-backend
```

---

## 📊 BAGIAN 11: Performance Optimization

### 11.1 Enable Nginx Caching

```bash
# Edit Nginx config
sudo nano /etc/nginx/nginx.conf

# Tambahkan di dalam http block:
# proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;
# proxy_cache_key "$scheme$request_method$host$request_uri";
```

### 11.2 Setup MySQL Query Cache

```bash
# Edit MySQL config
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Tambahkan:
# query_cache_type = 1
# query_cache_size = 64M
# query_cache_limit = 2M

# Restart MySQL
sudo systemctl restart mysql
```

### 11.3 PM2 Cluster Mode (untuk high traffic)

```bash
# Stop current instance
pm2 delete sekolah-backend

# Start dengan cluster mode
pm2 start src/index.ts --name "sekolah-backend" --interpreter ts-node -i max

# Save
pm2 save
```

---

## 🔐 BAGIAN 12: Security Hardening

### 12.1 Setup UFW Firewall

```bash
# Install UFW
sudo apt install -y ufw

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH
sudo ufw allow ssh

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose
```

### 12.2 Disable Root Login

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Set:
# PermitRootLogin no
# PasswordAuthentication no  # Jika menggunakan SSH key

# Restart SSH
sudo systemctl restart sshd
```

### 12.3 Setup Fail2Ban

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Copy default config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit config
sudo nano /etc/fail2ban/jail.local

# Enable dan start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status
```

---

## 📝 BAGIAN 13: Checklist Deployment

### Pre-Deployment Checklist

- [ ] VM Instance sudah dibuat di GCP
- [ ] Firewall rules sudah dikonfigurasi
- [ ] Domain sudah pointing ke IP server (jika menggunakan domain)
- [ ] MySQL sudah terinstall dan configured
- [ ] Node.js dan PM2 sudah terinstall
- [ ] Nginx sudah terinstall

### Deployment Checklist

- [ ] Repository sudah di-clone ke server
- [ ] Environment variables (.env) sudah dikonfigurasi dengan benar
- [ ] Database migrations sudah dijalankan
- [ ] Database seeders sudah dijalankan
- [ ] Backend dependencies sudah terinstall
- [ ] Frontend sudah di-build
- [ ] Upload directory sudah dibuat dengan permission yang tepat
- [ ] PM2 sudah running backend
- [ ] Nginx sudah dikonfigurasi dan running
- [ ] CORS sudah dikonfigurasi dengan benar

### Post-Deployment Checklist

- [ ] Backend API bisa diakses
- [ ] Frontend bisa diakses
- [ ] Login admin berfungsi
- [ ] Upload file berfungsi
- [ ] Database connection berfungsi
- [ ] SSL certificate sudah terinstall (jika menggunakan HTTPS)
- [ ] Backup database sudah di-setup
- [ ] Monitoring sudah di-setup
- [ ] Logs bisa diakses dan tidak ada error

---

## 🆘 Support & Resources

### Useful Commands Reference

```bash
# PM2
pm2 status                    # Check status
pm2 restart sekolah-backend   # Restart app
pm2 logs sekolah-backend      # View logs
pm2 monit                     # Monitor resources

# Nginx
sudo systemctl status nginx   # Check status
sudo nginx -t                 # Test config
sudo systemctl restart nginx  # Restart
sudo tail -f /var/log/nginx/error.log  # View error logs

# MySQL
sudo systemctl status mysql   # Check status
mysql -u sekolah_user -p      # Login to MySQL
sudo tail -f /var/log/mysql/error.log  # View error logs

# System
df -h                         # Disk usage
free -h                       # Memory usage
top                           # CPU usage
sudo systemctl status         # All services status
```

### Important File Locations

```
/var/www/Website-Sekolah-Indonesia/          # Application root
/var/www/Website-Sekolah-Indonesia/server/   # Backend
/var/www/Website-Sekolah-Indonesia/dist/     # Frontend build
/var/www/Website-Sekolah-Indonesia/server/uploads/  # Uploaded files
/etc/nginx/sites-available/sekolah-website   # Nginx config
/var/log/nginx/                              # Nginx logs
~/.pm2/logs/                                 # PM2 logs
~/backups/                                   # Database backups
```

### Contact & Documentation

- **Google Cloud Documentation**: https://cloud.google.com/docs
- **PM2 Documentation**: https://pm2.keymetrics.io/docs/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **MySQL Documentation**: https://dev.mysql.com/doc/

---

## 🎉 Selesai!

Aplikasi Website Sekolah Indonesia Anda sekarang sudah ter-deploy di Google Cloud Platform!

**Next Steps:**
1. Setup monitoring dan alerting
2. Setup automated backups ke Cloud Storage
3. Implement CI/CD untuk automated deployment
4. Setup CDN untuk static assets
5. Implement rate limiting dan security measures tambahan

**Selamat! 🚀**
