const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ตั้งขนาดของ canvas ให้เต็มหน้าจอ
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 250; // จำนวนดาวที่จะแสดง
const shootingStars = []; // สำหรับดาวตก

// สร้างดาว
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.2,
    opacity: Math.random(),  // ความโปร่งแสงของดาว (สุ่ม)
    speed: Math.random() * 0.1 + 0.1,  // ความเร็วของการเคลื่อนไหว
    flickerSpeed: Math.random() * 300 + 100,  // ความเร็วในการสว่าง/ดับ
  };
}

// สร้างดาวทั้งหมด
for (let i = 0; i < starCount; i++) {
  stars.push(createStar());
}

// ฟังก์ชันสำหรับการวาดดาว
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // วาดดาวตก
  shootingStars.forEach(star => {
    star.x += star.speedX;  // ดาวตกจะเคลื่อนที่ในแนวนอน
    star.y += star.speedY;  // ดาวตกจะเคลื่อนที่ในแนวตั้ง

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x + star.length, star.y + star.length); // วาดเส้นยาวเป็นดาวตก
    ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // วาดดาว
  stars.forEach(star => {
    // สุ่มการสว่าง/ดับ
    star.opacity += (Math.random() - 0.5) * 0.1; // ทำให้โปร่งแสงสุ่ม
    if (star.opacity < 0) star.opacity = 0;
    if (star.opacity > 1) star.opacity = 1;

    // วาดดาว
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // ใช้ opacity เพื่อทำให้ดาวสว่าง/ดับ
    ctx.fill();

    // ทำให้ดาวเคลื่อนที่
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;  // รีเซ็ตตำแหน่งดาวเมื่อดาวเคลื่อนที่เกินหน้าจอ
    }
  });
  
  requestAnimationFrame(drawStars); // เรียกใช้ฟังก์ชันซ้ำอย่างต่อเนื่อง
}

drawStars();

// ฟังก์ชันสำหรับสร้างดาวตก
function createShootingStar() {
  const shootingStar = {
    x: Math.random() * canvas.width, 
    y: Math.random() * canvas.width,
    length: Math.random() * 70 + 70, // ความยาวของดาวตก
    speedX: Math.random() * 2 + 2, // ความเร็วในแนวนอน
    speedY: Math.random() * 2 + 2, // ความเร็วในแนวตั้ง
    opacity: Math.random() * 0.5 + 0.5, // ความโปร่งแสง
    lifespan: Math.random() * 150 + 50, // ความยาวเวลาของดาวตก
  };
  
  shootingStars.push(shootingStar);

  // ลบดาวตกหลังจากเวลาที่กำหนด
  setTimeout(() => {
    const index = shootingStars.indexOf(shootingStar);
    if (index !== -1) {
      shootingStars.splice(index, 1);
    }
  }, shootingStar.lifespan);
}

setInterval(createShootingStar, 5000); // สร้างดาวตกทุก 5 วินาที