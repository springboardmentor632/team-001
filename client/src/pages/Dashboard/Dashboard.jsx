import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  Users,
  Vote,
  BarChart3,
  Activity,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  PlusCircle,
  Bell,
  Search
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState({ name: "User" });
  const [stats, setStats] = useState({ teams: 12, polls: 45, votes: 360, users: 120 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  return (
    <div style={styles.page}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 0.4; }
        }

        .dashboard-content {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .metric-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .metric-card:hover {
          transform: translateY(-5px);
          border-color: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 15px 30px -5px rgba(14, 165, 233, 0.2);
        }

        .action-btn {
          transition: all 0.2s ease;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
        }
      `}</style>

      {/* Background Ambient Glowing Orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <Navbar />

      <div style={styles.mainContainer} className="dashboard-content">
        {/* Top Header Bar */}
        <div style={styles.topHeader}>
          <div>
            <h1 style={styles.welcomeTitle}>
              Welcome back, <span style={styles.gradientText}>{user.name || "Innovator"}</span> 👋
            </h1>
            <p style={styles.welcomeSubtitle}>
              Here is what's happening across your team workspaces today.
            </p>
          </div>

          <div style={styles.headerActions}>
            <div style={styles.searchBox}>
              <Search size={16} color="#64748b" />
              <input type="text" placeholder="Search decisions..." style={styles.searchInput} />
            </div>
            <button style={styles.primaryActionBtn} className="action-btn">
              <PlusCircle size={18} /> New Decision
            </button>
          </div>
        </div>

        {/* Analytics Grid Cards */}
        <div style={styles.gridContainer}>
          <div style={styles.metricCard} className="metric-card">
            <div style={styles.cardHeaderRow}>
              <span style={styles.cardLabel}>Total Teams</span>
              <div style={{ ...styles.iconBadge, background: "rgba(56, 189, 248, 0.12)", color: "#38bdf8" }}>
                <Users size={20} />
              </div>
            </div>
            <h2 style={styles.cardValue}>{stats.teams}</h2>
            <div style={styles.cardFooter}>
              <span style={styles.trendUp}><TrendingUp size={14} /> +14%</span> vs last month
            </div>
          </div>

          <div style={styles.metricCard} className="metric-card">
            <div style={styles.cardHeaderRow}>
              <span style={styles.cardLabel}>Active Polls</span>
              <div style={{ ...styles.iconBadge, background: "rgba(139, 92, 246, 0.12)", color: "#c084fc" }}>
                <Vote size={20} />
              </div>
            </div>
            <h2 style={styles.cardValue}>{stats.polls}</h2>
            <div style={styles.cardFooter}>
              <span style={styles.trendUp}><TrendingUp size={14} /> +8 new</span> this week
            </div>
          </div>

          <div style={styles.metricCard} className="metric-card">
            <div style={styles.cardHeaderRow}>
              <span style={styles.cardLabel}>Total Votes Cast</span>
              <div style={{ ...styles.iconBadge, background: "rgba(16, 185, 129, 0.12)", color: "#34d399" }}>
                <BarChart3 size={20} />
              </div>
            </div>
            <h2 style={styles.cardValue}>{stats.votes}</h2>
            <div style={styles.cardFooter}>
              <span style={styles.trendUp}><TrendingUp size={14} /> +24%</span> engagement rate
            </div>
          </div>

          <div style={styles.metricCard} className="metric-card">
            <div style={styles.cardHeaderRow}>
              <span style={styles.cardLabel}>Active Collaborators</span>
              <div style={{ ...styles.iconBadge, background: "rgba(244, 63, 94, 0.12)", color: "#fb7185" }}>
                <Activity size={20} />
              </div>
            </div>
            <h2 style={styles.cardValue}>{stats.users}</h2>
            <div style={styles.cardFooter}>
              <span style={styles.trendUp}><ShieldCheck size={14} /> 100%</span> verified nodes
            </div>
          </div>
        </div>

        {/* Lower Content Split: Recent Activity & AI Insights */}
        <div style={styles.splitGrid}>
          <div style={styles.panelCard}>
            <div style={styles.panelHeader}>
              <h3>Recent Team Decisions</h3>
              <span style={styles.viewAll}>View All</span>
            </div>
            <div style={styles.activityList}>
              {[
                { title: "Q3 Frontend Framework Adoption", team: "Engineering", status: "Approved ✅", time: "2 hours ago" },
                { title: "Remote Hiring Budget Q4", team: "Management", status: "Voting Live ⚡", time: "5 hours ago" },
                { title: "Brand Redesign Color Palette", team: "Marketing", status: "Reviewing 🔍", time: "1 day ago" },
              ].map((item, idx) => (
                <div key={idx} style={styles.activityItem}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "15px", color: "#fff" }}>{item.title}</h4>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{item.team} • {item.time}</span>
                  </div>
                  <span style={styles.statusBadge}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.aiPanelCard}>
            <div style={styles.aiHeader}>
              <Sparkles size={20} color="#38bdf8" />
              <h3>AI Workspace Insights</h3>
            </div>
            <p style={styles.aiText}>
              "Your engineering pod shows a <strong>92% consensus velocity</strong> this week. Decision resolution time has decreased by 40% since implementing asynchronous voting ballots."
            </p>
            <div style={styles.aiMetricBox}>
              <div>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>Consensus Score</span>
                <h4 style={{ color: "#34d399", fontSize: "20px", margin: "4px 0 0 0" }}>94.2%</h4>
              </div>
              <div>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>Time Saved</span>
                <h4 style={{ color: "#38bdf8", fontSize: "20px", margin: "4px 0 0 0" }}>14.5 hrs</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    background: "#030712",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    color: "white",
    position: "relative",
    overflowX: "hidden",
  },
  orb1: {
    position: "absolute",
    top: "-100px",
    left: "15%",
    width: "400px",
    height: "400px",
    background: "rgba(14, 165, 233, 0.12)",
    filter: "blur(140px)",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute",
    bottom: "-100px",
    right: "10%",
    width: "450px",
    height: "450px",
    background: "rgba(139, 92, 246, 0.12)",
    filter: "blur(150px)",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  mainContainer: {
    flex: 1,
    padding: "40px",
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
  },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    flexWrap: "wrap",
    gap: "20px",
  },
  welcomeTitle: {
    fontSize: "30px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  gradientText: {
    background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  welcomeSubtitle: {
    color: "#94a3b8",
    fontSize: "14px",
    marginTop: "6px",
  },
  headerActions: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "10px 16px",
    borderRadius: "12px",
    backdropFilter: "blur(12px)",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  },
  primaryActionBtn: {
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
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  metricCard: {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  cardLabel: {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "600",
  },
  iconBadge: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardValue: {
    fontSize: "32px",
    fontWeight: "800",
    margin: "0 0 10px 0",
    letterSpacing: "-0.02em",
  },
  cardFooter: {
    fontSize: "12px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  trendUp: {
    color: "#34d399",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  splitGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  panelCard: {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  viewAll: {
    color: "#38bdf8",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  activityItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "14px 18px",
    borderRadius: "14px",
  },
  statusBadge: {
    fontSize: "12px",
    background: "rgba(56, 189, 248, 0.1)",
    color: "#38bdf8",
    padding: "5px 10px",
    borderRadius: "8px",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    fontWeight: "600",
  },
  aiPanelCard: {
    background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(49, 46, 129, 0.4))",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  aiHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  aiText: {
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: "1.6",
    fontStyle: "italic",
    marginBottom: "20px",
  },
  aiMetricBox: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(2, 6, 23, 0.5)",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },
};

export default Dashboard;