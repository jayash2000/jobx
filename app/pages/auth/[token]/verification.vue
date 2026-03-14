<template>
  <UPageSection>
    <UPageCard class="flex flex-col gap-4 items-center" spotlight>
      <section class="text-center text-emerald-400">
        <Icon name="i-lucide-badge-alert" size="60" class="text-info" />
      </section>

      <h1 class="text-3xl font-bold text-center mb-2">
        <span class="text-accent-foreground"> Verify Code </span>
      </h1>

      <article class="space-y-6 text-center">
        <p>Click the button below to verify your code.</p>

        <form @submit.prevent="handleVerification">
          <UButton
            type="submit"
            variant="outline"
            size="xl"
            :loading="authStore.loading"
            class="cursor-pointer"
          >
            Verify
          </UButton>
        </form>
      </article>
    </UPageCard>
  </UPageSection>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "misc",
});

const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();

const handleVerification = async () => {
  await authStore.verifyToken(route.params?.token as string);

  if (authStore.error) {
    toast.add({
      title: "Error!",
      description: authStore.error,
      icon: "i-lucide-circle-x",
      color: "error",
    });

    return;
  }

  toast.add({
    title: "Success!",
    description: authStore.response.message,
    icon: "i-lucide-thumbs-up",
    color: "success",
  });

  return navigateTo("/auth/login");
};
</script>
