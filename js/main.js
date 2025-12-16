// js/main.js - Consolidated: Injection first, then animations/observers
// Function to inject all content
function injectContent() {
  // ABOUT
  const aboutContent = document.querySelector('#about .about-content');
  aboutContent.innerHTML = `
        <div class="about-grid">
            <div class="about-text">
                ${portfolioData.about.split('\n').filter(p => p.trim()).map(para => `<p>${para}</p>`).join('')}
            </div>
            <div class="about-stats">
                <div class="stat-item">
                    <h3>Projects</h3>
                    <span class="stat-number">18</span>
                </div>
                <div class="stat-item">
                    <h3>Skills</h3>
                    <span class="stat-number">${portfolioData.skills.length}</span>
                </div>
                <div class="stat-item">
                    <h3>Years Active</h3>
                    <span class="stat-number">2+</span>
                </div>
            </div>
        </div>
    `;

  // SKILLS
  const skillsGrid = document.querySelector('#skills .skills-grid');
  skillsGrid.innerHTML = portfolioData.skills.map(skill => `
        <div class="skill-card" data-skill="${skill}">
            <div class="skill-icon">⚡</div>
            <h3>${skill}</h3>
            <div class="skill-bar">
                <div class="skill-progress" data-width="90"></div>
            </div>
        </div>
    `).join('');

  // TIMELINE
  const timeline = document.querySelector('#timeline .timeline');
  const timelineItems = [...portfolioData.education, ...portfolioData.certifications.map(cert => ({
    institution: cert,
    degree: 'Certification',
    period: '2023-2025'
  }))];
  timeline.innerHTML = timelineItems.map((item, index) => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${item.institution}</h3>
                <p>${item.degree} — ${item.period}</p>
            </div>
        </div>
    `).join('');

  // PROJECTS
  const projectsGrid = document.querySelector('#projects .projects-grid');
  projectsGrid.innerHTML = portfolioData.projects.map((project, index) => `
        <div class="project-card" data-modal="modal-${index}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.name}" loading="lazy">
                <div class="project-overlay">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-link">View Code</a>
                </div>
            </div>
        </div>
    `).join('');

  // CONTACT
  // CONTACT (updated form with name attributes for EmailJS)
  const contactContent = document.querySelector('#contact .contact-content');
  contactContent.innerHTML = `
    <div class="contact-grid">
        <div class="contact-info">
            <p>Ready to collaborate on AI innovations or data-driven visions?</p>
            <div class="contact-links">
                <a href="mailto:${portfolioData.contact.email}" class="contact-link">📧 Email</a>
                <a href="${portfolioData.contact.github}" target="_blank" class="contact-link">🐙 GitHub</a>
                <a href="https://linkedin.com/in/samuel-0228" target="_blank" class="contact-link">💼 LinkedIn</a>
            </div>
        </div>
        <form class="contact-form" id="contact-form">
            <input type="text" name="from_name" placeholder="Your Name" required>
            <input type="email" name="from_email" placeholder="Your Email" required>
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit" class="btn-primary">Send Message</button>
        </form>
    </div>
`;

  // MODALS
  let modalsHTML = '';
  portfolioData.projects.forEach((project, index) => {
    modalsHTML += `
            <div id="modal-${index}" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${project.image}" alt="${project.name}">
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn-primary">View Project</a>
                </div>
            </div>
        `;
  });
  document.body.insertAdjacentHTML('beforeend', modalsHTML);
}

// Setup scroll observer after injection
function setupScrollObserver() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(el => observer.observe(el));
}

// Animate skill bars after injection
function animateSkillBars() {
  document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.getAttribute('data-width') || '90';
    setTimeout(() => bar.style.width = width + '%', 500);
  });
}

// Mobile menu
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  injectContent(); // Inject first
  setupScrollObserver(); // Then observer
  animateSkillBars(); // Then animations

  // Form handler
  // Form handler - Real email sending with EmailJS
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission

    // Send email via EmailJS
    emailjs.sendForm('service_dkiug9r', 'template_40toodj', '#contact-form', 'Ge23N6ZheHUku30D_')
      .then((result) => {
        console.log('Email sent successfully!', result.text);
        alert('Message sent! I\'ll get back to you soon.');  // Or show a success modal
        e.target.reset();  // Clear form
      }, (error) => {
        console.log('Failed to send email:', error.text);
        alert('Oops! Something went wrong. Try emailing me directly at ' + portfolioData.contact.email);
      });
  });

  // Project modals
  document.addEventListener('click', (e) => {
    if (e.target.closest('.project-card')) {
      const modalId = e.target.closest('.project-card').getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'block';
    }
    if (e.target.classList.contains('close')) {
      e.target.closest('.modal').style.display = 'none';
    }
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Start typewriter after injection
  setTimeout(typeWriter, 500);
});

// Global smooth scroll
document.documentElement.style.scrollBehavior = 'smooth';