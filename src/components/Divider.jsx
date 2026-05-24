import { s } from "../styles/authStyles";

export default function Divider() {
  return (
    <div style={s.divider}>
      <div style={{ flex: 1, height: 1, background: "#2E2E2E" }} />
      or
      <div style={{ flex: 1, height: 1, background: "#2E2E2E" }} />
    </div>
  );
}