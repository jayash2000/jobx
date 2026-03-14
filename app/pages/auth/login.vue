<template>
  <AuthFormLayout
    title="Sign In to Your Account"
    description="Welcome back! Please enter your details to sign in"
    :schema="loginSchema"
    :state="state"
    :fields="loginFields"
    btn-text="Sign in"
    legal-prefix="By logging in, you agree to our"
    footer-text="Don't have an account?"
    footer-link="/auth/register"
    footer-link-text="Register"
    @submit="onSubmit"
    :loading="authStore.loading"
  />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { loginSchema, type LoginSchema } from "~~/shared/schemas/auth";

definePageMeta({
  layout: "auth",
});

const state = reactive<LoginSchema>({
  email: "",
  password: "",
});

const authStore = useAuthStore();
const toast = useToast();
const { reset } = useMyResetForm(state);

const onSubmit = async (event: FormSubmitEvent<LoginSchema>) => {
  await authStore.login(event.data);

  if (authStore.error) {
    toast.add({
      title: "Error!",
      description: authStore.error,
      icon: "i-lucide-circle-x",
      color: "error",
    });

    return;
  }

  reset();

  toast.add({
    title: "Success!",
    description: "Logged in successfully",
    icon: "i-lucide-thumbs-up",
    color: "success",
  });

  return navigateTo("/");
};
</script>
