const COLORS = {
  success: { bg: "#052E16", border: "#166534", text: "#86EFAC" },
  error:   { bg: "#2D0505", border: "#991B1B", text: "#FCA5A5" },
  info:    { bg: "#082050", border: "#1D4ED8", text: "#93C5FD" },
};

export default function Toast({ msg, type }) {
  const c = COLORS[type];
  return (
    <div style={{
      position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
      padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
      zIndex: 999, background: c.bg, border: `1px solid ${c.border}`,
      color: c.text, whiteSpace: "nowrap",
    }}>
      {msg}
    </div>
  );
}