# 📧 วิธีการตั้งค่าระบบส่งอีเมลสำหรับ Portfolio

## 🚀 ขั้นตอนการติดตั้งและใช้งาน

### 1. ติดตั้ง Node.js

**สำหรับ Windows:**
1. ไปที่ [nodejs.org](https://nodejs.org/)
2. ดาวน์โหลด LTS version (แนะนำ)
3. รันไฟล์ installer และติดตั้งตามขั้นตอน
4. เปิด Command Prompt หรือ PowerShell ใหม่
5. ตรวจสอบการติดตั้ง:
   ```bash
   node --version
   npm --version
   ```

### 2. ติดตั้ง Dependencies

```bash
cd backend
npm install
```

### 3. ตั้งค่า Gmail App Password

1. เข้าไปที่ [Google Account Security](https://myaccount.google.com/security)
2. เปิดใช้งาน **2-Step Verification**
3. สร้าง **App Password**:
   - ไปที่ Security > 2-Step Verification > App passwords
   - เลือก "Mail" และ "Other (custom name)"
   - ใส่ชื่อ "Portfolio Backend"
   - คัดลอก App Password (16 ตัวอักษร)

### 4. แก้ไขไฟล์ .env

เปิดไฟล์ `backend/.env` และแก้ไข:

```env
# แก้ไขข้อมูลเหล่านี้
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
RECIPIENT_EMAIL=nattinun.kanp@gmail.com
```

### 5. เริ่มต้น Backend Server

```bash
cd backend
npm start
```

หรือสำหรับ development mode:
```bash
npm run dev
```

Server จะทำงานที่: `http://localhost:3001`

### 6. เปิด Frontend

1. เปิดไฟล์ `index.html` ด้วย Live Server (VS Code Extension)
2. หรือเปิดไฟล์โดยตรงในเบราว์เซอร์

### 7. ทดสอบการส่งอีเมล

1. เปิดเว็บไซต์ Portfolio
2. คลิกปุ่ม "Contact"
3. กรอกข้อมูลในฟอร์ม:
   - First Name
   - Last Name  
   - Email
   - Message
4. คลิก "Send"
5. ตรวจสอบอีเมลที่ `RECIPIENT_EMAIL`

## 🔧 การแก้ไขปัญหา

### ปัญหา: "npm is not recognized"
**วิธีแก้:** ติดตั้ง Node.js ใหม่และ restart terminal

### ปัญหา: "Authentication failed"
**วิธีแก้:** 
- ตรวจสอบว่าเปิดใช้งาน 2-Step Verification แล้ว
- ใช้ App Password แทน password ปกติ
- ตรวจสอบ EMAIL_USER และ EMAIL_PASS ใน .env

### ปัญหา: "CORS Error"
**วิธีแก้:**
- ตรวจสอบ FRONTEND_URL ใน .env
- ตรวจสอบว่า frontend ทำงานที่ port ที่ถูกต้อง

### ปัญหา: "Cannot connect to server"
**วิธีแก้:**
- ตรวจสอบว่า backend server ทำงานอยู่
- ตรวจสอบ port 3001 ว่าไม่ถูกใช้งานโดยโปรแกรมอื่น

## 📁 โครงสร้างไฟล์

```
Portfolio/
├── index.html          # Frontend
├── script.js           # JavaScript (แก้ไขแล้ว)
├── style.css           # CSS
└── backend/
    ├── server.js       # Backend API
    ├── package.json    # Dependencies
    ├── .env           # Configuration
    ├── .env.example   # Template
    └── README.md      # Documentation
```

## 🌟 Features ที่เพิ่มเข้ามา

✅ **Backend API** - Node.js + Express + Nodemailer  
✅ **Security** - Rate limiting, CORS, Input validation  
✅ **Email Templates** - HTML และ Plain text  
✅ **Error Handling** - จัดการ error อย่างครอบคลุม  
✅ **Frontend Integration** - เชื่อมต่อกับ API แทน alert  

## 📞 การติดต่อ

หากมีปัญหาในการตั้งค่า สามารถติดต่อได้ที่:
- Email: nattinun.kanp@gmail.com
- หรือสร้าง issue ใน repository

---

**หมายเหตุ:** อย่าลืมเก็บ App Password ไว้อย่างปลอดภัย และไม่แชร์ให้ผู้อื่น