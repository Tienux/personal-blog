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
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--spacing-md);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  box-shadow: var(--shadow-sm);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-light);
}

.project-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: var(--color-text-light);
  font-weight: 600;
}

.project-card p {
  color: var(--color-text-gray);
  line-height: var(--line-height-normal);
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.project-card :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: color var(--transition-normal);
}

.project-card :deep(a:hover) {
  color: var(--color-primary-hover);
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
