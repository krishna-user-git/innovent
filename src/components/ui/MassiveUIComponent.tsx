import React from "react";
import "../../App.css";

// This is a synthetic, massive UI component for demonstration/testing purposes.
// It contains a large number of visually rich cards, sections, and elements.

const cardData = Array.from({ length: 11000 }, (_, i) => ({
  id: i + 1,
  title: `Card Title ${i + 1}`,
  description: `This is the description for card number ${i + 1}. It is part of a massive UI component for testing purposes.`,
  image: `https://picsum.photos/seed/${i + 1}/200/120`,
}));

const MassiveUIComponent: React.FC = () => {
  return (
    <div style={{ padding: 32, background: "#f8fafc" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
        Massive UI Component Demo
      </h1>
      <p style={{ marginBottom: 32, color: "#334155" }}>
        This component renders 11,000+ visually rich cards for UI and performance testing.
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 24,
        background: "#e2e8f0",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 2px 16px rgba(30,41,59,0.08)",
      }}>
        {cardData.map(card => (
          <div key={card.id} style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 4px rgba(30,41,59,0.06)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(30,41,59,0.12)";
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(30,41,59,0.06)";
          }}
          >
            <img src={card.image} alt={card.title} style={{ width: 200, height: 120, borderRadius: 8, marginBottom: 12, objectFit: "cover" }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{card.title}</h2>
            <p style={{ color: "#475569", fontSize: 15, textAlign: "center" }}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MassiveUIComponent;
