// ===== TYPEWRITER EFFECT =====
const typewriterTexts = ["AI Enthusiast", "Data Scientist", "Visual Thinker", "Problem Solver"];
let typeIndex = 0;
let charIndex = 0;
const typeSpeed = 120;
const eraseSpeed = 60;
const delay = 2000;

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

document.addEventListener("DOMContentLoaded", () => typeWriter());

// ===== 3D TILT HERO =====
const tiltHero = document.querySelector(".tilt");
if (tiltHero) {
    tiltHero.addEventListener("mousemove", (e) => {
        const { width, height, left, top } = tiltHero.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        const tiltX = (y / height) * 15;
        const tiltY = -(x / width) * 15;
        tiltHero.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    tiltHero.addEventListener("mouseleave", () => {
        tiltHero.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}

// ===== SCROLL TRIGGERED FADE-IN =====
const faders = document.querySelectorAll(".section, .project-card");
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// ===== OPTIONAL: FLOATING SHAPES + LINE ENHANCEMENT =====
// Randomized subtle movements for floating shapes
const shapes = document.querySelectorAll(".shape");
shapes.forEach((shape) => {
    const speed = Math.random() * 0.5 + 0.2;
    let pos = 0;
    function move() {
        pos += speed;
        shape.style.transform = `translateY(${Math.sin(pos) * 15}px) rotate(${pos * 5}deg)`;
        requestAnimationFrame(move);
    }
    move();
});

// Smooth moving lines animation
const lines = document.querySelectorAll(".line");
lines.forEach((line, index) => {
    let pos = 0;
    const speed = 0.3 + index * 0.05;
    function animateLine() {
        pos += speed;
        line.style.transform = `translateY(${pos % 200 - 100}%)`;
        requestAnimationFrame(animateLine);
    }
    animateLine();
});
