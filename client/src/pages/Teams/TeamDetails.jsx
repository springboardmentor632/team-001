import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { Users, ShieldCheck } from "lucide-react";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div style={styles.container}>
        <button onClick={() => navigate("/teams")} style={styles.backBtn}>
          ← Back to Teams
        </button>

        <div style={styles.card}>
          <div style={styles.badgeRow}>
            <span style={styles.idBadge}>Team Workspace #{id}</span>
            <span style={styles.statusLive}>Active Pod 🚀</span>
          </div>

          <h2 style={styles.teamTitle}>Development & Engineering Team</h2>
          <p style={styles.metaText}>Managing technical proposals, code architecture reviews, and sprint polls.</p>

          <h3 style={styles.sectionHeader}>Active Collaborators</h3>
          <div style={styles.memberList}>
            {["Dheeraj Koneti (Lead)", "Marcus Vance", "Sarah Jenkins", "Alex Rivera"].map((member, idx) => (
              <div key={idx} style={styles.memberItem}>
                <div style={styles.avatarCircle}>{member.charAt(0)}</div>
                <span style={{ fontWeight: "600" }}>{member}</span>
                <span style={styles.roleTag}>Verified Node</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
  },
  card: {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },
  badgeRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  idBadge: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "600",
  },
  statusLive: {
    background: "rgba(56, 189, 248, 0.12)",
    color: "#38bdf8",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
  },
  teamTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 8px 0",
  },
  metaText: {
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "30px",
  },
  sectionHeader: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#cbd5e1",
    marginBottom: "15px",
  },
  memberList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "rgba(2, 6, 23, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    padding: "12px 16px",
    borderRadius: "12px",
  },
  avatarCircle: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#fff",
  },
  roleTag: {
    marginLeft: "auto",
    fontSize: "12px",
    background: "rgba(16, 185, 129, 0.12)",
    color: "#34d399",
    padding: "3px 8px",
    borderRadius: "6px",
    fontWeight: "600",
  },
};

export default TeamDetails;