<script setup lang="ts">
const props = defineProps<{ error?: { statusCode?: number; message?: string } }>()
const error = props.error || {}
let t = (k: string) => k
let locale = { value: 'fr' }
try {
  // useI18n is available via @nuxtjs/i18n
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const i18n = useI18n()
  t = i18n.t
  locale = i18n.locale
} catch (e) {
  // fallback: keep simple strings
}
const homePath = () => (locale?.value === 'en' ? '/en' : '/')
</script>

<template>
  <div class="error-page">
    <main class="container">
      <section class="content">
        <h1 v-if="error.statusCode === 404">404 — {{ t('projects.not_found') }}</h1>
        <h1 v-else>{{ error.statusCode || 500 }} — {{ error.message || 'Erreur' }}</h1>
        <p v-if="error.statusCode === 404">{{ t('projects.not_found') }}</p>
        <p v-else class="muted">{{ error.message }}</p>
        <NuxtLink :to="homePath()" class="btn">{{ t('nav.home') }}</NuxtLink>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: var(--color-bg);
  color: var(--color-text-light);
  padding: var(--spacing-lg) 0;
  .container {
    padding: 0 var(--spacing-md);
    .content {
      max-width: 920px;
      margin: 0 auto;
      background: var(--color-bg-card);
      padding: 2.5rem 3rem;
      border-radius: 14px;
      box-shadow: var(--shadow-sm);
      text-align: center;
      h1 {
        font-size: var(--font-size-5xl);
        margin-bottom: 0.5rem;
        color: var(--color-text-light);
      }
      .muted {
        color: var(--color-text-muted-2);
        margin-bottom: 1rem;
      }
      .btn {
        display: inline-block;
        margin-top: 1.25rem;
        padding: 0.65rem 1.25rem;
        background: var(--color-accent);
        color: var(--color-text-light);
        border-radius: 999px;
        text-decoration: none;
        box-shadow: none; /* remove light/glow */
        transition: transform var(--transition-fast);
      }
      .btn:hover { transform: translateY(-2px); }
    }
  }
}
</style>
