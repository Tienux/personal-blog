<template>
    <div class="blogs-page">
        <h1>Article blog</h1>
        <div class="blogs-list">
            <BlogCard
                v-for="(blog, index) in blogs"
                :key="index"
                :title="blog.title"
                :excerpt="blog.excerpt"
                :date="blog.date"
                :link="blog.link"
            />
        </div>
    </div>
</template>

<script setup>
import { parseMarkdown } from 'scripts/markdownParser.js';

const blogs = ref([]);

const markdownFiles = import.meta.glob('../../../contents/blog/*.md', { query: '?raw', import: 'default', eager: true });

console.log('Fichiers trouvés:', markdownFiles);
console.log('Nombre de fichiers:', Object.keys(markdownFiles).length);

for (const path in markdownFiles) {
    const markdownContent = markdownFiles[path];
    console.log('Path:', path);
    console.log('Content:', markdownContent);
    const parsed = parseMarkdown(markdownContent);
    console.log('Parsed:', parsed);
    
    blogs.value.push({
        title: parsed.title,
        excerpt: parsed.excerpt,
        date: parsed.date,
        link: `/blog/${path.split('/').pop().replace('.md', '')}`
    });
}

blogs.value.sort((a, b) => new Date(b.date) - new Date(a.date));
</script>