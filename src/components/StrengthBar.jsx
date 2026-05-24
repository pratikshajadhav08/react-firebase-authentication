import { pwStrength } from "../utils/helpers";

const COLORS = ["#2E2E2E", "#EF4444", "#F59E0B", "#22C55E", "#22C55E"];
const LABELS = ["", "Weak", "Fair", "Good", "Strong"];

export default function StrengthBar({ password }) {
  if (!password) return null;
  const strength = pwStrength(password);
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i < strength ? COLORS[strength] : "#2E2E2E",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{LABELS[strength]}</div>
    </div>
  );
}