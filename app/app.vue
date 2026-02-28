<script setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favico.svg" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "JobX";
const description =
  "Connect with top employers, explore thousands of job listings, and take the next step in your career. Sign in to continue or create an account to get started.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://www.github.com/nature.png",
  // twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  // twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
