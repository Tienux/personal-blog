<template>
  <div class="about">
    <h1>{{ $t('about.title') }}</h1>
    <p>{{ $t('about.intro') }}</p>
    <h2>{{ $t('about.journey_title') }}</h2>
    <p>{{ $t('about.journey_text') }}</p>
    <h2>{{ $t('about.blog_title') }}</h2>
    <p>
      {{ $t('about.blog_text') }}
      <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons CC BY license</a>
    </p>
    <h2>{{ $t('about.skills_title') }}</h2>
    <p>{{ $t('about.skills_languages') }}<br /><br />{{ $t('about.skills_frameworks') }}</p>
    <h2>{{ $t('about.career_title') }}</h2>
    <p>{{ $t('about.career_1') }}</p>
    <p>{{ $t('about.career_2') }}</p>
    <p>{{ $t('about.career_3') }}</p>
    <h2>{{ $t('about.other_title') }}</h2>
    <p>
      {{ $t('about.other_text') }}
      <br /><br />
      {{ $t('about.nuxt') }}
    </p>
  </div>
</template>

<style>
.about {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-size: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: justify;
  line-height: 1.6;
}

.about h2 {
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  font-size: 1.8rem;
}

.about h2:first-of-type {
  margin-top: 0;
}

.about p {
  margin-bottom: 0.8rem;
  line-height: 1.7;
}

.about a {
  font-weight: bold;
  color: var(--color-accent);
  text-decoration: underline;
  transition: color var(--transition-normal);
}

.about a:hover {
  color: var(--color-accent-hover);
}

@media (max-width: 768px) {
  .about {
    margin: 2rem auto;
    padding: 0 1.5rem;
    text-align: left;
    line-height: 1.75;
  }

  .about p {
    line-height: 1.75;
  }

  .about h2 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }
}
</style>
