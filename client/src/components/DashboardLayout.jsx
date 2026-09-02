import React from "react";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.mainContent}>
        <div style={styles.innerWrapper}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    background: "#030712",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    color: "#f8fafc",
  },
  mainContent: {
    flex: 1,
    overflowY: "auto",
    height: "100vh",
  },
  innerWrapper: {
    padding: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
};

export default DashboardLayout;