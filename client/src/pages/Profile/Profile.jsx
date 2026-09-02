import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { User, Mail, ShieldCheck } from "lucide-react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Dheeraj Koneti",
    email: "dheerajkoneti719@gmail.com",
  };

  return (
    <DashboardLayout>
      <div style={styles.card}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarLarge}>{user.name ? user.name.charAt(0) : "D"}</div>
          <div>
            <h1 style={styles.title}>{user.name || "User"}</h1>
            <p style={styles.subtitle}>Verified Administrator Node</p>
          </div>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoBox}>
            <Mail size={18} color="#38bdf8" />
            <div>
              <span style={styles.label}>Email Address</span>
              <p style={styles.value}>{user.email || "dheeraj@decisionhub.io"}</p>
            </div>
          </div>

          <div style={styles.infoBox}>
            <ShieldCheck size={18} color="#34d399" />
            <div>
              <span style={styles.label}>Account Security</span>
              <p style={styles.value}>Two-Factor & OTP Verified</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  card: {
    maxWidth: "700px",
    margin: "40px auto",
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "35px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    paddingBottom: "25px",
  },
  avatarLarge: {
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "800",
    color: "#fff",
    boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
  },
  title: {
    fontSize: "26px",
    fontWeight: "800",
    margin: "0 0 4px 0",
  },
  subtitle: {
    color: "#38bdf8",
    fontSize: "13px",
    fontWeight: "600",
    margin: 0,
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  infoBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "rgba(2, 6, 23, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    padding: "16px 20px",
    borderRadius: "14px",
  },
  label: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  value: {
    fontSize: "15px",
    color: "#fff",
    margin: "2px 0 0 0",
    fontWeight: "600",
  },
};

export default Profile;