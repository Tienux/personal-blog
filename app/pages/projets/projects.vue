<template>
    <div class="projects-page">
        <div class="header">
            <h1>Mes Projets</h1>
            <p class="subtitle">Découvrez mes réalisations</p>
        </div>
        <div class="projects-list">
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
import { parseMarkdown } from 'scripts/markdownParser.js';

const projects = ref([]);

const markdownFiles = import.meta.glob('../../../contents/projects/*.md', { query: '?raw', import: 'default', eager: true });

console.log('Fichiers trouvés:', markdownFiles);
console.log('Nombre de fichiers:', Object.keys(markdownFiles).length);

for (const path in markdownFiles) {
    const markdownContent = markdownFiles[path];
    console.log('Path:', path);
    console.log('Content:', markdownContent);
    const parsed = parseMarkdown(markdownContent);
    console.log('Parsed:', parsed);
    
    projects.value.push({
        title: parsed.title,
        excerpt: parsed.excerpt,
        date: parsed.date,
        link: `/projets/${path.split('/').pop().replace('.md', '')}`
    });
}

projects.value.sort((a, b) => new Date(b.date) - new Date(a.date));
</script>

<style scoped>
.projects-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

.header {
    text-align: center;
    margin-bottom: 4rem;
}

.header h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    background-clip: text;
    margin-bottom: 0.5rem;
}

.subtitle {
    font-size: 1.2rem;
    color: #888;
    font-weight: 300;
}

.projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

</style>