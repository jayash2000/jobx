type AuthMailOptions = {
  email: string;
  token: string;
  subject: string;
  heading: string;
  purpose: "verify" | "reset";
  actionText: string;
  path: string;
};
