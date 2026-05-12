<template>
  <div class="projects-page">
    <div class="header">
      <h1>{{ $t('projects.title') }}</h1>
      <p class="subtitle">{{ $t('projects.subtitle') }}</p>
    </div>

    <!-- Message si aucun projet -->
    <div v-if="projects.length === 0" class="no-projects">
      <p>{{ $t('projects.no_projects') }}</p>
    </div>

    <div v-else class="projects-list">
      <ProjectCard
        v-for="project in projects"
        :key="project.link"
        :title="project.title"
        :excerpt="project.excerpt"
        :link="project.link"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { parseMarkdown } from 'scripts/markdownParser.js';

const { locale } = useI18n();
const projects = ref([]);

const markdownFiles = import.meta.glob('../../../contents/projects/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const localePath = (path) => {
  if (locale.value === 'fr') {
    return path;
  }
  return `/en${path}`;
};

const loadProjects = () => {
  projects.value = [];
  const langFolder = locale.value === 'fr' ? 'fr' : 'en';

  for (const path in markdownFiles) {
    // Extraire le dossier de langue et le filename
    const pathParts = path.split('/');
    const folder = pathParts[pathParts.length - 2]; // 'fr' ou 'en'
    const filename = pathParts[pathParts.length - 1].replace('.md', '');

    // Ne charger que les fichiers du bon dossier de langue
    if (folder === langFolder) {
      const markdownContent = markdownFiles[path];
      const parsed = parseMarkdown(markdownContent);

      // Filtrer seulement les publiés
      const isPublished =
        parsed.metaDonnees.published === 'true' || parsed.metaDonnees.published === true;

      if (isPublished) {
        projects.value.push({
          title: parsed.title,
          excerpt: parsed.excerpt,
          date: parsed.date,
          link: localePath(`/projets/${filename}`),
        });
      }
    }
  }

  // Tri par date
  projects.value.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Charger les projets au montage
loadProjects();

// Recharger si la langue change
watch(
  () => locale.value,
  () => {
    loadProjects();
  }
);
</script>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
  min-height: 60vh;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.header h1 {
  font-size: var(--font-size-6xl);
  font-weight: 700;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: var(--font-size-xl);
  color: #b8b8b8;
  font-weight: 300;
}

.no-projects {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  color: #a6a6a6;
  font-size: var(--font-size-lg);
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .projects-list {
    grid-template-columns: 1fr;
  }
}
</style>
