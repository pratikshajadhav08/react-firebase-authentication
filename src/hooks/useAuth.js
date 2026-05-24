import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { validateFields, FIREBASE_ERROR_MAP } from "../utils/helpers";

export function useAuth() {
  const [user, setUser]       = useState(null);
  const [view, setView]       = useState("login");
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);
  const [showPw, setShowPw]   = useState(false);
  const [errors, setErrors]   = useState({});
  const [form, setForm]       = useState({ name: "", email: "", password: "" });

  // Subscribe to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const updateForm = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const nav = (nextView) => {
    setView(nextView);
    setErrors({});
  };

  const validate = () => {
    const e = validateFields({ ...form, view });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      showToast("Signed in successfully", "success");
    } catch (err) {
      setErrors(FIREBASE_ERROR_MAP[err.code] || { email: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      showToast("Account created!", "success");
    } catch (err) {
      setErrors(FIREBASE_ERROR_MAP[err.code] || { email: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      showToast("Signed in with Google", "success");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user")
        showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const e = validateFields({ email: form.email, view: "reset" });
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, form.email);
      showToast("Reset email sent to " + form.email, "info");
      nav("login");
    } catch (err) {
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    showToast("Signed out", "info");
  };

  return {
    user, view, loading, toast, showPw, errors, form,
    updateForm,
    nav,
    setShowPw,
    handleLogin,
    handleSignup,
    handleGoogle,
    handleReset,
    handleSignOut,
  };
}