import { s } from "../styles/authStyles";
import GoogleIcon from "../components/GoogleIcon";
import Divider from "../components/Divider";

export default function LoginView({ form, errors, loading, showPw, onUpdate, onTogglePw, onLogin, onGoogle, onNav }) {
  return (
    <>
      <h1 style={s.h1}>Welcome back</h1>
      <p style={s.subtitle}>Sign in to continue to your account</p>

      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onUpdate("email")}
          style={s.input(errors.email)}
          onKeyDown={(e) => e.key === "Enter" && onLogin()}
        />
        {errors.email && <div style={s.errMsg}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={s.label}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={onUpdate("password")}
            style={{ ...s.input(errors.password), paddingRight: 44 }}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
          />
          <button onClick={onTogglePw} style={{
            position: "absolute", right: 12, top: "50%",
            transform: "translateY(-50%)", background: "none",
            border: "none", color: "#888", cursor: "pointer", fontSize: 14, padding: 4,
          }}>
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <div style={s.errMsg}>{errors.password}</div>}
      </div>

      <div style={{ textAlign: "right", marginBottom: 14 }}>
        <span style={s.link} onClick={() => onNav("reset")}>Forgot password?</span>
      </div>

      <button style={{ ...s.btnPrimary, opacity: loading ? 0.6 : 1 }} onClick={onLogin} disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <Divider />

      <button style={s.btnGoogle} onClick={onGoogle} disabled={loading}>
        <GoogleIcon /> Continue with Google
      </button>

      <div style={s.linkRow}>
        Don't have an account?{" "}
        <span style={s.link} onClick={() => onNav("signup")}>Create one</span>
      </div>
    </>
  );
}