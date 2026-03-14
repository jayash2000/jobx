export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    await authStore.checkVerification();
  }

  const isAuthPage = to.path.startsWith("/auth");

  if (!authStore.isAuthenticated && !isAuthPage) {
    return navigateTo("/auth/login");
  }

  if (authStore.isAuthenticated && isAuthPage) {
    return navigateTo("/");
  }
});
