import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { UserPlus } from "lucide-react";

function CreateTeam() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createTeam = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    alert("Team Created Successfully!");
    navigate("/teams");
  };

  return (
    <DashboardLayout>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconBadge}>
            <UserPlus size={22} color="#38bdf8" />
          </div>
          <div>
            <h1 style={styles.title}>Create New Team</h1>
            <p style={styles.subtitle}>Setup a dedicated workspace for your departmental pod</p>
          </div>
        </div>

        <form onSubmit={createTeam} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Team Name</label>
            <input
              type="text"
              placeholder="e.g. Core Infrastructure Pod"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Initialize Team Workspace
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  card: {
    maxWidth: "650px",
    margin: "40px auto",
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  iconBadge: {
    width: "45px",
    height: "45px",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(56, 189, 248, 0.3)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
    marginTop: "4px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e1",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(2, 6, 23, 0.5)",
    color: "#fff",
    fontSize: "15px",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 20px rgba(14, 165, 233, 0.3)",
  },
};

export default CreateTeam;