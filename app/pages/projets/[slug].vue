<template>
    <div class="project-page">
        <article v-if="project">
            <div class="project-header">
                <h1>{{ project.title }}</h1>
                <div class="meta">
                    <span class="date" v-if="project.date">📅 {{ project.date }}</span>
                </div>
            </div>
            <div class="content" v-html="project.content"></div>
            <div class="back-link">
                <a href="/projets/projects">← Retour aux projets</a>
            </div>
        </article>
        <div v-else class="not-found">
            <h2>😕 Projet non trouvé</h2>
            <a href="/projets/projects">Retour aux projets</a>
        </div>
    </div>
</template>

<script setup>
import { parseMarkdown } from 'scripts/markdownParser.js';

const route = useRoute();
const slug = route.params.slug;

const project = ref(null);

const markdownFiles = import.meta.glob('../../../contents/projects/*.md', { query: '?raw', import: 'default', eager: true });

for (const path in markdownFiles) {
    const filename = path.split('/').pop().replace('.md', '');
    
    if (filename === slug) {
        const markdownContent = markdownFiles[path];
        project.value = parseMarkdown(markdownContent);
        break;
    }
}
</script>

<style scoped>
.project-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

.project-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #3a3a3a;
}

.project-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.meta {
    color: #888;
    font-size: 1rem;
    font-weight: 400;
}

.content {
    line-height: 1.8;
    color: #e0e0e0;
    font-size: 1.1rem;
}

.content :deep(h1) {
    font-size: 2rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
    color: #ffffff;
    font-weight: 600;
}

.content :deep(h2) {
    font-size: 1.6rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
    font-weight: 600;
    border-left: 4px solid #667eea;
    padding-left: 1rem;
}

.content :deep(h3) {
    font-size: 1.3rem;
    margin-top: 2rem;
    margin-bottom: 0.8rem;
    color: #cccccc;
    font-weight: 500;
}

.content :deep(p) {
    margin-bottom: 1.2rem;
}

.content :deep(img) {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border-radius: 8px;
}

.content :deep(code) {
    background-color: #2a2a2a;
    color: #667eea;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.95em;
}

.content :deep(strong) {
    color: #ffffff;
    font-weight: 600;
}

.content :deep(em) {
    color: #b0b0b0;
    font-style: italic;
}

.content :deep(a) {
    color: #667eea;
    text-decoration: none;
}

.content :deep(a:hover) {
    text-decoration: underline;
}

.back-link {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #3a3a3a;
    text-align: center;
}

.back-link a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
}

.back-link a:hover {
    color: #764ba2;
}

.not-found {
    text-align: center;
    padding: 4rem 2rem;
}

.not-found h2 {
    color: #ffffff;
    font-size: 2rem;
    margin-bottom: 2rem;
}

.not-found a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    padding: 0.8rem 1.5rem;
    border: 2px solid #667eea;
    border-radius: 8px;
    display: inline-block;
}

.not-found a:hover {
    background: #667eea;
    color: #ffffff;
}

@media (max-width: 768px) {
    .project-page {
        padding: 2rem 1rem;
    }
    
    .project-header h1 {
        font-size: 1.8rem;
    }
    
    .content {
        font-size: 1rem;
    }
}
</style>
