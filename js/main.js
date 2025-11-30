// Helper to create a section
function createSection(title, html) {
    return `
    <section class="section" id="${title.toLowerCase()}">
      <h2>${title}</h2>
      ${html}
    </section>
  `;
}

// Initialize the portfolio content
function init() {
    const main = document.getElementById("content");

    // ABOUT
    main.innerHTML += createSection("About", `<p>${portfolioData.about}</p>`);

    // SKILLS
    main.innerHTML += createSection(
        "Skills",
        `<div class="skills-container">
      ${portfolioData.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
    </div>`
    );

    // EDUCATION
    main.innerHTML += createSection(
        "Education",
        `<ul>
      ${portfolioData.education.map(e =>
            `<li><strong>${e.institution}</strong> — ${e.degree} (${e.period})</li>`
        ).join("")}
    </ul>`
    );

    // CERTIFICATIONS
    main.innerHTML += createSection(
        "Certifications",
        `<ul>
      ${portfolioData.certifications.map(c => `<li>${c}</li>`).join("")}
    </ul>`
    );

    // PROJECTS (Hybrid: animated cards + slider buttons)
    let projectsHTML = `
    <div class="projects-slider">
      <button class="slider-btn" onclick="slideProjects(-1)">‹</button>
      <div class="projects-track">
        ${portfolioData.projects.map(p => `
          <div class="project-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <a href="${p.link}" target="_blank">View Project</a>
          </div>
        `).join("")}
      </div>
      <button class="slider-btn" onclick="slideProjects(1)">›</button>
    </div>
  `;
    main.innerHTML += createSection("Projects", projectsHTML);

    // CONTACT
    main.innerHTML += createSection(
        "Contact",
        `<p>Email: <a href="mailto:${portfolioData.contact.email}">${portfolioData.contact.email}</a></p>
     <p>GitHub: <a href="${portfolioData.contact.github}" target="_blank">${portfolioData.contact.github}</a></p>`
    );
}

// PROJECT SLIDER FUNCTIONALITY
let currentSlide = 0;
function slideProjects(direction) {
    const track = document.querySelector(".projects-track");
    const cards = document.querySelectorAll(".project-card");
    const cardWidth = cards[0].offsetWidth + 20; // include margin
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > cards.length - 1) currentSlide = cards.length - 1;
    track.style.transform = `translateX(${-currentSlide * cardWidth}px)`;
}

window.onload = init;

// MOBILE NAV MENU
function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
