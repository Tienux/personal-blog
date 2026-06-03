<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  title: 'Etienne Portron - Portfolio & Blog',
  description: 'Portfolio et blog tech d\'Etienne Portron.',
  ogTitle: 'Etienne Portron - Portfolio & Blog',
  ogDescription: 'Portfolio et blog tech d\'Etienne Portron.',
  ogImage: `${runtimeConfig.public.siteUrl}${runtimeConfig.public.defaultOgImage}`,
  ogType: 'website',
});
</script>

<style>
@import 'style/main.scss';
</style>
