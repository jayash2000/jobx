<template>
  <section
    class="w-full lg:max-w-xl flex flex-col items-center gap-5 sm:gap-6 bg-card border border-border lg:rounded-md p-5 sm:p-6 lg:p-8"
  >
    <NuxtImg
      src="/logo.svg"
      alt="App Logo"
      class="w-24 sm:w-28 mx-auto lg:hidden"
    />

    <span class="sr-only">App logo</span>

    <!-- (e.g. Create account) -->
    <h1 class="text-2xl sm:text-3xl font-extrabold text-center">{{ title }}</h1>

    <!-- (e.g. Form description) -->
    <p
      class="text-muted-foreground text-center max-w-md text-sm sm:text-base -mt-2 sm:-mt-3"
    >
      {{ description }}
    </p>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 w-full"
      @submit="handleSubmit"
    >
      <section
        class="py-2 sm:py-4 flex flex-col gap-5 sm:gap-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto"
      >
        <AuthFormGroup
          v-for="field in fields"
          :key="field.id"
          :label="field.label"
          :name="field.name"
          :type="field.type"
          v-model="state[field.name]"
        />

        <section className="text-end -mt-2 sm:-mt-4">
          <UButton
            v-if="route.path === '/auth/login'"
            variant="link"
            class="justify-end hover:underline hover:underline-offset-2"
            to="/auth/forgot-password"
          >
            Forgot Password?
          </UButton>
        </section>
      </section>

      <p
        v-if="legalPrefix"
        class="text-muted-foreground text-xs sm:text-sm px-1 sm:px-2 text-justify"
      >
        {{ legalPrefix }}
        <!-- (e.g. By creating your account, you ...) -->

        <NuxtLink
          to="/"
          class="text-primary hover:underline hover:underline-offset-2"
        >
          Terms of Service
        </NuxtLink>

        and

        <NuxtLink
          to="/"
          class="text-primary hover:underline hover:underline-offset-2"
        >
          Privacy Policy
        </NuxtLink>
        .

        {{ legalSuffix }}
        <!-- (e.g. and ...) -->
      </p>

      <UButton
        type="submit"
        class="w-full justify-center cursor-pointer"
        :class="{
          'mt-4': ['/auth/login', '/auth/register'].includes(route.path),
        }"
        :loading="(loading && isSubmitBtnClicked) || false"
      >
        {{ btnText }}
        <!-- (e.g. Create account) -->
      </UButton>
    </UForm>

    <div
      v-if="footerLink && footerLinkText"
      class="text-xs sm:text-sm text-center"
    >
      {{ footerText }}
      <!-- (e.g. Already/Don't have an account?) -->
      <NuxtLink
        :to="
          footerLink
          // (e.g. /auth/login)
        "
        class="text-primary hover:underline hover:underline-offset-2"
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

const isSubmitBtnClicked = ref(false);

const route = useRoute();

const handleSubmit = (event: FormSubmitEvent<any>) => {
  event.preventDefault()
  emit("submit", event);
  isSubmitBtnClicked.value = true;
};
</script>
