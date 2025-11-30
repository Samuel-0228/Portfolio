/* TYPEWRITER EFFECT */
const words = [
    "AI & Data Science Enthusiast",
    "Information Systems Student",
    "Visual Thinker",
    "Creative Problem Solver"
];

let i = 0, j = 0, current = "", isDeleting = false;

function type() {
    const speed = isDeleting ? 50 : 100;
    const target = document.getElementById("typewriter");

    current = words[i].substring(0, j);
    target.textContent = current;

    if (!isDeleting && j < words[i].length) {
        j++;
    } else if (isDeleting && j > 0) {
        j--;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % words.length;
    }

    setTimeout(type, speed);
}
type();

/* 3D PARALLAX TILT */
document.querySelector('.tilt').addEventListener('mousemove', (e) => {
    const box = e.currentTarget;
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    box.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

document.querySelector('.tilt').addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
});

/* MOBILE NAV MENU */
function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
