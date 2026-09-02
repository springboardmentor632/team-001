import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Users, PlusCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TeamList() {
  const navigate = useNavigate();
  const teams = [
    { id: "1", name: "Engineering Pod", members: 8, lead: "Marcus Vance" },
    { id: "2", name: "Product Strategy", members: 5, lead: "Sarah Jenkins" },
  ];

  return (
    <DashboardLayout>
      <style>{`
        .team-card {
          transition: all 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15);
        }
      `}</style>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.mainTitle}>Organization Teams</h1>
          <p style={styles.mainSubtitle}>Manage specialized pods and collaborative workspaces.</p>
        </div>
        <button
          onClick={() => navigate("/teams/create")}
          style={styles.createBtn}
        >
          <PlusCircle size={18} /> Create Team
        </button>
      </div>

      <div style={styles.grid}>
        {teams.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/teams/${t.id}`)}
            style={styles.teamCard}
            className="team-card"
          >
            <div style={styles.teamTop}>
              <div style={styles.teamIconBox}>
                <Users size={22} color="#38bdf8" />
              </div>
              <span style={styles.membersBadge}>{t.members} Members</span>
            </div>
            <h3 style={styles.teamName}>{t.name}</h3>
            <p style={styles.leadText}>Lead: <strong style={{ color: "#fff" }}>{t.lead}</strong></p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

const styles = {
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    flexWrap: "wrap",
    gap: "20px",
  },
  mainTitle: {
    fontSize: "30px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  mainSubtitle: {
    color: "#94a3b8",
    fontSize: "14px",
    marginTop: "6px",
  },
  createBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(14, 165, 233, 0.3)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  teamCard: {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "25px",
    cursor: "pointer",
  },
  teamTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  teamIconBox: {
    width: "44px",
    height: "44px",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(56, 189, 248, 0.3)",
  },
  membersBadge: {
    fontSize: "12px",
    background: "rgba(139, 92, 246, 0.12)",
    color: "#c084fc",
    padding: "4px 10px",
    borderRadius: "8px",
    fontWeight: "600",
    border: "1px solid rgba(139, 92, 246, 0.2)",
  },
  teamName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 8px 0",
  },
  leadText: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
  },
};

export default TeamList;