import React from "react";

const Reports = () => {
  const report = {
    decision: "MBA vs Job",
    totalVotes: 120,
    totalComments: 45,
    winner: "Job",
  };

  return (
    <div>
      <h2>Decision Report</h2>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>{report.decision}</h3>

        <p>
          Total Votes:
          {report.totalVotes}
        </p>

        <p>
          Total Comments:
          {report.totalComments}
        </p>

        <p>
          Winner:
          {report.winner}
        </p>

        <button>
          Export PDF
        </button>

        <button
          style={{
            marginLeft: "10px",
          }}
        >
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default Reports;