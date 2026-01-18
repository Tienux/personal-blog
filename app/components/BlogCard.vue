<template>
    <div class="blog-card">
        <h2>{{ title }}</h2>
        <p>{{ excerpt }}</p>
        <a :href="link">Read more</a>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    excerpt: string;
    link: string;
}>();
</script>
<style scoped>
.blog-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  transition: box-shadow 0.3s ease;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 50rem;
  max-height: 30rem;
  margin-left: auto;
  margin-right: auto;
}
.blog-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.blog-card h2 {
  margin: 0 0 8px 0;
}
.blog-card p {
  color: #555;
}
.blog-card a {
  color: #007BFF;
  text-decoration: none;
}
</style>