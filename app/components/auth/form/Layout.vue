<template>
  <section
    class="lg:max-w-xl w-full flex flex-col items-center gap-6 bg-card border border-border lg:rounded-md p-8"
  >
    <NuxtImg
      v-if="showLogo"
      src="/logo.svg"
      alt="App Logo"
      class="w-30 mx-auto lg:hidden"
    />

    <span class="sr-only">App logo</span>

    <!-- (e.g. Create account) -->
    <h1 class="text-3xl font-extrabold">{{ title }}</h1>

    <!-- (e.g. Form description) -->
    <p class="text-muted-foreground text-sm -mt-4">
      {{ description }}
    </p>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 w-full"
      @submit="handleSubmit"
    >
      <section class="py-4 px-2 space-y-6 max-h-[60vh] overflow-y-auto">
        <AuthFormGroup
          v-for="field in fields"
          :key="field.id"
          :label="field.label"
          :name="field.name"
          :type="field.type"
          v-model="state[field.name]"
        />
      </section>

      <p
        v-if="legalPrefix"
        class="text-muted-foreground text-xs px-2 text-justify"
      >
        {{ legalPrefix }}
        <!-- (e.g. By creating your account, you ...) -->

        <NuxtLink
          to="/"
          class="text-primary hover:underline hover:underline-offset-2 w-fit"
        >
          Terms of Service
        </NuxtLink>

        and

        <NuxtLink
          to="/"
          class="text-primary hover:underline hover:underline-offset-2 w-fit"
        >
          Privacy Policy
        </NuxtLink>
        .

        {{ legalSuffix }}
        <!-- (e.g. and ...) -->
      </p>

      <UButton
        type="submit"
        class="w-full justify-center cursor-pointer mt-4"
        :loading="loading || false"
      >
        {{ btnText }}
        <!-- (e.g. Create account) -->
      </UButton>
    </UForm>

    <div v-if="footerText && footerLink && footerLinkText" class="text-sm">
      {{ footerText }}
      <!-- (e.g. Already/Don't have an account?) -->
      <NuxtLink
        :to="
          footerLink
          // (e.g. /auth/login)
        "
        class="text-primary hover:underline hover:underline-offset-2 w-fit"
      >
        <!-- (e.g. Login/Register) -->
        {{ footerLinkText }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { AuthFormLayoutProps } from "~/types/auth.type";

defineProps<AuthFormLayoutProps>();

const emit = defineEmits(["submit"]);

const handleSubmit = (event: FormSubmitEvent<any>) => {
  emit("submit", event);
};
</script>
