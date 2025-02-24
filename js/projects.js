// Mettre à jour le tri
function updateSort(event) {
    state.currentSort = event.target.value;
    sortProjects();
}

// Filtrer les projets
function filterProjects() {
    state.filteredProjects = state.projects.filter(project => {
        const matchCategory = !state.currentFilters.category || 
            project.categories.includes(state.currentFilters.category);
        const matchTechnology = !state.currentFilters.technology || 
            project.technologies.includes(state.currentFilters.technology);
        return matchCategory && matchTechnology;
    });
    
    sortProjects();
}

// Trier les projets
function sortProjects() {
    state.filteredProjects.sort((a, b) => {
        switch (state.currentSort) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
    
    renderProjects();
}

// Rendre les projets dans le DOM
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const template = document.getElementById('project-card-template');
    
    // Vider la grille
    projectsGrid.innerHTML = '';
    
    // Ajouter les projets filtrés et triés
    state.filteredProjects.forEach((project, index) => {
        const projectCard = template.content.cloneNode(true);
        
        // Remplir les données du projet
        const img = projectCard.querySelector('img');
        img.src = project.thumbnail;
        img.alt = project.title;
        
        projectCard.querySelector('.project-title').textContent = project.title;
        projectCard.querySelector('.project-description').textContent = project.shortDescription;
        
        // Ajouter les technologies
        const techContainer = projectCard.querySelector('.project-technologies');
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
        
        // Ajouter les catégories
        const categoryContainer = projectCard.querySelector('.project-categories');
        project.categories.forEach(category => {
            const categoryTag = document.createElement('span');
            categoryTag.className = 'category-tag';
            categoryTag.textContent = category;
            categoryContainer.appendChild(categoryTag);
        });
        
        // Configurer le lien "En savoir plus"
        const link = projectCard.querySelector('.project-link');
        link.href = `/pages/project-detail.html?id=${project.id}`;
        
        // Ajouter un délai pour l'animation
        const article = projectCard.querySelector('.project-card');
        article.style.animationDelay = `${index * 0.1}s`;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Fonction pour obtenir les paramètres de l'URL (utile pour la page de détail)
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

// Exporter les fonctions pour utilisation dans d'autres modules
export {
    state,
    loadProjects,
    filterProjects,
    sortProjects,
    getURLParams
}; État global pour stocker les projets et les filtres
let state = {
    projects: [],
    filteredProjects: [],
    categories: [],
    technologies: [],
    currentFilters: {
        category: '',
        technology: ''
    },
    currentSort: 'date-desc'
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects();
    initializeFilters();
    initializeSortingAndFiltering();
    renderProjects();
});

// Charger les projets depuis le JSON
async function loadProjects() {
    try {
        const response = await fetch('../data/projects.json');
        const data = await response.json();
        state.projects = data.projects;
        state.filteredProjects = [...state.projects];
        state.categories = data.categories;
        state.technologies = data.technologies;
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
}

// Initialiser les filtres
function initializeFilters() {
    // Remplir le filtre des catégories
    const categoryFilter = document.getElementById('category-filter');
    state.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Remplir le filtre des technologies
    const technologyFilter = document.getElementById('technology-filter');
    state.technologies.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech;
        option.textContent = tech;
        technologyFilter.appendChild(option);
    });
}

// Initialiser le tri et le filtrage
function initializeSortingAndFiltering() {
    // Écouteurs d'événements pour les filtres
    document.getElementById('category-filter').addEventListener('change', updateFilters);
    document.getElementById('technology-filter').addEventListener('change', updateFilters);
    document.getElementById('sort-select').addEventListener('change', updateSort);
}

// Mettre à jour les filtres
function updateFilters(event) {
    const { id, value } = event.target;
    if (id === 'category-filter') {
        state.currentFilters.category = value;
    } else if (id === 'technology-filter') {
        state.currentFilters.technology = value;
    }
    filterProjects();
}

// Mettre à jour le tri