<template>
    <nav class="navbar">
        <div class="navbar-container">
            <NuxtLink class="navbar-item" to="/">Home</NuxtLink>
            <NuxtLink class="navbar-item" to="/blog">Blog</NuxtLink>
            <NuxtLink class="navbar-item" to="/projects">Projets</NuxtLink>
            <NuxtLink class="navbar-item" to="/about">About</NuxtLink>
        </div>
    </nav>
</template>

<style scoped>
  
.navbar {
  background-color: #292929;
  padding: 1rem 0;
  overflow: hidden;
}

.navbar-container {
  display: flex;
  justify-content: right;
  margin-right: 2rem;
}

.navbar-item {
  color: #ffffff;
  text-decoration: none;
  margin: 0 1rem;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  display: flex;
  vertical-align: middle;
  align-items: center;
  font-size: large;
  position: relative;
  transition: transform 0.2s ease, color 0.2s ease;
}

.navbar-item::before {
  content: '';
  position: absolute;
  top: -1rem;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% + 2rem);
  background-color: #0f0f0f;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
}

.navbar-item:hover {
  color: #ff6600;
  transform: scale(1.1);
}

.navbar-item:hover::before {
  opacity: 1;
}


</style>