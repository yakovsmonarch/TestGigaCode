const socialIcons = {
    github: `<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`
};

const projectIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
const externalIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

async function init() {
    try {
        const res = await fetch('data.json');
        const data = await res.json();
        render(data);
    } catch (err) {
        console.error('Failed to load data:', err);
    }
}

function render(data) {
    // Hero
    document.querySelector('[data-name="hero"]').textContent = data.name;
    document.querySelector('[data-title="hero"]').textContent = data.title;
    document.querySelector('[data-bio="hero"]').textContent = data.bio;
    document.getElementById('avatar').src = data.avatar;
    document.getElementById('avatar').alt = data.name;
    document.title = `${data.name} — ${data.title}`;

    // Nav logo
    document.querySelector('[data-name="logo"]').textContent = data.name.split(' ')[0];

    // About
    document.querySelector('[data-email="about"]').textContent = `Email: ${data.email}`;
    document.querySelector('[data-phone="about"]').textContent = `Телефон: ${data.phone}`;
    document.querySelector('[data-location="about"]').textContent = data.location;

    // Social links
    const socialContainer = document.querySelector('[data-social="about"]');
    socialContainer.innerHTML = Object.entries(data.social)
        .map(([key, url]) => {
            const icon = socialIcons[key] || '';
            return `<a href="${url}" target="_blank" rel="noopener" class="social-link" title="${key}">${icon}</a>`;
        })
        .join('');

    // Skills
    const skillsContainer = document.querySelector('[data-skills="skills"]');
    skillsContainer.innerHTML = data.skills
        .map(skill => `
            <div class="skill-card">
                <div class="skill-card__header">
                    <span class="skill-card__name">${skill.name}</span>
                    <span class="skill-card__level">${skill.level}%</span>
                </div>
                <div class="skill-card__bar">
                    <div class="skill-card__fill" style="width: 0%" data-width="${skill.level}%"></div>
                </div>
            </div>
        `)
        .join('');

    // Animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-card__fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 300);

    // Projects
    const projectsContainer = document.querySelector('[data-projects="projects"]');
    projectsContainer.innerHTML = data.projects
        .map(project => `
            <article class="project-card">
                <div class="project-card__header">
                    <div class="project-card__icon">${projectIcon}</div>
                    <a href="${project.link}" target="_blank" rel="noopener" class="project-card__link" title="Открыть проект">
                        ${externalIcon}
                    </a>
                </div>
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__desc">${project.description}</p>
                <div class="project-card__tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </article>
        `)
        .join('');

    // Contact
    const contactEmail = document.querySelector('[data-email="contact"]');
    contactEmail.textContent = data.email;
    contactEmail.href = `mailto:${data.email}`;

    // Footer
    document.querySelector('[data-name="footer"]').textContent = data.name;
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Mobile nav toggle
document.querySelector('.nav__toggle').addEventListener('click', function () {
    document.querySelector('.nav__links').classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav__links').classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Init
init();
