# Environment Setup Guide

## 🔧 Local Development Setup

### 1. Create `.env.local` file

Proje root dizininde `.env.local` dosyası oluşturun:

```bash
# Windows PowerShell
New-Item -Path .env.local -ItemType File

# Linux/Mac
touch .env.local
```

### 2. Add API URL Configuration

`.env.local` dosyasına aşağıdaki içeriği ekleyin:

```env
# Local Development API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Production API URL (uncomment when deploying)
# NEXT_PUBLIC_API_URL=https://api.timera.az/api
```

### 3. Restart Development Server

Environment değişikliklerinden sonra development server'ı yeniden başlatın:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 📝 Important Notes

- `.env.local` dosyası `.gitignore`'da olduğu için Git'e commit edilmez
- Her developer kendi local `.env.local` dosyasını oluşturmalıdır
- Production deployment'da environment variable'lar hosting platform'da ayarlanmalıdır

## 🔍 Verify Configuration

API URL'in doğru ayarlandığını kontrol etmek için:

1. Browser console'u açın (F12)
2. `process.env.NEXT_PUBLIC_API_URL` yazın (client-side'da çalışmaz, sadece build-time'da)
3. Network tab'inde API request'lerin doğru URL'e gittiğini kontrol edin

## 🚀 Production Deployment

Production'da environment variable'ı hosting platform'da ayarlayın:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Docker**: `docker run -e NEXT_PUBLIC_API_URL=...`

