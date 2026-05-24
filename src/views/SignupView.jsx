import { s } from "../styles/authStyles";
import GoogleIcon from "../components/GoogleIcon";
import Divider from "../components/Divider";
import StrengthBar from "../components/StrengthBar";

export default function SignupView({ form, errors, loading, showPw, onUpdate, onTogglePw, onSignup, onGoogle, onNav }) {
  return (
    <>
      <h1 style={s.h1}>Create account</h1>
      <p style={s.subtitle}>Start using FireAuth in seconds</p>

      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>Full name</label>
        <input
          type="text"
          placeholder="Jane Doe"
          value={form.name}
          onChange={onUpdate("name")}
          style={s.input(errors.name)}
        />
        {errors.name && <div style={s.errMsg}>{errors.name}</div>}
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onUpdate("email")}
          style={s.input(errors.email)}
        />
        {errors.email && <div style={s.errMsg}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={onUpdate("password")}
            style={{ ...s.input(errors.password), paddingRight: 44 }}
          />
          <button onClick={onTogglePw} style={{
            position: "absolute", right: 12, top: "50%",
            transform: "translateY(-50%)", background: "none",
            border: "none", color: "#888", cursor: "pointer", fontSize: 14,
          }}>
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        <StrengthBar password={form.password} />
        {errors.password && <div style={s.errMsg}>{errors.password}</div>}
      </div>

      <button style={{ ...s.btnPrimary, opacity: loading ? 0.6 : 1 }} onClick={onSignup} disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </button>

      <Divider />

      <button style={s.btnGoogle} onClick={onGoogle} disabled={loading}>
        <GoogleIcon /> Sign up with Google
      </button>

      <div style={s.linkRow}>
        Already have an account?{" "}
        <span style={s.link} onClick={() => onNav("login")}>Sign in</span>
      </div>
    </>
  );
}