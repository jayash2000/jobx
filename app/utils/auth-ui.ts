export const registerFields = [
  { id: "field_name", label: "Name", name: "name", type: "text" },
  { id: "field_email", label: "Email", name: "email", type: "text" },
  {
    id: "field_password",
    label: "Password",
    name: "password",
    type: "password",
  },
  {
    id: "field_confirm_password",
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
] as const;

export const loginFields = [
  { id: "field_email", label: "Email", name: "email", type: "text" },
  {
    id: "field_password",
    label: "Password",
    name: "password",
    type: "password",
  },
] as const;

export const forgotPasswordFields = [
  { id: "field_email", label: "Email", name: "email", type: "text" },
] as const;

export const resetPasswordFields = [
  {
    id: "field_password",
    label: "New Password",
    name: "password",
    type: "password",
  },
  {
    id: "field_confirm_password",
    label: "Confirm New Password",
    name: "confirmPassword",
    type: "password",
  },
] as const;

export type RegisterFieldName = (typeof registerFields)[number]["name"];
export type LoginFieldName = (typeof loginFields)[number]["name"];
export type ForgotPasswordFieldName =
  (typeof forgotPasswordFields)[number]["name"];
export type ResetPasswordFieldName =
  (typeof resetPasswordFields)[number]["name"];
