<template>
  <UPageSection>
    <div>Home Page</div>

    <UButton
      class="w-fit cursor-pointer"
      trailing-icon="i-lucide-log-out"
      variant="outline"
      color="error"
      loading-auto
      @click="() => onLogout() as Promise<void>"
    >
      Logout
    </UButton>
  </UPageSection>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const toast = useToast();

const onLogout = async () => {
  await authStore.logout();

  toast.add({
    title: "Success!",
    description: authStore.response.message,
    icon: "i-lucide-thumbs-up",
    color: "success",
  });

  return navigateTo("/auth/login");
};
</script>
