cd /var/www/Website-Sekolah-Indonesia/server
pm2 delete sekolah-backend || true
pm2 start "npx ts-node --transpile-only src/index.ts" --name "sekolah-backend"
pm2 save
