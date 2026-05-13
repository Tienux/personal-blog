<template>
  <div class="project-page">
    <article v-if="project">
      <div class="project-header">
        <h1>{{ project.title }}</h1>
        <div class="meta">
          <span class="date" v-if="project.date">📅 {{ project.date }}</span>
        </div>
      </div>
      <div class="content" v-html="project.content"></div>
      <div class="back-link">
        <NuxtLink :to="localePath(ROUTES.PROJECTS)">← {{ $t('projects.back') }}</NuxtLink>
      </div>
    </article>
    <div v-else class="not-found">
      <h2>😕 {{ $t('projects.not_found') }}</h2>
      <NuxtLink :to="localePath(ROUTES.PROJECTS)">{{ $t('projects.back') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { parseMarkdown } from 'scripts/markdownParser.js';
import { ROUTES } from 'constants/routes';

const route = useRoute();
const { locale, t } = useI18n();
const runtimeConfig = useRuntimeConfig();

const project = ref(null);

const seoTitle = computed(() => {
  if (project.value?.title) {
    return project.value.title;
  }

  return t('seo.project_not_found_title');
});

const seoDescription = computed(() => {
  if (project.value?.title) {
    return t('seo.project_detail_description', { title: project.value.title });
  }

  return t('seo.project_not_found_description');
});

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogImage: () => `${runtimeConfig.public.siteUrl}${runtimeConfig.public.defaultOgImage}`,
  ogType: 'article',
});

const localePath = (path) => {
  if (locale.value === 'fr') {
    return path;
  }
  return `/en${path}`;
};

const loadProject = (slug) => {
  // Construire le chemin selon la locale
  const langFolder = locale.value === 'fr' ? 'fr' : 'en';

  const markdownFiles = import.meta.glob('../../../contents/projects/*/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  });

  for (const path in markdownFiles) {
    // Extraire le filename et vérifier le dossier de langue
    const pathParts = path.split('/');
    const folder = pathParts[pathParts.length - 2]; // 'fr' ou 'en'
    const filename = pathParts[pathParts.length - 1].replace('.md', '');

    // Charger uniquement si on est dans le bon dossier de langue ET le bon slug
    if (folder === langFolder && filename === slug) {
      const markdownContent = markdownFiles[path];
      const parsed = parseMarkdown(markdownContent);

      // Vérifier si l'article est publié
      const isPublished =
        parsed.metaDonnees.published === 'true' || parsed.metaDonnees.published === true;

      if (isPublished) {
        project.value = parsed;
      } else {
        project.value = null;
      }
      return;
    }
  }

  // Si pas trouvé
  project.value = null;
};

// Charger au montage
loadProject(route.params.slug);

// Recharger si le slug ou la locale change
watch(
  () => [route.params.slug, locale.value],
  ([newSlug]) => {
    if (newSlug) {
      loadProject(newSlug);
    }
  }
);
</script>

<style scoped>
.project-page {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
}

.project-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
}

.project-header h1 {
  font-size: var(--font-size-6xl);
  font-weight: 700;
  color: var(--color-text-light);
  margin-bottom: 1rem;
  line-height: var(--line-height-tight);
}

.meta {
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  font-weight: 400;
}

.content {
  line-height: var(--line-height-relaxed);
  color: var(--color-text-body);
  font-size: var(--font-size-lg);
}

.content :deep(h1) {
  font-size: var(--font-size-5xl);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-light);
  font-weight: 600;
}

.content :deep(h2) {
  font-size: var(--font-size-4xl);
  margin-top: 2.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-light);
  font-weight: 600;
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-sm);
}

.content :deep(h3) {
  font-size: var(--font-size-2xl);
  margin-top: var(--spacing-md);
  margin-bottom: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.content :deep(p) {
  margin-bottom: 1.2rem;
}

.content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: var(--spacing-md) 0;
  border-radius: 8px;
}

.content :deep(code) {
  background-color: var(--color-bg-code);
  color: var(--color-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
}

.content :deep(strong) {
  color: var(--color-text-light);
  font-weight: 600;
}

.content :deep(em) {
  color: var(--color-text-gray);
  font-style: italic;
}

.content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}

.content :deep(a:hover) {
  text-decoration: underline;
}

.back-link {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.back-link a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.back-link a:hover {
  color: var(--color-primary-hover);
}

.not-found {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
}

.not-found h2 {
  color: var(--color-text-light);
  font-size: var(--font-size-5xl);
  margin-bottom: var(--spacing-md);
}

.not-found a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  display: inline-block;
}

.not-found a:hover {
  background: #667eea;
  color: #ffffff;
}

@media (max-width: 768px) {
  .project-page {
    padding: 2rem 1rem;
  }

  .project-header h1 {
    font-size: 1.8rem;
  }

  .content {
    font-size: 1rem;
  }
}
</style>
