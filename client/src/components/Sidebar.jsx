import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        height: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/teams">Teams</Link>

        <Link to="/decisions">Decisions</Link>

        <Link to="/votes">Votes</Link>

        <Link to="/analytics">Analytics</Link>

        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Sidebar;