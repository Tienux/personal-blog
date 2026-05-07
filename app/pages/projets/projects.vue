<template>
    <div class="projects-page">
        <div class="header">
            <h1>Mes Projets</h1>
            <p class="subtitle">Découvrez mes réalisations</p>
        </div>
        
        <!-- Message si aucun projet -->
        <div v-if="projects.length === 0" class="no-projects">
            <p>Aucun projet publié pour le moment. Revenez bientôt !</p>
        </div>
        
        <div v-else class="projects-list">
            <ProjectCard
                v-for="(project, index) in projects"
                :key="index"
                :title="project.title"
                :excerpt="project.excerpt"
                :link="project.link"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { parseMarkdown } from 'scripts/markdownParser.js';

const projects = ref([]);

const markdownFiles = import.meta.glob('../../../contents/projects/*.md', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
});

for (const path in markdownFiles) {
    const markdownContent = markdownFiles[path];
    const parsed = parseMarkdown(markdownContent);
    
    // Filtrer seulement les publiés
    const isPublished = parsed.metaDonnees.published === 'true' || 
                       parsed.metaDonnees.published === true;
    
    if (isPublished) {
        projects.value.push({
            title: parsed.title,
            excerpt: parsed.excerpt,
            date: parsed.date,
            link: `/projets/${path.split('/').pop().replace('.md', '')}`
        });
    }
}

// Tri par date
projects.value.sort((a, b) => new Date(b.date) - new Date(a.date));
</script>

<style scoped>
.projects-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
    min-height: 60vh;
}

.header {
    text-align: center;
    margin-bottom: 4rem;
}

.header h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
}

.subtitle {
    font-size: 1.2rem;
    color: #888;
    font-weight: 300;
}

.no-projects {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
    font-size: 1.1rem;
}

.projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    .header h1 {
        font-size: 2rem;
    }
    
    .projects-list {
        grid-template-columns: 1fr;
    }
}
</style>