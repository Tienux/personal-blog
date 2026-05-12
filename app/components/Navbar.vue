<template>
  <nav class="navbar">
    <div class="navbar-container">
      <button
        class="navbar-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-navigation"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="navbar-toggle-line"></span>
        <span class="navbar-toggle-line"></span>
        <span class="navbar-toggle-line"></span>
      </button>

      <div id="primary-navigation" class="navbar-links" :class="{ open: isMenuOpen }">
        <NuxtLink class="navbar-item" :to="localePath(ROUTES.HOME)" @click="closeMenu">{{
          $t('nav.home')
        }}</NuxtLink>
        <NuxtLink class="navbar-item" :to="localePath(ROUTES.PROJECTS)" @click="closeMenu">
          {{ $t('nav.projects') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" :to="localePath(ROUTES.ABOUT)" @click="closeMenu">{{
          $t('nav.about')
        }}</NuxtLink>
      </div>

      <!-- Language Selector -->
      <div class="language-selector">
        <button
          class="lang-button"
          :class="{ active: locale === 'fr' }"
          @click="switchLanguage('fr')"
          aria-label="Français"
        >
          FR
        </button>
        <span class="lang-separator">|</span>
        <button
          class="lang-button"
          :class="{ active: locale === 'en' }"
          @click="switchLanguage('en')"
          aria-label="English"
        >
          EN
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { ROUTES } from 'constants/routes';

const { locale } = useI18n();
const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const localePath = (path) => {
  if (locale.value === 'fr') {
    return path;
  }
  return `/en${path}`;
};

const switchLanguage = (lang) => {
  const currentPath = router.currentRoute.value.path;
  let newPath = currentPath;

  // Remove locale prefix if present
  if (currentPath.startsWith('/en/') || currentPath === '/en') {
    newPath = currentPath.slice(3) || '/';
  }

  // Add new locale prefix if not French
  if (lang === 'en') {
    newPath = `/en${newPath}`;
  }

  router.push(newPath);
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-bg-navbar);
  padding: var(--spacing-sm) 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin: 0 var(--spacing-md);
  position: relative;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  padding: 0.55rem;
  margin-left: auto;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.navbar-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-1px);
}

.navbar-toggle-line {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: var(--color-text-light);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-item {
  color: var(--color-text-light);
  text-decoration: none;
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

@media (max-width: 768px) {
  .navbar-container {
    justify-content: flex-end;
    margin-right: var(--spacing-sm);
  }

  .navbar-toggle {
    display: inline-flex;
  }

  .navbar-links {
    display: none;
    position: absolute;
    top: calc(100% + 0.75rem);
    right: 0;
    min-width: 220px;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    background: var(--color-bg-navbar);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
    z-index: 20;
  }

  .navbar-links.open {
    display: flex;
  }

  .navbar-item {
    width: 100%;
    justify-content: flex-start;
    margin: 0;
    padding: 0.85rem 1rem;
    border-radius: 0.75rem;
  }

  .navbar-item::before {
    top: 0;
    height: 100%;
    border-radius: 0.75rem;
  }
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.lang-button {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--color-text-light);
  padding: 0.4rem 0.7rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.lang-button:hover {
  border-color: rgba(255, 255, 255, 0.6);
  color: var(--color-accent);
}

.lang-button.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg-navbar);
}

.lang-separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .language-selector {
    margin-left: auto;
    padding-left: 0;
    border-left: none;
    gap: 0.3rem;
  }

  .lang-button {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }

  .lang-separator {
    display: none;
  }
}
</style>
