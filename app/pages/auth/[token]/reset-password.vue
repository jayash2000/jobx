<template>
  <AuthFormLayout
    title="Reset Your Password"
    description="Please enter your new password below."
    :schema="resetPasswordSchema"
    :state="state"
    :fields="resetPasswordFields"
    btn-text="Reset Password"
    @submit="onSubmit"
    :loading="authStore.loading"
  />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  resetPasswordSchema,
  type ForgotPasswordSchema,
  type ResetPasswordSchema,
} from "~~/shared/schemas/auth";

definePageMeta({
  layout: "auth",
});

const state = reactive<ResetPasswordSchema>({
  password: "",
  confirmPassword: "",
});

const authStore = useAuthStore();
const route = useRoute();
const toast = useToast();

const { reset } = useMyResetForm(state);

const onSubmit = async (event: FormSubmitEvent<ResetPasswordSchema>) => {
  await authStore.resetPassword(route.params?.token as string, event.data);

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
    title: "Password Reset Successful",
    description: authStore.response.message,
    icon: "i-lucide-thumbs-up",
    color: "success",
  });

  return navigateTo("/auth/login");
};
</script>
