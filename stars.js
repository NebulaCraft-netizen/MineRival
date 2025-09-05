// Animated starfield with hover effect
const canvas = document.getElementById('bg-stars');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = window.innerWidth > 1000 ? 120 : 60;
const STAR_COLOR = "#fff";
const STAR_COLOR_HOVER = "#00fff7";
const STAR_RADIUS = 1.7;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.09,
    vy: (Math.random() - 0.5) * 0.09,
    r: STAR_RADIUS + Math.random() * 0.7,
    hover: false
  };
}

for (let i = 0; i < STAR_COUNT; i++) stars.push(randomStar());

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  for (const s of stars) {
    const d = Math.hypot(s.x - mx, s.y - my);
    s.hover = (d < 16);
  }
});

canvas.addEventListener('mouseleave', () => {
  for (const s of stars) s.hover = false;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = s.hover ? STAR_COLOR_HOVER : STAR_COLOR;
    ctx.globalAlpha = s.hover ? 0.9 : 0.55 + Math.random() * 0.25;
    ctx.shadowBlur = s.hover ? 15 : 6;
    ctx.shadowColor = s.hover ? STAR_COLOR_HOVER : "#fff";
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}

function update() {
  for (const s of stars) {
    s.x += s.vx;
    s.y += s.vy;
    if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
