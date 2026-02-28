<template>
  <main class="flex flex-col lg:flex-row gap-2 lg:justify-between">
    <section
      class="hidden max-w-2xl w-full min-h-screen bg-sidebar lg:flex flex-col justify-center px-16 gap-4"
    >
      <NuxtImg src="/logo.svg" class="h-40 w-fit" />

      <article class="flex flex-col gap-4 pl-4">
        <h3 class="text-3xl font-bold">Find Your Next Opportunity</h3>

        <p class="text-justify text-muted-foreground">
          Connect with top employers, explore thousands of job listings, and
          take the next step in your career. Sign in to continue or create an
          account to get started.
        </p>
      </article>
    </section>

    <section
      class="flex justify-center lg:items-center min-h-screen w-full gap-4"
    >
      <slot />
    </section>
  </main>
</template>

<script setup lang="ts"></script>
