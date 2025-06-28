


function toggleMode() {
  const body = document.body;
  const button = document.getElementById("toggleButton");

  body.classList.toggle("light-mode");

  const isLight = body.classList.contains("light-mode");
  button.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";

  localStorage.setItem("theme", isLight ? "light" : "dark");


  switchBackground(isLight);
}

// On load: apply saved theme and start particles + background
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");

  if (theme === "light") {
    document.body.classList.add("light-mode");
    const btn = document.getElementById("toggleButton");
    if (btn) btn.textContent = "🌙 Dark Mode";
  }

  setupParticles();
  switchBackground(document.body.classList.contains("light-mode"));
});



// ✨ Your existing animated particles
function setupParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  }));

  function drawParticles() {
    const isLight = document.body.classList.contains("light-mode");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isLight ? "rgb(0, 13, 151)" : "rgba(0, 255, 255, 0.99)";
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}
