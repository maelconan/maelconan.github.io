// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
    highlightCurrentPage();
    initializeFeaturedProjects();
});

// Initialize header functionality
function initializeHeader() {
    // Add scroll event listener for header styling
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Featured projects data (à remplacer par vos projets)
const featuredProjects = [
    {
        title: "Projet Computer Vision",
        description: "Détection d'objets en temps réel avec CUDA et C++",
        technologies: ["CUDA", "C++", "Computer Vision"],
        image: "path/to/image.jpg",
        link: "/pages/projects/computer-vision.html"
    },
    // Ajoutez d'autres projets ici
];

// Initialize featured projects section
function initializeFeaturedProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    featuredProjects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsGrid.appendChild(projectElement);
    });
}

// Create project element
function createProjectElement(project) {
    const article = document.createElement('article');
    article.className = 'project-card fade-in';
    
    article.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" />
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <a href="${project.link}" class="project-link">En savoir plus</a>
        </div>
    `;

    return article;
}

// Export functions for use in other modules
export {
    initializeHeader,
    highlightCurrentPage,
    initializeFeaturedProjects
};