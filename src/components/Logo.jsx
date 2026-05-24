import { s } from "../styles/authStyles";

export default function Logo() {
  return (
    <div style={s.logo}>
      <div style={s.logoIcon}>🔥</div>
      <div style={s.logoText}>
        Fire<span style={{ color: "#E8500A" }}>Auth</span>
      </div>
    </div>
  );
}