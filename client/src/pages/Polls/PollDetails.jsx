import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { Vote, ArrowLeft, CheckCircle2 } from "lucide-react";

const PollDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVoteAction = (optionName) => {
    setSelectedOption(optionName);
    setVoted(true);
    alert(`Successfully voted for: ${optionName}`);
  };

  return (
    <DashboardLayout>
      <style>{`
        .option-btn:hover {
          background: rgba(56, 189, 248, 0.15) !important;
          border-color: rgba(56, 189, 248, 0.5) !important;
          transform: translateY(-2px);
        }
        .back-btn:hover {
          color: #38bdf8 !important;
        }
      `}</style>
      <div style={styles.container}>
        <button onClick={() => navigate("/polls")} style={styles.backBtn} className="back-btn">
          ← Back to Polls
        </button>

        <div style={styles.card}>
          <div style={styles.badgeRow}>
            <span style={styles.idBadge}>Poll #{id}</span>
            <span style={styles.statusLive}>Live Ballots Open ⚡</span>
          </div>

          <h2 style={styles.questionTitle}>Which feature should be implemented next?</h2>
          <p style={styles.metaText}>Cast your weighted ballot below to help the engineering pod reach consensus.</p>

          <div style={styles.optionsGrid}>
            {[
              { name: "React Dashboard", votes: 8, percent: "66%" },
              { name: "Team Voting Engine", votes: 3, percent: "25%" },
              { name: "Analytics Visualizer", votes: 1, percent: "9%" },
            ].map((opt, idx) => (
              <div
                key={idx}
                onClick={() => handleVoteAction(opt.name)}
                style={{
                  ...styles.optionBox,
                  borderColor: selectedOption === opt.name ? "#38bdf8" : "rgba(255, 255, 255, 0.08)",
                  background: selectedOption === opt.name ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 6, 23, 0.5)",
                }}
                className="option-btn"
              >
                <div style={styles.optionTop}>
                  <span style={styles.optionName}>{opt.name}</span>
                  {selectedOption === opt.name && <CheckCircle2 size={18} color="#38bdf8" />}
                </div>
                <div style={styles.barTrack}>
                  <div style={{ ...styles.barFill, width: opt.percent }}></div>
                </div>
                <div style={styles.optionFooter}>
                  <span>{opt.votes} Votes</span>
                  <span>{opt.percent}</span>
                </div>
              </div>
            ))}
          </div>

          {voted && (
            <div style={styles.successBanner}>
              <CheckCircle2 size={20} color="#34d399" />
              <span>Your ballot has been securely recorded on-chain/database.</span>
            </div>
          )}
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
    display: "inline-flex",
    alignItems: "center",
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
    background: "rgba(16, 185, 129, 0.15)",
    color: "#34d399",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
  },
  questionTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  },
  metaText: {
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "30px",
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  optionBox: {
    border: "1px solid",
    borderRadius: "14px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  optionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  optionName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
  },
  barTrack: {
    width: "100%",
    height: "8px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
    borderRadius: "4px",
  },
  optionFooter: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  successBanner: {
    marginTop: "25px",
    background: "rgba(6, 78, 59, 0.5)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    padding: "14px 20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#34d399",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default PollDetails;