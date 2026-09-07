import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Workflow, 
  Vote, 
  BarChart3, 
  User, 
  Plus, 
  Globe2, 
  Sparkles 
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { title: "Teams", icon: <Users size={18} />, path: "/teams" },
    { title: "Communities", icon: <Globe2 size={18} />, path: "/communities" },
    ...(role === "admin" || role === "moderator"
      ? [{ title: "Create Community", icon: <Plus size={18} />, path: "/communities/create" }]
      : []),
    { title: "Decisions", icon: <Workflow size={18} />, path: "/decisions" },
    { title: "Votes", icon: <Vote size={18} />, path: "/votes" },
    { title: "Analytics", icon: <BarChart3 size={18} />, path: "/analytics" },
    { title: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  return (
    <div style={styles.sidebar}>
      <style>{`
        .sidebar-link {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .sidebar-link:hover {
          background: rgba(56, 189, 248, 0.12) !important;
          color: #38bdf8 !important;
          transform: translateX(6px);
          border-color: rgba(56, 189, 248, 0.3) !important;
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(139, 92, 246, 0.25)) !important;
          color: #38bdf8 !important;
          border-color: rgba(56, 189, 248, 0.5) !important;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.15);
        }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
      `}</style>

      {/* Brand Header */}
      <div style={styles.brandContainer}>
        <div style={styles.brandIconBox}>
          <Sparkles size={20} color="#38bdf8" />
        </div>
        <div>
          <h3 style={styles.brandTitle}>DecisionHub</h3>
          <span style={styles.brandRole}>{role || "Workspace"}</span>
        </div>
      </div>

      {/* Menu Header Label */}
      <div style={styles.menuLabel}>NAVIGATION MATRIX</div>

      {/* Links List */}
      <div className="sidebar-scroll" style={styles.linksContainer}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
              style={{
                ...styles.linkItem,
                color: isActive ? "#38bdf8" : "#94a3b8",
                borderColor: isActive ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.04)",
                background: isActive ? "rgba(56, 189, 248, 0.1)" : "rgba(15, 23, 42, 0.6)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", color: isActive ? "#38bdf8" : "#64748b" }}>
                {item.icon}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Info Badge */}
      <div style={styles.sidebarFooter}>
        <div style={styles.footerGlow}></div>
        <span style={styles.footerText}>Secure Pod v2.4</span>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "270px",
    background: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(24px)",
    height: "100vh",
    color: "white",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    boxSizing: "border-box",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    marginBottom: "20px",
  },
  brandIconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "rgba(56, 189, 248, 0.12)",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)",
  },
  brandTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.02em",
  },
  brandRole: {
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  menuLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#64748b",
    letterSpacing: "0.05em",
    marginBottom: "12px",
    paddingLeft: "4px",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    overflowY: "auto",
    paddingRight: "4px",
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 16px",
    borderRadius: "14px",
    textDecoration: "none",
    border: "1px solid",
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  footerText: {
    fontSize: "11px",
    color: "#64748b",
    fontWeight: "600",
    letterSpacing: "0.02em",
  },
};

export default Sidebar;