import type { LoginSchema, RegisterSchema } from "~~/shared/schemas/auth";

export interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormState {
  email: string;
  password: string;
}

export interface AuthFormLayoutProps {
  title: string;
  schema: any;
  state: Record<string, any>;
  fields: readonly any[];
  btnText: string;
  loading: boolean;
  description?: string;
  legalPrefix?: string;
  legalSuffix?: string;
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
  showLogo?: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
