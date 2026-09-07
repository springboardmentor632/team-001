import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Users, Vote, BarChart3, Activity, TrendingUp, Sparkles,
  ShieldCheck, PlusCircle, Search
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState({ name: "User" });
  const [stats, setStats] = useState({
    teams: 0,
    polls: 0,
    votes: 0,
    users: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log(error);
      }
    }

    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setStats({
        teams: res.data.totalTeams,
        polls: res.data.totalPolls,
        votes: res.data.totalVotes,
        users: res.data.totalUsers,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .dashboard-content { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .metric-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .metric-card:hover { transform: translateY(-5px); border-color: rgba(56, 189, 248, 0.4) !important; box-shadow: 0 15px 30px -5px rgba(14, 165, 233, 0.2); }
        .action-btn { transition: all 0.2s ease; }
        .action-btn:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(14, 165, 233, 0.4); }
      `}</style>

      <div className="dashboard-content">
        <div style={styles.topHeader}>
          <div>
            <h1 style={styles.welcomeTitle}>
              Welcome back, <span style={styles.gradientText}>{user.name || "Innovator"}</span> 👋
            </h1>
            <p style={styles.welcomeSubtitle}>Here is what's happening across your team workspaces today.</p>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.searchBox}>
              <Search size={16} color="#64748b" />
              <input type="text" placeholder="Search decisions..." style={styles.searchInput} />
            </div>
          </div>
        </div>

        <div style={styles.gridContainer}>
          {[
            { label: "Total Teams", value: stats.teams, icon: <Users size={30} />, color: "#9238f8", bg: "rgba(56,189,248,0.12)", trend: "+14% vs last month" },
            { label: "Total Polls", value: stats.polls, icon: <Vote size={30} />, color: "#fc84f0", bg: "rgba(139,92,246,0.12)", trend: "+8 new this week" },
            { label: "Total Votes Cast", value: stats.votes, icon: <BarChart3 size={20} />, color: "#34d399", bg: "rgba(16,185,129,0.12)", trend: "+24% engagement rate" },
            { label: "Active Collaborators", value: stats.users, icon: <Activity size={20} />, color: "#fb7185", bg: "rgba(244,63,94,0.12)", trend: "100% verified" },
          ].map((card) => (
            <div key={card.label} style={styles.metricCard} className="metric-card">
              <div style={styles.cardHeaderRow}>
                <span style={styles.cardLabel}>{card.label}</span>
                <div style={{ ...styles.iconBadge, background: card.bg, color: card.color }}>{card.icon}</div>
              </div>
              <h2 style={styles.cardValue}>{card.value}</h2>
              <div style={styles.cardFooter}>
                <span style={styles.trendUp}><TrendingUp size={14} /> {card.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.splitGrid}>
          <div style={styles.panelCard}>
            <div style={styles.panelHeader}>
              <h3 style={{ margin: 0 }}>Recent Team Decisions</h3>
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
              <h3 style={{ margin: 0 }}>AI Workspace Insights</h3>
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
    </DashboardLayout>
  );
}

const styles = {
  topHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px", flexWrap: "wrap", gap: "20px" },
  welcomeTitle: { fontSize: "30px", fontWeight: "800", margin: 0, letterSpacing: "-0.02em" },
  gradientText: { background: "linear-gradient(135deg, #38bdf8, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  welcomeSubtitle: { color: "#94a3b8", fontSize: "14px", marginTop: "6px" },
  headerActions: { display: "flex", gap: "15px", alignItems: "center" },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.1)", padding: "10px 16px", borderRadius: "12px", backdropFilter: "blur(12px)" },
  searchInput: { background: "transparent", border: "none", color: "#fff", outline: "none", fontSize: "14px" },
  primaryActionBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "600", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 20px rgba(14,165,233,0.3)" },
  gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" },
  metricCard: { background: "rgba(15,23,42,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
  cardHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  cardLabel: { color: "#94a3b8", fontSize: "14px", fontWeight: "600" },
  iconBadge: { width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  cardValue: { fontSize: "32px", fontWeight: "800", margin: "0 0 10px 0", letterSpacing: "-0.02em" },
  cardFooter: { fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" },
  trendUp: { color: "#34d399", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" },
  splitGrid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" },
  panelCard: { background: "rgba(15,23,42,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "25px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
  panelHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  viewAll: { color: "#38bdf8", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  activityList: { display: "flex", flexDirection: "column", gap: "15px" },
  activityItem: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "14px 18px", borderRadius: "14px" },
  statusBadge: { fontSize: "12px", background: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "5px 10px", borderRadius: "8px", border: "1px solid rgba(56,189,248,0.2)", fontWeight: "600" },
  aiPanelCard: { background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(49,46,129,0.4))", backdropFilter: "blur(16px)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "20px", padding: "25px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  aiHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" },
  aiText: { color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6", fontStyle: "italic", marginBottom: "20px" },
  aiMetricBox: { display: "flex", justifyContent: "space-between", background: "rgba(2,6,23,0.5)", padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" },
};

export default Dashboard;