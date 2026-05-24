import { getInitials } from "../utils/helpers";
import Logo from "./Logo";

export default function Dashboard({ user, onSignOut }) {
  const initials = getInitials(user.displayName || user.email);
  const provider = user.providerData[0]?.providerId === "google.com" ? "Google" : "Email";

  const stats = [
    { label: "UID",            value: user.uid.slice(0, 12) + "…", mono: true },
    { label: "Email verified", value: user.emailVerified ? "Yes" : "No",
      color: user.emailVerified ? "#22C55E" : "#F59E0B" },
    { label: "Provider",       value: provider },
    { label: "Status",         value: "Active", color: "#22C55E" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <Logo />
        <button
          onClick={onSignOut}
          style={{
            background: "none", border: "1px solid #2E2E2E", color: "#888",
            padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13,
          }}
        >
          Sign out
        </button>
      </div>

      {/* User info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="" style={{ width: 44, height: 44, borderRadius: "50%" }} />
        ) : (
          <div style={{
            width: 44, height: 44, borderRadius: "50%", background: "#E8500A",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 600, fontSize: 15, color: "#fff",
          }}>
            {initials}
          </div>
        )}
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, color: "#F5F5F5" }}>
            {user.displayName || "User"}
          </div>
          <div style={{ fontSize: 13, color: "#888" }}>{user.email}</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#1F1F1F", border: "1px solid #2E2E2E",
            borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#888", marginTop: 4,
          }}>
            {provider} account
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: "#052E16", border: "1px solid #166534",
        color: "#86EFAC", fontSize: 11, padding: "3px 8px",
        borderRadius: 6, marginBottom: "1rem",
      }}>
        ✓ Authenticated
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {stats.map(({ label, value, color, mono }) => (
          <div key={label} style={{
            background: "#1F1F1F", border: "1px solid #2E2E2E",
            borderRadius: 12, padding: 14,
          }}>
            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
              {label}
            </div>
            <div style={{
              fontSize: mono ? 11 : 16, fontWeight: 500,
              color: color || "#F5F5F5",
              fontFamily: mono ? "monospace" : "inherit",
              wordBreak: "break-all",
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}