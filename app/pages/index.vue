<template>
  <div class="welcome">
    <section class="hero-copy">
      <p class="hero-kicker">{{ $t('hero.kicker') }}</p>
      <h1>{{ $t('hero.title') }}</h1>
      <p class="hero-text">
        {{ $t('hero.subtitle') }}
        <br /><br />
        {{ $t('hero.description') }}
      </p>

      <div class="hero-actions">
        <NuxtLink class="hero-button primary" :to="localePath(ROUTES.PROJECTS)">{{
          $t('buttons.projects')
        }}</NuxtLink>
        <NuxtLink class="hero-button secondary" :to="localePath(ROUTES.ABOUT)">{{
          $t('buttons.about')
        }}</NuxtLink>
      </div>
    </section>

    <aside class="hero-panel">
      <img :src="profileImage" alt="Profile picture" class="profile-img" />

      <div class="contact">
        <h3>{{ $t('contact.title') }}</h3>
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <a href="mailto:etienneportron@gmail.com">etienneportron@gmail.com</a>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
            <a href="https://github.com/Tienux">Tienux</a>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <a href="https://www.linkedin.com/in/etienne-portron-4b9645242/">Etienne Portron</a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<style>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  width: min(1200px, calc(100% - 2rem));
  min-height: calc(100vh - 88px);
  margin: 0 auto;
  padding: 3rem 0 2rem;
  color: white;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  max-width: 700px;
}

.hero-kicker {
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 4.8rem);
  font-weight: bold;
  line-height: 1.2;
}

.hero-text {
  font-size: clamp(1.05rem, 1.2vw, 1.2rem);
  font-weight: normal;
  margin: 0;
  line-height: 1.7;
  max-width: 640px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.85rem 1.3rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  transition:
    transform var(--transition-fast),
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.hero-button.primary {
  background: var(--color-accent);
  color: #111;
}

.hero-button.secondary {
  color: var(--color-text-light);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
}

.hero-button:hover {
  transform: translateY(-2px);
}

.hero-button.primary:hover {
  background: var(--color-accent-hover);
}

.hero-button.secondary:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-self: end;
  width: 100%;
  max-width: 420px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
}

.contact h3 {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.contact ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.95rem;
  color: var(--color-text-body);
}

.contact a {
  color: var(--color-text-light);
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.contact a:hover {
  color: var(--color-accent);
}

.profile-img {
  width: 180px;
  height: 180px;
  align-self: center;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
}

@media (min-width: 1024px) {
  .welcome {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
    align-items: center;
    column-gap: clamp(2rem, 5vw, 5rem);
    padding-top: 4rem;
    padding-bottom: 3rem;
  }

  .hero-copy {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .welcome {
    width: min(100%, calc(100% - 1.25rem));
    padding: 2rem 0 1.5rem;
    justify-content: flex-start;
  }

  .hero-copy {
    align-items: center;
    text-align: center;
    gap: 1.25rem;
  }

  .hero-copy h1 {
    font-size: 1.95rem;
  }

  .hero-text {
    font-size: 1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-panel {
    max-width: 100%;
    justify-self: stretch;
    padding: 1.25rem;
  }

  .profile-img {
    width: 130px;
    height: 130px;
  }
}

@media (max-width: 480px) {
  .hero-copy h1 {
    font-size: 1.7rem;
  }

  .hero-text {
    font-size: 0.95rem;
  }

  .contact {
    text-align: center;
  }

  .contact ul {
    align-items: center;
  }

  .contact li {
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
  }

  .hero-button {
    width: 100%;
  }
  .contact h3 {
    font-size: 1.1rem;
  }
}
</style>

<script setup>
import { useI18n } from 'vue-i18n';
import { ROUTES } from 'constants/routes';
import profileImage from 'images/placeholder.jpg';

const { locale, t } = useI18n();
const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  title: () => t('seo.home_title'),
  description: () => t('seo.home_description'),
  ogTitle: () => t('seo.home_title'),
  ogDescription: () => t('seo.home_description'),
  ogImage: () => `${runtimeConfig.public.siteUrl}${runtimeConfig.public.defaultOgImage}`,
  ogType: 'website',
});

const localePath = (path) => {
  if (locale.value === 'fr') {
    return path;
  }
  return `/en${path}`;
};
</script>
