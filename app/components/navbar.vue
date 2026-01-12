<template>
    <nav class="navbar">
        <div class="navbar-container">
            <NuxtLink class="navbar-item" to="/">Home</NuxtLink>
            <NuxtLink class="navbar-item" to="/blog">Blog</NuxtLink>
            <NuxtLink class="navbar-item" to="/about">About</NuxtLink>
            <NuxtLink class="navbar-item" to="/contact">Contact</NuxtLink>
        </div>
    </nav>
</template>

<style scoped>
  
.navbar {
  background-color: #292929;
    padding: 1rem 0;
  
  
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
}


.navbar-item:hover {
  color: #ff6600;
  background-color: #0f0f0f;
  
}


</style>