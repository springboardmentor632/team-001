import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Vote,
  PlusCircle,
  Users,
  UserPlus,
  User,
  Zap,
  BarChart3,
  Settings
} from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/polls", label: "Polls", icon: <Vote size={18} /> },
    { path: "/polls/create", label: "Create Poll", icon: <PlusCircle size={18} /> },
    { path: "/teams", label: "Teams", icon: <Users size={18} /> },
    { path: "/teams/create", label: "Create Team", icon: <UserPlus size={18} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    { path: "/profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <div style={styles.navbar}>
      <style>{`
        .nav-link {
          transition: all 0.25s ease !important;
        }
        .nav-link:hover {
          background: rgba(56, 189, 248, 0.1) !important;
          color: #38bdf8 !important;
          transform: translateX(4px);
        }
        .nav-link.active {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(139, 92, 246, 0.2)) !important;
          color: #38bdf8 !important;
          border-left: 4px solid #38bdf8;
        }
      `}</style>

      <div style={styles.logoBrand}>
        <div style={styles.logoBadge}>
          <Zap size={20} color="#38bdf8" />
        </div>
        <h2 style={styles.logoText}>DecisionHub</h2>
      </div>

      <div style={styles.linksContainer}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? "active" : ""}`}
              style={{
                ...styles.linkItem,
                color: isActive ? "#38bdf8" : "#94a3b8",
                background: isActive ? "rgba(56, 189, 248, 0.1)" : "transparent",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    width: "280px",
    background: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(20px)",
    height: "100vh",
    padding: "25px 20px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  logoBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "25px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    marginBottom: "20px",
  },
  logoBadge: {
    width: "38px",
    height: "38px",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)",
  },
  logoText: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.02em",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflowY: "auto",
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default Navbar;