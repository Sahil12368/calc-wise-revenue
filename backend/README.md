# Calculator App - Node.js MySQL Backend

## Setup on Hostinger VPS

### 1. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install MySQL (if not already installed)
```bash
sudo apt install mysql-server
sudo mysql_secure_installation
```

### 3. Setup Database
```bash
mysql -u root -p < database/schema.sql
```

### 4. Configure Environment
```bash
cp .env.example .env
nano .env  # Edit with your actual credentials
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Run with PM2 (Production)
```bash
npm install -g pm2
pm2 start src/index.js --name calculator-api
pm2 save
pm2 startup
```

### 7. Setup Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. SSL with Certbot
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Calculators
- `GET /api/calculators/featured` - Get featured calculators
- `POST /api/calculators/featured` - Add featured (admin)
- `PUT /api/calculators/featured/:id` - Update (admin)
- `DELETE /api/calculators/featured/:id` - Delete (admin)

### Analytics
- `POST /api/analytics/visit` - Log page visit
- `GET /api/analytics` - Get analytics (admin)

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings/:key` - Update setting (admin)
