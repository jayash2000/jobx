<template>
  <AuthFormLayout
    title="Forgot Your Password?"
    description="No worries! Enter your email address and we’ll send you a link to reset your password."
    :schema="forgotPasswordSchema"
    :state="state"
    :fields="forgotPasswordFields"
    btn-text="Send Reset Link"
    footer-link="/auth/login"
    footer-link-text="Back to Sign In"
    @submit="onSubmit"
    :loading="authStore.loading"
  />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "~~/shared/schemas/auth";

definePageMeta({
  layout: "auth",
});

const state = reactive<ForgotPasswordSchema>({
  email: "",
});

const authStore = useAuthStore();
const toast = useToast();
const { reset } = useMyResetForm(state);

const onSubmit = async (event: FormSubmitEvent<ForgotPasswordSchema>) => {
  //   console.log("Form Data:", event.data);
  await authStore.forgotPassword(event.data);

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
    title: "Check Your Email",
    description: authStore.response.message,
    icon: "i-lucide-thumbs-up",
    color: "success",
  });
};
</script>
