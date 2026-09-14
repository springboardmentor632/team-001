
import React from "react";

function PollResult({ options = [] }) {

  const totalVotes = options.reduce(
    (total, option) => total + (Number(option.votes) || 0),
    0
  );

  return (
    <div className="poll-result">
      <h2>Poll Results</h2>

      <p>
        Total Votes: <strong>{totalVotes}</strong>
      </p>

      {options.length === 0 ? (
        <p>No poll results available.</p>
      ) : (
        options.map((option, index) => {

          const votes = Number(option.votes) || 0;

          const percentage =
            totalVotes === 0
              ? 0
              : Math.round((votes / totalVotes) * 100);

          return (
            <div
              key={option.id || index}
              className="result-option"
            >
              <div className="result-header">
                <span>{option.name}</span>

                <span>
                  {votes} votes ({percentage}%)
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  height: "12px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  marginTop: "8px",
                  marginBottom: "20px"
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    backgroundColor: "#4f46e5",
                    transition: "width 0.5s ease"
                  }}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PollResult;