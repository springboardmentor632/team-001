import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { PlusCircle, HelpCircle, CheckCircle2 } from "lucide-react";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }
    alert("Poll Created Successfully!");
    navigate("/polls");
  };

  return (
    <DashboardLayout>
      <style>{`
        .input-field:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
          outline: none;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
        }
      `}</style>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconBadge}>
            <PlusCircle size={22} color="#38bdf8" />
          </div>
          <div>
            <h1 style={styles.title}>Create Team Poll</h1>
            <p style={styles.subtitle}>Setup real-time voting options for your squad</p>
          </div>
        </div>

        <form onSubmit={handleCreate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Poll Question</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Which framework should we adopt for frontend architecture?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Voting Options</label>
            {options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                className="input-field"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                style={{ ...styles.input, marginBottom: "10px" }}
                required
              />
            ))}
            <button
              type="button"
              onClick={addOptionField}
              style={styles.addOptionBtn}
            >
              + Add Another Option
            </button>
          </div>

          <button type="submit" className="action-btn" style={styles.submitBtn}>
            Launch Poll Now
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

const styles = {
  card: {
    maxWidth: "700px",
    margin: "40px auto",
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  iconBadge: {
    width: "45px",
    height: "45px",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(56, 189, 248, 0.3)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
    marginTop: "4px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e1",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(2, 6, 23, 0.5)",
    color: "#fff",
    fontSize: "15px",
  },
  addOptionBtn: {
    background: "transparent",
    border: "1px dashed rgba(56, 189, 248, 0.4)",
    color: "#38bdf8",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    marginTop: "4px",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 20px rgba(14, 165, 233, 0.3)",
  },
};

export default CreatePoll;