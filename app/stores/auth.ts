import type { ApiResponse } from "~/types/auth.type";
import type { LoginSchema, RegisterSchema } from "~~/shared/schemas/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null as string | null,

    response: {} as ApiResponse,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },

    setError(error: unknown) {
      this.error =
        (error as any)?.data.message ||
        (error as Error)?.message ||
        "Something went wrong!!!";
    },

    init() {
      this.setLoading(true);
      this.error = null;
    },

    async register(body: Omit<RegisterSchema, "confirmPassword">) {
      this.init();

      try {
        const res = await $fetch("/api/auth/register", {
          method: "POST",
          body,
        });

        this.response = res;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async login(body: LoginSchema) {
      this.init();

      try {
        const res = await $fetch("/api/auth/login", { method: "POST", body });
        this.response = res;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async logout() {
      this.init();

      try {
        const res = await $fetch("/api/auth/logout", { method: "DELETE" });
        this.response = res;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
});
