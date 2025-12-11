const content = document.getElementById("content");

function displayProjects(projects) {
    const container = document.createElement("div");
    container.classList.add("projects-container");

    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            </div>
        `;

        container.appendChild(card);
    });

    content.appendChild(container);
}

// Call the function with your data
displayProjects(portfolioData.projects);
