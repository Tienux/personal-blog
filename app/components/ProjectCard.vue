<template>
    <div class="project-card">
        <h2>{{ title }}</h2>
        <p>{{ excerpt }}</p>
        <NuxtLink :to="link">Voir le projet</NuxtLink>
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
.project-card {
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  border-color: #667eea;
}

.project-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 600;
}

.project-card p {
  color: #b0b0b0;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

  .project-card :deep(a) {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    transition: color 0.3s ease;
  }

  .project-card :deep(a:hover) {
    color: #764ba2;
  }

  .project-card :deep(a::after) {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  .project-card :deep(a:hover::after) {
    transform: translateX(5px);
  }
</style>
