import { s } from "../styles/authStyles";

export default function ResetView({ form, errors, loading, onUpdate, onReset, onNav }) {
  return (
    <>
      <h1 style={s.h1}>Reset password</h1>
      <p style={s.subtitle}>We'll send a reset link to your email</p>

      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onUpdate("email")}
          style={s.input(errors.email)}
          onKeyDown={(e) => e.key === "Enter" && onReset()}
        />
        {errors.email && <div style={s.errMsg}>{errors.email}</div>}
      </div>

      <button style={{ ...s.btnPrimary, opacity: loading ? 0.6 : 1 }} onClick={onReset} disabled={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </button>

      <div style={s.linkRow}>
        <span style={s.link} onClick={() => onNav("login")}>← Back to sign in</span>
      </div>
    </>
  );
}