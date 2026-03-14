import type { ApiResponse, User } from "~/types/auth.type";
import type {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "~~/shared/schemas/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null as string | null,

    response: {} as ApiResponse,

    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

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

    setUser(value: User | null) {
      this.user = value;
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
        this.setUser(null);
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async verifyToken(token: string) {
      this.init();

      try {
        const res = await $fetch(`/api/auth/verify?token=${token}`, {
          method: "GET",
        });

        this.response = res;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async checkVerification() {
      this.init();

      try {
        const headers = import.meta.server
          ? useRequestHeaders(["cookie"])
          : undefined;

        const res = await $fetch(`/api/auth/me`, {
          headers,
        });

        const { success, message, user } = res;
        this.response = { success, message };
        this.setUser(user);
      } catch (error) {
        this.setUser(null);
      } finally {
        this.setLoading(false);
      }
    },

    async forgotPassword(body: ForgotPasswordSchema) {
      this.init();

      try {
        const res = await $fetch("/api/auth/forgot-password", {
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

    async resetPassword(token: string, body: ResetPasswordSchema) {
      this.init();

      try {
        const res = await $fetch(`/api/auth/reset-password?token=${token}`, {
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
  },
});
