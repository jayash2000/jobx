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

export interface User {
  email: string;
  name: string;
  isVerified: boolean | null;
  role: string | null;
}
