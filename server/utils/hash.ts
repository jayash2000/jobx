import argon2 from "argon2";
import crypto from "crypto";

export const hashPassword = (password: string) => argon2.hash(password);

export const verifyPassword = (hash: string, password: string) =>
  argon2.verify(hash, password);

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
