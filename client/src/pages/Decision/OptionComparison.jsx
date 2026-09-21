import React, { useState, useEffect } from "react";
import {
  createComparison,
  getAllComparisons,
  deleteComparison,
} from "../../services/optionComparisonService";

const OptionComparison = () => {
  const [title, setTitle] = useState("");
  const [decisionId, setDecisionId] = useState("");

  const [options, setOptions] = useState([
    {
      name: "",
      cost: "",
      scalability: "",
      security: "",
      performance: "",
      description: "",
    },
  ]);

  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      const res = await getAllComparisons();
      setComparisons(res.data.comparisons || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([
      ...options,
      {
        name: "",
        cost: "",
        scalability: "",
        security: "",
        performance: "",
        description: "",
      },
    ]);
  };

  const removeOptionCard = (index) => {
    if (options.length === 1) return;
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createComparison({
        decisionId,
        title,
        options,
      });

      alert("Comparison Saved Successfully!");
      setTitle("");
      setDecisionId("");
      setOptions([
        {
          name: "",
          cost: "",
          scalability: "",
          security: "",
          performance: "",
          description: "",
        },
      ]);
      fetchComparisons();
    } catch (error) {
      console.error(error);
      alert("Failed to Save Comparison");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comparison?")) return;

    try {
      await deleteComparison(id);
      fetchComparisons();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Dynamic Ambient Background Elements */}
      <div style={styles.ambientBlurTop}></div>
      <div style={styles.ambientBlurBottom}></div>

      {/* Header Section */}
      <div style={styles.headerContainer}>
        <div style={styles.badgeTop}>⚡ Enterprise Decision Hub</div>
        <h1 style={styles.mainTitle}>Decision Matrix & Option Comparison</h1>
        <p style={styles.subtitle}>
          Benchmark alternative solutions side-by-side using weighted matrix parameters to eliminate ambiguity and choose with confidence.
        </p>
      </div>

      {/* CREATE FORM */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formHeaderRow}>
          <h2 style={styles.sectionTitle}>✨ Create New Comparison Matrix</h2>
          <span style={styles.stepIndicator}>Interactive Builder</span>
        </div>
        
        <div style={styles.rowGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Decision Title</label>
            <input
              type="text"
              placeholder="e.g., Cloud Infrastructure Provider"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Decision Reference ID</label>
            <input
              type="text"
              placeholder="e.g., DEC-2026-01"
              value={decisionId}
              onChange={(e) => setDecisionId(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.optionsHeaderRow}>
          <div>
            <h3 style={styles.subSectionTitle}>Options / Candidates</h3>
            <p style={styles.subSectionDesc}>Define your alternatives to benchmark.</p>
          </div>
          <button type="button" onClick={addOption} style={styles.secondaryBtn}>
            + Add Option
          </button>
        </div>

        {options.map((option, index) => (
          <div key={index} style={styles.optionCard}>
            <div style={styles.optionCardHeader}>
              <span style={styles.optionBadge}>Candidate Option #{index + 1}</span>
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOptionCard(index)}
                  style={styles.removeTextBtn}
                >
                  ✕ Remove
                </button>
              )}
            </div>

            <div style={styles.optionGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.subLabel}>Option Name</label>
                <input
                  placeholder="e.g. AWS"
                  value={option.name}
                  onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.subLabel}>Cost Evaluation</label>
                <input
                  placeholder="e.g. High / $12k/mo"
                  value={option.cost}
                  onChange={(e) => handleOptionChange(index, "cost", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.subLabel}>Scalability Index</label>
                <input
                  placeholder="e.g. Auto-scaling / High"
                  value={option.scalability}
                  onChange={(e) => handleOptionChange(index, "scalability", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.subLabel}>Security Standards</label>
                <input
                  placeholder="e.g. ISO-27001, SOC2"
                  value={option.security}
                  onChange={(e) => handleOptionChange(index, "security", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.subLabel}>Performance Metric</label>
                <input
                  placeholder="e.g. 99.99% Uptime"
                  value={option.performance}
                  onChange={(e) => handleOptionChange(index, "performance", e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={{ ...styles.inputGroup, marginTop: "16px" }}>
              <label style={styles.subLabel}>Strategic Summary & Notes</label>
              <textarea
                placeholder="Highlight core advantages or potential roadblocks for this option..."
                value={option.description}
                onChange={(e) => handleOptionChange(index, "description", e.target.value)}
                style={styles.textarea}
              />
            </div>
          </div>
        ))}

        <div style={styles.submitContainer}>
          <button type="submit" disabled={loading} style={styles.successBtn}>
            {loading ? "Saving Matrix..." : "💾 Save Comparison Matrix"}
          </button>
        </div>
      </form>

      {/* SAVED COMPARISONS SECTION */}
      <div style={styles.savedSection}>
        <div style={styles.savedHeaderFlex}>
          <h2 style={styles.sectionTitle}>
            Saved Comparison Matrices 
            <span style={styles.countBadge}>{comparisons.length}</span>
          </h2>
        </div>

        {comparisons.length === 0 ? (
          <div style={styles.emptyContainer}>
            <div style={styles.emptyIcon}>📂</div>
            <p style={styles.emptyText}>No comparison records found yet. Build your first decision framework above!</p>
          </div>
        ) : (
          comparisons.map((comparison) => (
            <div key={comparison._id} style={styles.comparisonCard}>
              <div style={styles.cardHeaderFlex}>
                <div>
                  <span style={styles.cardMetaId}>{comparison.decisionId || "DEC-SAVED"}</span>
                  <h3 style={styles.comparisonTitle}>{comparison.title}</h3>
                </div>
                <button
                  onClick={() => handleDelete(comparison._id)}
                  style={styles.dangerBtn}
                >
                  Delete Matrix
                </button>
              </div>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeaderRow}>
                      <th style={styles.thFeature}>Feature / Metric</th>
                      {comparison.options.map((opt) => (
                        <th key={opt._id || opt.name} style={styles.thOpt}>
                          {opt.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={styles.tr}>
                      <td style={styles.tdFeature}>Cost</td>
                      {comparison.options.map((opt) => (
                        <td key={opt._id || opt.name} style={styles.td}>
                          {opt.cost || "—"}
                        </td>
                      ))}
                    </tr>
                    <tr style={styles.trZebra}>
                      <td style={styles.tdFeature}>Scalability</td>
                      {comparison.options.map((opt) => (
                        <td key={opt._id || opt.name} style={styles.td}>
                          {opt.scalability || "—"}
                        </td>
                      ))}
                    </tr>
                    <tr style={styles.tr}>
                      <td style={styles.tdFeature}>Security</td>
                      {comparison.options.map((opt) => (
                        <td key={opt._id || opt.name} style={styles.td}>
                          {opt.security || "—"}
                        </td>
                      ))}
                    </tr>
                    <tr style={styles.trZebra}>
                      <td style={styles.tdFeature}>Performance</td>
                      {comparison.options.map((opt) => (
                        <td key={opt._id || opt.name} style={styles.td}>
                          {opt.performance || "—"}
                        </td>
                      ))}
                    </tr>
                    <tr style={styles.trLast}>
                      <td style={styles.tdFeature}>Description</td>
                      {comparison.options.map((opt) => (
                        <td key={opt._id || opt.name} style={styles.tdDesc}>
                          {opt.description || "—"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* --- Modern Styling Sheet Objects with Deep SaaS Aesthetic --- */
const styles = {
  pageContainer: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "60px 24px",
    color: "#F3F4F6",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    backgroundColor: "#030712",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  ambientBlurTop: {
    position: "absolute",
    top: "-150px",
    left: "10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  ambientBlurBottom: {
    position: "absolute",
    bottom: "10%",
    right: "-100px",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  headerContainer: {
    marginBottom: "40px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    paddingBottom: "24px",
    position: "relative",
    zIndex: 1,
  },
  badgeTop: {
    display: "inline-block",
    padding: "6px 14px",
    background: "rgba(99, 102, 241, 0.1)",
    color: "#818CF8",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "14px",
    border: "1px solid rgba(99, 102, 241, 0.25)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  mainTitle: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: "10px",
    letterSpacing: "-0.7px",
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: "16px",
    lineHeight: "1.6",
    maxWidth: "800px",
  },
  formCard: {
    background: "linear-gradient(160deg, #111827 0%, #0B0F19 100%)",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    marginBottom: "50px",
    position: "relative",
    zIndex: 1,
  },
  formHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  sectionTitle: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#F9FAFB",
    letterSpacing: "-0.4px",
  },
  stepIndicator: {
    fontSize: "12px",
    color: "#9CA3AF",
    background: "rgba(255, 255, 255, 0.06)",
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.04)",
  },
  rowGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: "8px",
  },
  subLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#9CA3AF",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "10px",
    border: "1px solid #374151",
    background: "#1F2937",
    color: "#FFFFFF",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "10px",
    border: "1px solid #374151",
    background: "#1F2937",
    color: "#FFFFFF",
    fontSize: "14px",
    height: "90px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  optionsHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "35px",
    marginBottom: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    paddingTop: "25px",
  },
  subSectionTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#F3F4F6",
  },
  subSectionDesc: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginTop: "3px",
  },
  optionCard: {
    background: "rgba(17, 24, 39, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "20px",
    backdropFilter: "blur(12px)",
  },
  optionCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  optionBadge: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#38BDF8",
    background: "rgba(56, 189, 248, 0.1)",
    padding: "5px 10px",
    borderRadius: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    border: "1px solid rgba(56, 189, 248, 0.2)",
  },
  optionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },
  secondaryBtn: {
    padding: "10px 18px",
    background: "#374151",
    color: "#F3F4F6",
    border: "none",
    borderRadius: "9px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
    transition: "background 0.2s",
  },
  removeTextBtn: {
    background: "transparent",
    color: "#F87171",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
  submitContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "35px",
  },
  successBtn: {
    padding: "14px 30px",
    background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
    color: "white",
    border: "none",
    borderRadius: "11px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)",
    transition: "transform 0.1s ease",
  },
  savedSection: {
    marginTop: "50px",
    position: "relative",
    zIndex: 1,
  },
  savedHeaderFlex: {
    marginBottom: "24px",
  },
  countBadge: {
    background: "#1F2937",
    color: "#D1D5DB",
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    marginLeft: "10px",
    border: "1px solid #374151",
  },
  emptyContainer: {
    padding: "50px",
    textAlign: "center",
    background: "#111827",
    borderRadius: "20px",
    border: "1px dashed #374151",
  },
  emptyIcon: {
    fontSize: "36px",
    marginBottom: "12px",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: "15px",
  },
  comparisonCard: {
    background: "#111827",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "30px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
  },
  cardHeaderFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "22px",
  },
  cardMetaId: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#34D399",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    display: "block",
    marginBottom: "4px",
  },
  comparisonTitle: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  dangerBtn: {
    padding: "9px 16px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#F87171",
    border: "1px solid rgba(239, 68, 68, 0.25)",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "background 0.2s",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "14px",
    border: "1px solid #1F2937",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
  },
  tableHeaderRow: {
    background: "#1F2937",
  },
  thFeature: {
    padding: "16px 20px",
    color: "#9CA3AF",
    fontWeight: "700",
    borderBottom: "2px solid #374151",
    width: "200px",
  },
  thOpt: {
    padding: "16px 20px",
    color: "#FFFFFF",
    fontWeight: "700",
    borderBottom: "2px solid #374151",
  },
  tr: {
    borderBottom: "1px solid #1F2937",
  },
  trZebra: {
    background: "rgba(31, 41, 55, 0.25)",
    borderBottom: "1px solid #1F2937",
  },
  trLast: {
    borderBottom: "none",
  },
  tdFeature: {
    padding: "16px 20px",
    color: "#9CA3AF",
    fontWeight: "600",
    background: "rgba(17, 24, 39, 0.5)",
  },
  td: {
    padding: "16px 20px",
    color: "#E5E7EB",
  },
  tdDesc: {
    padding: "16px 20px",
    color: "#9CA3AF",
    fontSize: "13px",
  },
};

export default OptionComparison;