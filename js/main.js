// ============================================
// MAIN.JS - JavaScript principal du portfolio
// ============================================

// ============================================
// PARTICLE SNOW ANIMATION (violet)
// ============================================
(function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    const COLORS = ['#663158', '#9a4483', '#3b1731', '#b05a9a', '#4a2040'];
    const NUM = 80;

    const particles = Array.from({ length: NUM }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.8 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.6 + 0.2,
    }));

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.y > H + p.r) { p.y = -p.r; p.x = Math.random() * W; }
            if (p.x > W + p.r) p.x = -p.r;
            if (p.x < -p.r) p.x = W + p.r;
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();
})();

// ============================================
// ACTIVE NAV LINK — based on current page filename
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('a.mini-icon');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = (link.getAttribute('href') || '').split('/').pop();
        if (href === currentPage || (currentPage === '' && (href === 'home.html' || href === 'index.html'))) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(modalNumber) {
    const modal = document.getElementById('modal' + modalNumber);
    if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; }
}

function closeModal(modalNumber) {
    const modal = document.getElementById('modal' + modalNumber);
    if (modal) { modal.classList.remove('show'); document.body.style.overflow = 'auto'; }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal') && event.target.classList.contains('show')) {
        closeModal(event.target.id.replace('modal', ''));
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => closeModal(modal.id.replace('modal', '')));
    }
});

console.log('Script main.js chargé avec succès !');