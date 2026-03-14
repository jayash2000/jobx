<template>
  <AuthFormLayout
    title="Create an Account"
    description="Enter your email below to create your account"
    :schema="registerSchema"
    :state="state"
    :fields="registerFields"
    btn-text="Create Account"
    legal-prefix="By creating an account, you agree to our"
    legal-suffix=", and consent to receive important account-related communications."
    footer-text="Already have an account?"
    footer-link="/auth/login"
    footer-link-text="Login"
    @submit="onSubmit"
    :loading="authStore.loading"
  />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { registerSchema, type RegisterSchema } from "~~/shared/schemas/auth";

definePageMeta({
  layout: "auth",
});

const state = reactive<RegisterSchema>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const authStore = useAuthStore();
const toast = useToast();
const { reset } = useMyResetForm(state);

const onSubmit = async (event: FormSubmitEvent<RegisterSchema>) => {
  // console.log("Form Data:", event.data);

  await authStore.register(event.data);

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
    description: authStore.response.message,
    icon: "i-lucide-thumbs-up",
    color: "success",
  });

  return navigateTo("/auth/login");
};
</script>
