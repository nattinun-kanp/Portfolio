# Portfolio Backend API

Backend API สำหรับการส่งอีเมลจากฟอร์มติดต่อในเว็บไซต์ Portfolio

## ✨ Features

- 📧 ส่งอีเมลผ่าน SMTP (Gmail, SendGrid, Mailgun)
- 🔒 Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Input validation และ sanitization
- 🚀 RESTful API design
- 📊 Health check endpoint
- 🛡️ Error handling

## 🚀 Quick Start

### 1. ติดตั้ง Dependencies

```bash
cd backend
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` จาก `.env.example`:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env`:

```env
# Server Configuration
PORT=3001

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Recipient Email
RECIPIENT_EMAIL=nattinun.kanp@gmail.com

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. การตั้งค่า Gmail App Password

1. เปิด [Google Account Security](https://myaccount.google.com/security)
2. เปิดใช้งาน 2-Step Verification
3. สร้าง App Password:
   - ไปที่ Security > 2-Step Verification > App passwords
   - เลือก "Mail" และ "Other (custom name)"
   - ใส่ชื่อ "Portfolio Backend"
   - คัดลอก App Password ไปใส่ใน `EMAIL_PASS`

### 4. เริ่มต้น Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server จะทำงานที่ `http://localhost:3001`

## 📡 API Endpoints

### POST /api/contact

ส่งอีเมลจากฟอร์มติดต่อ

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully!",
  "messageId": "<message-id>"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### GET /api/health

ตรวจสอบสถานะ server

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Features

- **Rate Limiting**: จำกัด 5 requests ต่อ 15 นาที ต่อ IP
- **Input Validation**: ตรวจสอบและทำความสะอาดข้อมูล input
- **CORS**: จำกัดการเข้าถึงจาก domain ที่กำหนด
- **Helmet**: เพิ่ม security headers
- **Error Handling**: จัดการ error อย่างปลอดภัย

## 🛠️ การใช้งานกับ Frontend

แก้ไขไฟล์ `script.js` ในส่วน contact form:

```javascript
// เปลี่ยนจาก alert เป็นการเรียก API
const response = await fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    message: message
  })
});

const result = await response.json();
```

## 🔧 การ Deploy

### Heroku

1. สร้าง Heroku app
2. ตั้งค่า environment variables ใน Heroku dashboard
3. Deploy:

```bash
git add .
git commit -m "Add backend API"
heroku git:remote -a your-app-name
git push heroku main
```

### Vercel

1. ติดตั้ง Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. ตั้งค่า environment variables ใน Vercel dashboard

## 📝 Notes

- ใช้ Gmail SMTP ในการส่งอีเมล
- รองรับ HTML และ plain text email
- มี rate limiting เพื่อป้องกัน spam
- Log การส่งอีเมลใน console
- รองรับ CORS สำหรับ frontend

## 🐛 Troubleshooting

**Gmail Authentication Error:**
- ตรวจสอบว่าเปิดใช้งาน 2-Step Verification แล้ว
- ใช้ App Password แทน password ปกติ
- ตรวจสอบ EMAIL_USER และ EMAIL_PASS ใน .env

**CORS Error:**
- ตรวจสอบ FRONTEND_URL ใน .env
- ตรวจสอบว่า frontend ทำงานที่ port ที่ถูกต้อง

**Rate Limit Error:**
- รอ 15 นาทีแล้วลองใหม่
- หรือปรับค่า RATE_LIMIT_MAX_REQUESTS ใน .env