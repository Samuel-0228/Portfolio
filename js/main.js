function createSection(title, html) {
    return `
    <section class="section" id="${title.toLowerCase()}">
      <h2>${title}</h2>
      ${html}
    </section>
  `;
}

function init() {
    const main = document.getElementById("content");

    // ABOUT
    main.innerHTML += createSection("About", `<p>${portfolioData.about}</p>`);

    // SKILLS
    main.innerHTML += createSection("Skills",
        `<div>${portfolioData.skills.map(s => `<span class="skill-badge">${s}</span>`).join("")}</div>`
    );

    // EDUCATION
    main.innerHTML += createSection("Education",
        `<ul>${portfolioData.education.map(e =>
            `<li><strong>${e.institution}</strong> — ${e.degree} (${e.period})</li>`
        ).join("")}</ul>`
    );

    // CERTIFICATIONS
    main.innerHTML += createSection("Certifications",
        `<ul>${portfolioData.certifications.map(c => `<li>${c}</li>`).join("")}</ul>`
    );

    // PROJECTS
    main.innerHTML += createSection("Projects",
        `${portfolioData.projects.map(p => `
      <div class="project-card">
        <img src="${p.image}" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">View on GitHub</a>
      </div>
    `).join("")}`
    );

    // CONTACT
    main.innerHTML += createSection("Contact",
        `<p>Email: <a href="mailto:${portfolioData.contact.email}">${portfolioData.contact.email}</a></p>
     <p>GitHub: <a href="${portfolioData.contact.github}" target="_blank">${portfolioData.contact.github}</a></p>`
    );
}

window.onload = init;
