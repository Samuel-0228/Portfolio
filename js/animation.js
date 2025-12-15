// js/animations.js - Simplified: Particles, typewriter functions, theme toggle, hero tilt
// Particles.js init for hero background
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffae42' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffae42', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Typewriter effect - Enhanced texts for futuristic vibe
const typewriterTexts = ["AI Visionary", "Data Alchemist", "Code Sculptor", "Innovation Catalyst"];
let typeIndex = 0;
let charIndex = 0;
const typeSpeed = 100;
const eraseSpeed = 50;
const delay = 2500;

function typeWriter() {
    const typeEl = document.getElementById("typewriter");
    if (!typeEl) return;
    if (charIndex < typewriterTexts[typeIndex].length) {
        typeEl.textContent += typewriterTexts[typeIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typeSpeed);
    } else {
        setTimeout(eraseWriter, delay);
    }
}

function eraseWriter() {
    const typeEl = document.getElementById("typewriter");
    if (!typeEl) return;
    if (charIndex > 0) {
        typeEl.textContent = typewriterTexts[typeIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseWriter, eraseSpeed);
    } else {
        typeIndex = (typeIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, typeSpeed);
    }
}

// Theme toggle (immediate)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = document.getElementById('theme-toggle');
        icon.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
    });

    // Hero tilt (immediate)
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});