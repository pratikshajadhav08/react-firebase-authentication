export function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function pwStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function validateFields({ email, password, name, view }) {
  const errors = {};
  if (email !== undefined && !/^\S+@\S+\.\S+$/.test(email))
    errors.email = "Enter a valid email";
  if (password !== undefined && view !== "reset" && password.length < 6)
    errors.password = "Password must be 6+ characters";
  if (name !== undefined && view === "signup" && !name.trim())
    errors.name = "Name is required";
  return errors;
}

export const FIREBASE_ERROR_MAP = {
  "auth/user-not-found":    { email: "No account with this email" },
  "auth/wrong-password":    { password: "Incorrect password" },
  "auth/email-already-in-use": { email: "Email already in use" },
  "auth/invalid-email":     { email: "Invalid email address" },
  "auth/too-many-requests": { email: "Too many attempts. Try again later." },
};