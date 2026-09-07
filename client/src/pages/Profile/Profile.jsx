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
} from "lucide-react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);

      if (res.data.user.avatar) {
        setPreviewImage(res.data.user.avatar);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading Profile...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.profileHeader}>
            <div style={styles.avatarSection}>
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

              <label style={styles.uploadButton}>
                <Camera size={15} />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={styles.title}>{user?.name}</h1>

              <div style={styles.badges}>
                <span style={styles.roleBadge}>
                  {user?.role?.toUpperCase()}
                </span>

                {user?.isVerified && (
                  <span style={styles.verifyBadge}>
                    <CheckCircle size={14} />
                    Verified
                  </span>
                )}
              </div>
            </div>

            <button
              style={styles.logoutButton}
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <Trophy size={28} />
              <h2>12</h2>
              <p>Decisions Created</p>
            </div>

            <div style={styles.statCard}>
              <CheckCircle size={28} />
              <h2>8</h2>
              <p>Completed</p>
            </div>

            <div style={styles.statCard}>
              <Activity size={28} />
              <h2>95%</h2>
              <p>Success Rate</p>
            </div>
          </div>

          {/* User Info */}
          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <User size={20} color="#8b5cf6" />
              <div>
                <span style={styles.label}>Full Name</span>
                <p style={styles.value}>{user?.name}</p>
              </div>
            </div>

            <div style={styles.infoBox}>
              <Mail size={20} color="#38bdf8" />
              <div>
                <span style={styles.label}>Email Address</span>
                <p style={styles.value}>{user?.email}</p>
              </div>
            </div>

            <div style={styles.infoBox}>
              <ShieldCheck size={20} color="#34d399" />
              <div>
                <span style={styles.label}>Role</span>
                <p style={styles.value}>{user?.role}</p>
              </div>
            </div>

            <div style={styles.infoBox}>
              <ShieldCheck size={20} color="#f59e0b" />
              <div>
                <span style={styles.label}>Verification Status</span>
                <p style={styles.value}>
                  {user?.isVerified
                    ? "Verified Account ✅"
                    : "Not Verified ❌"}
                </p>
              </div>
            </div>

            <div style={styles.infoBox}>
              <ShieldCheck size={20} color="#06b6d4" />
              <div>
                <span style={styles.label}>User ID</span>
                <p style={styles.value}>{user?._id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  container: {
    padding: "30px",
  },

  card: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "35px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },

  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },

  avatarLarge: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#0ea5e9,#8b5cf6)",
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
    border: "3px solid #38bdf8",
  },

  uploadButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "#0ea5e9",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  title: {
    fontSize: "32px",
    color: "#fff",
    marginBottom: "10px",
  },

  badges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  roleBadge: {
    background: "#1d4ed8",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  verifyBadge: {
    background: "#10b981",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    fontWeight: "600",
  },

  logoutButton: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "700",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    color: "#fff",
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
    background: "rgba(2,6,23,0.5)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "18px",
    borderRadius: "14px",
  },

  label: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  value: {
    color: "#fff",
    fontWeight: "600",
    marginTop: "3px",
  },
};

export default Profile;