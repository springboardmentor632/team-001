import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { Vote, PlusCircle, CheckCircle2, Clock } from "lucide-react";

function PollList() {
  const navigate = useNavigate();

  const polls = [
    { id: "1", question: "Which Framework should we adopt?", status: "Active ⚡", votes: 12 },
    { id: "2", question: "Best Programming Language for Microservices?", status: "Closed ✅", votes: 28 },
    { id: "3", question: "Q4 Remote Work Policy Adjustment?", status: "Active ⚡", votes: 19 },
  ];

  return (
    <DashboardLayout>
      <style>{`
        .poll-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .poll-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15);
        }
        .create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
        }
      `}</style>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.mainTitle}>Team Polls & Ballots</h1>
          <p style={styles.mainSubtitle}>Participate in active decisions or initiate new polls.</p>
        </div>
        <button
          onClick={() => navigate("/polls/create")}
          style={styles.createBtn}
          className="create-btn"
        >
          <PlusCircle size={18} /> Create Poll
        </button>
      </div>

      <div style={styles.grid}>
        {polls.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/polls/${p.id}`)}
            style={styles.pollCard}
            className="poll-card"
          >
            <div style={styles.cardTop}>
              <span style={styles.pollIdBadge}>Poll #{p.id}</span>
              <span style={styles.statusBadge}>{p.status}</span>
            </div>
            <h3 style={styles.questionText}>{p.question}</h3>
            <div style={styles.cardFooter}>
              <span style={styles.voteCount}>{p.votes} Votes Cast</span>
              <span style={styles.viewDetails}>View Ballots →</span>
            </div>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  pollCard: {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "25px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "180px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  pollIdBadge: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  statusBadge: {
    fontSize: "12px",
    background: "rgba(56, 189, 248, 0.1)",
    color: "#38bdf8",
    padding: "4px 10px",
    borderRadius: "8px",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    fontWeight: "600",
  },
  questionText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 20px 0",
    lineHeight: "1.4",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    paddingTop: "15px",
  },
  voteCount: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  viewDetails: {
    fontSize: "13px",
    color: "#38bdf8",
    fontWeight: "600",
  },
};

export default PollList;