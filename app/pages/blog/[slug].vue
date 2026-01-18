<template>
    <article class="blog-article">
        <h1>{{ article.title }}</h1>
        <p class="date">{{ article.date }}</p>
        <div class="content" v-html="article.content"></div>
    </article>
</template>

<script setup>
import { parseMarkdown } from 'scripts/markdownParser.js';

const route = useRoute();
const slug = route.params.slug;

// Charger tous les fichiers markdown
const markdownFiles = import.meta.glob('../../../contents/blog/*.md', { query: '?raw', import: 'default', eager: true });

// Trouver le fichier correspondant au slug
const filePath = Object.keys(markdownFiles).find(path => path.includes(`${slug}.md`));

if (!filePath) {
    throw createError({ statusCode: 404, message: 'Article non trouvé' });
}

// Parser le contenu
const markdownContent = markdownFiles[filePath];
const article = parseMarkdown(markdownContent);
</script>