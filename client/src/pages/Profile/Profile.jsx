import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Camera,
  Trophy,
  CheckCircle,
  Activity,
  BarChart3,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import socket from "../../socket";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    decisionsCreated: 0,
    completedDecisions: 0,
    pollsCreated: 0,
    votesCast: 0,
    communitiesJoined: 0,
    successRate: 0,
  });
  const [communityData, setCommunityData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      if (res.data.stats) setStats(res.data.stats);
      if (res.data.communityData) setCommunityData(res.data.communityData);
      if (res.data.recentActivities) setRecentActivities(res.data.recentActivities);
      if (res.data.achievements) setAchievements(res.data.achievements);
      if (res.data.heatmap) setHeatmap(res.data.heatmap);

      if (res.data.user?.avatar) {
        setPreviewImage(res.data.user.avatar);
      }
    } catch (error) {
      console.log(error);
      // Fallback data for preview/development if backend is offline
      setUser({
        _id: "64f1a2b3c4d5e6f7a8b9c0d1",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "admin",
        isVerified: true,
        createdAt: "2025-01-15T00:00:00.000Z",
      });
      setStats({
        decisionsCreated: 12,
        completedDecisions: 9,
        pollsCreated: 6,
        votesCast: 54,
        communitiesJoined: 4,
        successRate: 75,
      });
      setCommunityData([
        { name: "AI Community", members: 220 },
        { name: "Startup Hub", members: 150 },
      ]);
      setRecentActivities([
        {
          _id: "act1",
          action: "Created Decision",
          title: "Cloud Migration",
          createdAt: "2026-09-22",
        },
        {
          _id: "act2",
          action: "Voted Poll",
          title: "Best Framework",
          createdAt: "2026-09-21",
        },
      ]);
      setAchievements([
        { _id: "ach1", icon: "🏆", title: "First Poll Created" },
        { _id: "ach2", icon: "⭐", title: "10 Votes Cast" },
        { _id: "ach3", icon: "🔥", title: "Community Member" },
      ]);
      setHeatmap([
        { day: "Mon", count: 5 },
        { day: "Tue", count: 3 },
        { day: "Wed", count: 6 },
        { day: "Thu", count: 4 },
        { day: "Fri", count: 7 },
        { day: "Sat", count: 2 },
        { day: "Sun", count: 4 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    socket.on("profileUpdated", () => {
      fetchProfile();
    });

    socket.on("statsUpdated", (newStats) => {
      setStats((prev) => ({ ...prev, ...newStats }));
    });

    socket.on("activityAdded", (activity) => {
      setRecentActivities((prev) => [activity, ...prev]);
    });

    const interval = setInterval(() => {
      fetchProfile();
    }, 30000);

    return () => {
      socket.off("profileUpdated");
      socket.off("statsUpdated");
      socket.off("activityAdded");
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={styles.loadingContainer}>
          <div className="spinner" style={styles.spinner}></div>
          <h2 style={{ color: "#fff", marginTop: "15px" }}>Loading Dashboard...</h2>
        </div>
      </DashboardLayout>
    );
  }

  const completion =
    [
      user?.name,
      user?.email,
      previewImage || user?.avatar,
      user?.isVerified,
    ].filter(Boolean).length * 25;

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={styles.card}
        >
          {/* Hero Profile Banner */}
          <div style={styles.profileHeader}>
            <div style={styles.avatarSection}>
              <div style={styles.avatarRing}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="profile"
                    style={styles.profileImage}
                  />
                ) : (
                  <div style={styles.avatarLarge}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <label style={styles.uploadButton}>
                <Camera size={13} />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div style={styles.headerInfo}>
              <div style={styles.titleRow}>
                <h1 style={styles.title}>{user?.name}</h1>
                {user?.isVerified && (
                  <span style={styles.verifyBadge}>
                    <CheckCircle size={13} /> Verified
                  </span>
                )}
              </div>
              <p style={styles.emailText}>{user?.email}</p>

              <div style={styles.badges}>
                <span style={styles.roleBadge}>
                  {user?.role?.toUpperCase()}
                </span>
                <span style={styles.joinBadge}>
                  <Calendar size={13} />
                  Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, background: "#dc2626" }}
              whileTap={{ scale: 0.95 }}
              style={styles.logoutButton}
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>

          {/* Profile Completion Bar */}
          <div style={styles.completionContainer}>
            <div style={styles.completionHeader}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={15} color="#38bdf8" /> Profile Completion Strength
              </span>
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>{completion}%</span>
            </div>
            <div style={styles.progressBarBg}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={styles.progressBarFill}
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div style={styles.statsGrid}>
            <motion.div whileHover={{ scale: 1.03, y: -5 }} style={styles.statCard}>
              <div style={{ ...styles.statIconBg, background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
                <Trophy size={20} />
              </div>
              <div>
                <h2 style={styles.statNumber}>{stats.decisionsCreated}</h2>
                <p style={styles.statLabel}>Decisions Created</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -5 }} style={styles.statCard}>
              <div style={{ ...styles.statIconBg, background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <h2 style={styles.statNumber}>{stats.pollsCreated}</h2>
                <p style={styles.statLabel}>Polls Created</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -5 }} style={styles.statCard}>
              <div style={{ ...styles.statIconBg, background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                <Activity size={20} />
              </div>
              <div>
                <h2 style={styles.statNumber}>{stats.votesCast}</h2>
                <p style={styles.statLabel}>Votes Cast</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -5 }} style={styles.statCard}>
              <div style={{ ...styles.statIconBg, background: "rgba(139, 92, 246, 0.15)", color: "#8b5cf6" }}>
                <Users size={20} />
              </div>
              <div>
                <h2 style={styles.statNumber}>{stats.communitiesJoined}</h2>
                <p style={styles.statLabel}>Communities Joined</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -5 }} style={styles.statCard}>
              <div style={{ ...styles.statIconBg, background: "rgba(236, 72, 153, 0.15)", color: "#ec4899" }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h2 style={styles.statNumber}>{stats.successRate}%</h2>
                <p style={styles.statLabel}>Success Rate</p>
              </div>
            </motion.div>
          </div>

          {/* Two Column Layout for Dashboard Grids */}
          <div style={styles.dashboardGridTwoCol}>
            {/* Community Stats Chart */}
            <div style={styles.sectionBox}>
              <h3 style={styles.sectionTitle}>
                <BarChart3 size={18} color="#8b5cf6" /> Community Engagement
              </h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={communityData}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={styles.tooltipStyle} />
                    <Bar dataKey="members" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Real Activity Heatmap */}
            <div style={styles.sectionBox}>
              <h3 style={styles.sectionTitle}>
                <Activity size={18} color="#10b981" /> Activity Heatmap
              </h3>
              <div style={styles.heatmapWrapper}>
                <p style={styles.heatmapSubText}>Live dynamic activity breakdown</p>
                <div style={styles.heatmapGridContainer}>
                  {heatmap.map((dayItem) => (
                    <div key={dayItem.day} style={styles.heatmapDayColumn}>
                      <span style={styles.heatmapCount}>{dayItem.count}</span>
                      <div
                        style={{
                          ...styles.heatmapBar,
                          height: `${Math.min(dayItem.count * 18, 120)}px`,
                        }}
                      />
                      <span style={styles.heatmapDayLabel}>{dayItem.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline & Achievements */}
          <div style={styles.dashboardGridTwoCol}>
            {/* Real Activity Timeline */}
            <div style={styles.sectionBox}>
              <h3 style={styles.sectionTitle}>Recent Activity Timeline</h3>
              <div style={styles.timelineList}>
                {recentActivities.map((activity, index) => (
                  <div key={activity._id || index} style={styles.timelineItem}>
                    <div style={{ ...styles.timelineDot, background: index % 2 === 0 ? "#10b981" : "#8b5cf6" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                      <div>
                        <p style={styles.timelineText}>{activity.action}</p>
                        <span style={styles.timelineTitleSpan}>{activity.title}</span>
                      </div>
                      <span style={styles.timelineTime}>{activity.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Achievement Section */}
            <div style={styles.sectionBox}>
              <h3 style={styles.sectionTitle}>Achievements & Badges</h3>
              <div style={styles.achievementGrid}>
                {achievements.map((badge, idx) => (
                  <div key={badge._id || idx} style={styles.achievementBadge}>
                    {badge.icon || "🏆"} {badge.title || badge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account Information Card */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>Account Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoBox}>
                <User size={18} color="#8b5cf6" />
                <div>
                  <span style={styles.label}>User ID</span>
                  <p style={styles.value}>{user?._id}</p>
                </div>
              </div>

              <div style={styles.infoBox}>
                <Mail size={18} color="#38bdf8" />
                <div>
                  <span style={styles.label}>Email Address</span>
                  <p style={styles.value}>{user?.email}</p>
                </div>
              </div>

              <div style={styles.infoBox}>
                <ShieldCheck size={18} color="#34d399" />
                <div>
                  <span style={styles.label}>Role</span>
                  <p style={styles.value}>{user?.role?.toUpperCase()}</p>
                </div>
              </div>

              <div style={styles.infoBox}>
                <CheckCircle size={18} color="#f59e0b" />
                <div>
                  <span style={styles.label}>Verification Status</span>
                  <p style={styles.value}>
                    {user?.isVerified ? "Verified Account ✅" : "Not Verified ❌"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px 40px",
    background: "radial-gradient(circle at top left, #1e3a8a, #020617)",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: "100px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255,255,255,0.1)",
    borderLeftColor: "#38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
  card: {
    width: "100%",
    maxWidth: "1800px",
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "28px",
    padding: "40px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    marginBottom: "30px",
    flexWrap: "wrap",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    paddingBottom: "25px",
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  avatarRing: {
    padding: "4px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
    boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
  },
  avatarLarge: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#fff",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(14, 165, 233, 0.15)",
    border: "1px solid rgba(14, 165, 233, 0.4)",
    color: "#38bdf8",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "4px",
  },
  title: {
    fontSize: "32px",
    color: "#fff",
    fontWeight: "700",
  },
  emailText: {
    color: "#94a3b8",
    fontSize: "15px",
    marginBottom: "14px",
  },
  badges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  roleBadge: {
    background: "rgba(29, 78, 216, 0.25)",
    border: "1px solid rgba(29, 78, 216, 0.5)",
    color: "#60a5fa",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
  },
  verifyBadge: {
    background: "rgba(16, 185, 129, 0.2)",
    border: "1px solid rgba(16, 185, 129, 0.4)",
    color: "#34d399",
    padding: "4px 10px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "11px",
    fontWeight: "600",
  },
  joinBadge: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#cbd5e1",
    padding: "5px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
  },
  logoutButton: {
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    color: "#f87171",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600",
    fontSize: "13px",
  },
  completionContainer: {
    marginBottom: "30px",
    background: "rgba(2, 6, 23, 0.5)",
    padding: "18px 22px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },
  completionHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#cbd5e1",
    marginBottom: "10px",
  },
  progressBarBg: {
    width: "100%",
    height: "10px",
    background: "#1e293b",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
    borderRadius: "5px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color: "#fff",
  },
  statIconBg: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "2px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  dashboardGridTwoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    marginBottom: "30px",
  },
  sectionBox: {
    flex: 1,
    background: "rgba(2, 6, 23, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    padding: "24px",
  },
  sectionTitle: {
    fontSize: "17px",
    color: "#f8fafc",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
  },
  heatmapWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    height: "226px",
    justifyContent: "center",
  },
  heatmapSubText: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "5px",
  },
  heatmapGridContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "160px",
    paddingTop: "10px",
  },
  heatmapDayColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  heatmapBar: {
    width: "16px",
    background: "linear-gradient(180deg, #10b981, #06b6d4)",
    borderRadius: "4px",
  },
  heatmapCount: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  heatmapDayLabel: {
    fontSize: "12px",
    color: "#cbd5e1",
    fontWeight: "600",
  },
  timelineList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "226px",
    justifyContent: "center",
    overflowY: "auto",
  },
  timelineItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "13px",
  },
  timelineDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    boxShadow: "0 0 8px currentColor",
  },
  timelineText: {
    color: "#e2e8f0",
    fontWeight: "600",
    marginBottom: "2px",
  },
  timelineTitleSpan: {
    color: "#94a3b8",
    fontSize: "12px",
  },
  timelineTime: {
    fontSize: "11px",
    color: "#64748b",
  },
  achievementGrid: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    height: "226px",
    alignContent: "center",
  },
  achievementBadge: {
    background: "rgba(139, 92, 246, 0.12)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    color: "#c084fc",
    padding: "10px 16px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  infoBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "16px",
    borderRadius: "14px",
  },
  label: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  value: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    marginTop: "2px",
  },
  tooltipStyle: {
    background: "#0f172a",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  },
};

export default Profile;