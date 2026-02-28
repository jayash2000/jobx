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

export type RegisterFieldName = (typeof registerFields)[number]["name"];
export type LoginFieldName = (typeof loginFields)[number]["name"];
