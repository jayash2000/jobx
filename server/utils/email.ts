import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  throw new Error("Invalid .env [email user and email password]");
}

const baseUrl = process.env.BASE_URL;

if (!baseUrl) throw new Error("Invalid .env variable for base url");

// Nodemailer Configuration
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function sendAuthMail({
  email,
  token,
  subject,
  heading,
  purpose = "verify",
  actionText,
  path,
}: AuthMailOptions) {
  const url = `${baseUrl}/auth/${token}/${path}`;

  await transporter.sendMail({
    to: email,
    from: "JobX Auth Bot",
    subject,
    html: `
     <h2>${heading}</h2>
    <p>Click the link below to ${purpose === "verify" ? "verify your account" : "reset your password"}:</p>
    <a href='${url}'>${actionText}</a>
    <p>This link expires in 1 ${purpose === "verify" ? "day" : "hour"}</p>
    `,
  });
}
