const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ตั้งขนาดของ canvas ให้เต็มหน้าจอ
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// Parallax Effect for 3D Models
let parallaxElements = [];
window.addEventListener('load', () => {
  parallaxElements = document.querySelectorAll('model-viewer');
});

document.addEventListener('mousemove', (e) => {
  const mouseXPercent = (e.clientX / window.innerWidth) * 100;
  const mouseYPercent = (e.clientY / window.innerHeight) * 100;
  
  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseXPercent - 50) * speed * 0.1;
    const y = (mouseYPercent - 50) * speed * 0.1;
    element.style.transform = `translate(${x}px, ${y}px) rotateY(${x * 0.1}deg)`;
  });
});

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

// About Me Popup functionality
const aboutPopup = document.getElementById('aboutPopup');
const aboutBtn = document.querySelector('.about-btn');
const closeBtns = document.querySelectorAll('.close-btn');

// Contact Popup functionality
const contactPopup = document.getElementById('contactPopup');
const contactBtn = document.querySelector('.contact-btn');

// Open About Me popup
aboutBtn.addEventListener('click', () => {
  aboutPopup.style.display = 'flex';
});

// Open Contact popup
contactBtn.addEventListener('click', () => {
  contactPopup.style.display = 'flex';
});

// Close popup when clicking close button
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    aboutPopup.style.display = 'none';
    contactPopup.style.display = 'none';
  });
});

// Close popup when clicking outside
aboutPopup.addEventListener('click', (e) => {
  if (e.target === aboutPopup) {
    aboutPopup.style.display = 'none';
  }
});

contactPopup.addEventListener('click', (e) => {
  if (e.target === contactPopup) {
    contactPopup.style.display = 'none';
  }
});

// Close popup with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (aboutPopup.style.display === 'flex') {
      aboutPopup.style.display = 'none';
    }
    if (contactPopup.style.display === 'flex') {
      contactPopup.style.display = 'none';
    }
  }
});

// Projects Popup functionality
const projectsPopup = document.getElementById('projectsPopup');
const projectsBtn = document.querySelector('.projects-btn');

// Projects button event listener is now handled inside initProjectsUI()

// Ensure close buttons also close Projects popup
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (projectsPopup) projectsPopup.style.display = 'none';
  });
});

// Close projects popup when clicking outside
if (projectsPopup) {
  projectsPopup.addEventListener('click', (e) => {
    if (e.target === projectsPopup) {
      projectsPopup.style.display = 'none';
    }
  });
}

// Extend ESC to close projects popup
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (projectsPopup && projectsPopup.style.display === 'flex') {
      projectsPopup.style.display = 'none';
    }
  }
});

// Events Popup functionality
const eventsPopup = document.getElementById('eventsPopup');
const eventBtn = document.querySelector('.event a');

// Event button click listener
if (eventBtn) {
  eventBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (eventsPopup) {
      eventsPopup.style.display = 'flex';
    }
  });
}

// Ensure close buttons also close Events popup
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (eventsPopup) eventsPopup.style.display = 'none';
  });
});

// Close events popup when clicking outside
if (eventsPopup) {
  eventsPopup.addEventListener('click', (e) => {
    if (e.target === eventsPopup) {
      eventsPopup.style.display = 'none';
    }
  });
}

// Extend ESC to close events popup
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (eventsPopup && eventsPopup.style.display === 'flex') {
      eventsPopup.style.display = 'none';
    }
  }
});

// Toggle Event Details Function
function toggleEventDetails(headerElement) {
  const eventContent = headerElement.nextElementSibling;
  const expandIcon = headerElement.querySelector('.expand-icon');
  
  if (eventContent.classList.contains('expanded')) {
    // ย่อรายละเอียด
    eventContent.classList.remove('expanded');
    expandIcon.classList.remove('rotated');
    setTimeout(() => {
      eventContent.style.display = 'none';
    }, 400);
  } else {
    // ขยายรายละเอียด
    eventContent.style.display = 'grid';
    setTimeout(() => {
      eventContent.classList.add('expanded');
      expandIcon.classList.add('rotated');
    }, 10);
  }
}

