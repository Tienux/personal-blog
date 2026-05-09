<template>
  <nav class="navbar">
    <div class="navbar-container">
      <NuxtLink class="navbar-item" :to="ROUTES.HOME">Home</NuxtLink>
      <NuxtLink class="navbar-item" :to="ROUTES.PROJECTS">Projects</NuxtLink>
      <NuxtLink class="navbar-item" :to="ROUTES.ABOUT">About</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { ROUTES } from 'constants/routes';
</script>

<style scoped>
.navbar {
  background-color: var(--color-bg-navbar);
  padding: var(--spacing-sm) 0;
  overflow: hidden;
}

.navbar-container {
  display: flex;
  justify-content: right;
  margin-right: var(--spacing-md);
}

.navbar-item {
  color: var(--color-text-light);
  text-decoration: none;
  margin: 0 var(--spacing-sm);
  font-weight: bold;
  padding: var(--spacing-xs) 0.75rem;
  display: flex;
  vertical-align: middle;
  align-items: center;
  font-size: large;
  position: relative;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.navbar-item::before {
  content: '';
  position: absolute;
  top: -1rem;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% + 2rem);
  background-color: var(--color-bg-navbar-hover);
  opacity: 0;
  transition: opacity var(--transition-slow);
  z-index: -1;
}

.navbar-item:hover {
  color: var(--color-accent);
  transform: scale(1.1);
}

.navbar-item:hover::before {
  opacity: 1;
}
</style>