// -------- Projects: Tabs & Multi-Gallery --------
(function initProjectsUI(){
  if (!projectsPopup) return;

  const tabBtns = projectsPopup.querySelectorAll('.tab-btn');
  const sections = projectsPopup.querySelectorAll('.project-section');

  // เก็บ state แยกต่อโปรเจกต์
  const galleries = new Map(); // key: sectionId, value: {slides, dots, prev, next, index}

  function initGalleryForSection(section){
    const stage = section.querySelector('.gallery-stage');
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll('.gallery-slide'));
    const dots = Array.from(section.querySelectorAll('.gallery-dots .dot'));
    const prev = section.querySelector('.gallery-prev');
    const next = section.querySelector('.gallery-next');

    const state = { slides, dots, prev, next, index: 0, autoSlideTimer: null, isAutoSliding: true };
    galleries.set(section.id, state);

    function render(idx){
      state.index = (idx + state.slides.length) % state.slides.length;
      state.slides.forEach((s,i)=> s.classList.toggle('active', i === state.index));
      if (state.dots.length){
        state.dots.forEach((d,i)=> d.classList.toggle('active', i === state.index));
      }
    }
    
    function startAutoSlide(){
      if (state.autoSlideTimer) clearInterval(state.autoSlideTimer);
      state.autoSlideTimer = setInterval(() => {
        if (state.isAutoSliding) {
          render(state.index + 1);
        }
      }, 5000);
    }
    
    function stopAutoSlide(){
      state.isAutoSliding = false;
      if (state.autoSlideTimer) {
        clearInterval(state.autoSlideTimer);
        state.autoSlideTimer = null;
      }
    }
    
    function resumeAutoSlide(){
      state.isAutoSliding = true;
      startAutoSlide();
    }
    
    // expose for listeners
    state.render = render;
    state.stopAutoSlide = stopAutoSlide;
    state.resumeAutoSlide = resumeAutoSlide;

    // listeners with auto-slide pause
    if (prev) {
      prev.addEventListener('click', ()=> {
        stopAutoSlide();
        render(state.index - 1);
        setTimeout(resumeAutoSlide, 3000);
      });
    }
    if (next) {
      next.addEventListener('click', ()=> {
        stopAutoSlide();
        render(state.index + 1);
        setTimeout(resumeAutoSlide, 3000);
      });
    }
    if (dots.length){
      dots.forEach((d,i)=> {
        d.addEventListener('click', ()=> {
          stopAutoSlide();
          render(i);
          setTimeout(resumeAutoSlide, 3000);
        });
      });
    }

    // pause auto-slide on hover
    stage.addEventListener('mouseenter', stopAutoSlide);
    stage.addEventListener('mouseleave', resumeAutoSlide);

    // init
    render(0);
    startAutoSlide();
  }

  function activateTab(projectId){
    // ปรับปุ่ม
    tabBtns.forEach(btn=>{
      const active = btn.getAttribute('data-project') === projectId;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    // สลับ section
    sections.forEach(sec=>{
      const active = sec.dataset.project === projectId;
      sec.classList.toggle('active', active);
      if (active){
        // focus ให้หน้าจออ่านออก/และพร้อมใช้คีย์บอร์ด
        setTimeout(()=> {
          const firstSlide = sec.querySelector('.gallery-image');
          if (firstSlide) firstSlide.focus?.();
        },0);
      }
    });

    // ถ้ายังไม่เคย init แกลเลอรีของ section นี้ ให้ init ตอนนี้
    const target = projectsPopup.querySelector(`.project-section[data-project="${projectId}"]`);
    if (target && !galleries.has(target.id)){
      initGalleryForSection(target);
    }
  }

  // init ทุก section ที่ active อยู่แล้ว
  sections.forEach(sec=>{
    if (sec.classList.contains('active')) initGalleryForSection(sec);
  });

  // tab listeners
  tabBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const pid = btn.getAttribute('data-project');
      activateTab(pid);
    });
  });

  // keyboard navigation เฉพาะตอน popup เปิด
  document.addEventListener('keydown', (e)=>{
    if (projectsPopup.style.display !== 'flex') return;

    // หา section ปัจจุบัน
    const current = projectsPopup.querySelector('.project-section.active');
    if (!current) return;

    const state = galleries.get(current.id);
    if (!state) return;

    if (e.key === 'ArrowLeft')  state.render(state.index - 1);
    if (e.key === 'ArrowRight') state.render(state.index + 1);
  });

  // เมื่อกดปุ่มเมนู Projects ให้เปิด popup + โชว์แท็บแรกเสมอ
  if (projectsBtn){
    projectsBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      projectsPopup.style.display = 'flex';
      const first = tabBtns[0]?.getAttribute('data-project');
      if (first) activateTab(first);
    });
  }
})();

// Contact form submission
const messageForm = document.querySelector('.message-form');
if (messageForm) {
  messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstName = messageForm.querySelector('input[name="firstName"]').value;
    const lastName = messageForm.querySelector('input[name="lastName"]').value;
    const email = messageForm.querySelector('input[name="email"]').value;
    const message = messageForm.querySelector('textarea[name="message"]').value;
    
    if (firstName && lastName && email && message) {
      // Add loading animation
      const submitBtn = messageForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'กำลังส่ง...';
      submitBtn.disabled = true;
      
      try {
        // Send email via API
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
        
        if (result.success) {
          alert('ขอบคุณสำหรับข้อความของคุณ! อีเมลถูกส่งเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด');
          messageForm.reset();
          contactPopup.style.display = 'none';
        } else {
          throw new Error(result.message || 'เกิดข้อผิดพลาดในการส่งอีเมล');
        }
        
      } catch (error) {
        console.error('Error sending email:', error);
        
        // Check if it's a network error (backend not running)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่า backend server ทำงานอยู่ที่ port 3001');
        } else {
          alert('เกิดข้อผิดพลาดในการส่งอีเมล: ' + error.message);
        }
      } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  });
}

// Typing Animation Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply scroll animation to elements
window.addEventListener('load', () => {
  const animateElements = document.querySelectorAll('.skill-item, .project-section, .popup-content');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Enhanced Button Hover Effects
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button, .btn, .tab-btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    });
  });
});

// Window Resize Handler
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Hamburger Menu Functionality
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navbarMenu = document.getElementById('navbarMenu');

if (hamburgerMenu && navbarMenu) {
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  // Close menu when clicking on menu items
  const menuLinks = navbarMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target) && !navbarMenu.contains(e.target)) {
      hamburgerMenu.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  });

  // Close menu on window resize to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburgerMenu.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  });
}