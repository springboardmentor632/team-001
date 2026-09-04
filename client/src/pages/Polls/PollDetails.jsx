import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { CheckCircle2 } from "lucide-react";
import { getPollById, castVote, getPollResults, deletePoll, verifyPollAccess, removeVote } from "../../services/pollService";

const PollDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState([]);
  const [rating, setRating] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteId, setVoteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [checkingAccess, setCheckingAccess] = useState(false);

  useEffect(() => {
    getPollById(id)
      .then((pollRes) => {
        setPoll(pollRes.data);
        if (pollRes.data.visibility === "public") {
          setAccessGranted(true);
          return getPollResults(id).then((r) => setResults(r.data));
        }
      })
      .catch(() => setError("Failed to load poll."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVerifyAccess = async () => {
    setAccessError("");
    setCheckingAccess(true);
    try {
      await verifyPollAccess(id, accessCode);
      setAccessGranted(true);
      const res = await getPollResults(id);
      setResults(res.data);
    } catch (err) {
      setAccessError(err.response?.data?.message || "Invalid access code.");
    } finally {
      setCheckingAccess(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this poll?")) return;
    try {
      await deletePoll(id);
      navigate("/polls");
    } catch {
      setError("Failed to delete poll.");
    }
  };

  const toggleOption = (optionId) => {
    if (poll.pollType === "single") {
      setSelected([optionId]);
    } else {
      setSelected((prev) =>
        prev.includes(optionId) ? prev.filter((o) => o !== optionId) : [...prev, optionId]
      );
    }
  };

  const handleVote = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await castVote({ pollId: id, selectedOptions: selected, rating });
      setVoteId(res.data.vote._id);
      const resultsRes = await getPollResults(id);
      setResults(resultsRes.data);
      setVoted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit vote.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveVote = async () => {
    setError("");
    try {
      await removeVote(voteId);
      const res = await getPollResults(id);
      setResults(res.data);
      setVoted(false);
      setVoteId(null);
      setSelected([]);
      setRating(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove vote.");
    }
  };

  const getPercent = (optionId) => {
    if (!results || results.totalVotes === 0) return "0%";
    const opt = results.optionResults.find((o) => o.optionId === optionId);
    return opt ? `${Math.round((opt.votes / results.totalVotes) * 100)}%` : "0%";
  };

  const getVotes = (optionId) => {
    if (!results) return 0;
    const opt = results.optionResults.find((o) => o.optionId === optionId);
    return opt ? opt.votes : 0;
  };

  if (loading) return <DashboardLayout><p style={{ color: "#94a3b8", padding: "40px" }}>Loading poll...</p></DashboardLayout>;
  if (error && !poll) return <DashboardLayout><p style={{ color: "#f87171", padding: "40px" }}>{error}</p></DashboardLayout>;

  if (poll && poll.visibility === "private" && !accessGranted) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: "440px", margin: "80px auto" }}>
          <div style={styles.card}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
              <h2 style={{ fontSize: "22px", fontWeight: "800", margin: "0 0 8px 0" }}>Private Poll</h2>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>Enter the access code to view and vote on this poll.</p>
            </div>
            {accessError && <p style={{ color: "#f87171", marginBottom: "12px", fontSize: "14px" }}>{accessError}</p>}
            <input
              style={{ ...styles.input, marginBottom: "12px" }}
              placeholder="Enter access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyAccess()}
            />
            <button onClick={handleVerifyAccess} disabled={checkingAccess || !accessCode.trim()} style={styles.voteBtn}>
              {checkingAccess ? "Verifying..." : "Unlock Poll"}
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <style>{`
        .option-btn:hover { background: rgba(56, 189, 248, 0.15) !important; border-color: rgba(56, 189, 248, 0.5) !important; transform: translateY(-2px); }
        .back-btn:hover { color: #38bdf8 !important; }
      `}</style>
      <div style={styles.container}>
        <button onClick={() => navigate("/polls")} style={styles.backBtn} className="back-btn">← Back to Polls</button>
        <button onClick={handleDelete} style={styles.deleteBtn}>🗑 Delete Poll</button>

        <div style={styles.card}>
          <div style={styles.badgeRow}>
            <span style={styles.idBadge}>{poll.pollType} poll</span>
            <span style={poll.isActive ? styles.statusLive : styles.statusClosed}>
              {poll.isActive ? "Live ⚡" : "Closed ✅"}
            </span>
          </div>

          <h2 style={styles.questionTitle}>{poll.question}</h2>
          <p style={styles.metaText}>{poll.description || "Cast your vote below."}</p>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ ...styles.infoBadge, background: poll.visibility === "private" ? "rgba(139,92,246,0.1)" : "rgba(56,189,248,0.1)", color: poll.visibility === "private" ? "#c084fc" : "#38bdf8", border: poll.visibility === "private" ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(56,189,248,0.2)" }}>
              {poll.visibility === "private" ? "🔒 Private" : "🌐 Public"}
            </span>
            {poll.anonymous && (
              <span style={{ ...styles.infoBadge, background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
                👤 Anonymous
              </span>
            )}
          </div>

          {error && <p style={{ color: "#f87171", marginBottom: "16px" }}>{error}</p>}

          {poll.pollType === "rating" ? (
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} style={{ ...styles.starBtn, background: rating >= star ? "rgba(56, 189, 248, 0.2)" : "rgba(2, 6, 23, 0.5)", borderColor: rating >= star ? "#38bdf8" : "rgba(255,255,255,0.1)" }}>
                  {star} ★
                </button>
              ))}
            </div>
          ) : (
            <div style={styles.optionsGrid}>
              {poll.options.map((opt) => {
                const isSelected = selected.includes(opt._id);
                const pct = getPercent(opt._id);
                return (
                  <div key={opt._id} onClick={() => !voted && toggleOption(opt._id)} style={{ ...styles.optionBox, borderColor: isSelected ? "#38bdf8" : "rgba(255,255,255,0.08)", background: isSelected ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 6, 23, 0.5)", cursor: voted ? "default" : "pointer" }} className={voted ? "" : "option-btn"}>
                    <div style={styles.optionTop}>
                      <span style={styles.optionName}>{opt.text}</span>
                      {isSelected && <CheckCircle2 size={18} color="#38bdf8" />}
                    </div>
                    <div style={styles.barTrack}>
                      <div style={{ ...styles.barFill, width: pct }}></div>
                    </div>
                    <div style={styles.optionFooter}>
                      <span>{getVotes(opt._id)} Votes</span>
                      <span>{pct}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {poll.pollType === "rating" && results?.averageRating != null && (
            <p style={{ color: "#38bdf8", fontWeight: "700", marginTop: "12px" }}>
              Average Rating: {results.averageRating.toFixed(1)} / 5 ({results.totalVotes} votes)
            </p>
          )}

          {!voted && poll.isActive && (
            <button onClick={handleVote} disabled={submitting || (poll.pollType !== "rating" && selected.length === 0) || (poll.pollType === "rating" && !rating)} style={styles.voteBtn}>
              {submitting ? "Submitting..." : "Submit Vote"}
            </button>
          )}

          {voted && (
            <div style={styles.successBanner}>
              <CheckCircle2 size={20} color="#34d399" />
              <span style={{ flex: 1 }}>Your vote has been recorded!</span>
              <button onClick={handleRemoveVote} style={styles.removeVoteBtn}>Remove Vote</button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column" },
  backBtn: { background: "transparent", border: "none", color: "#94a3b8", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "20px", display: "inline-flex", alignItems: "center", alignSelf: "flex-start" },
  deleteBtn: { alignSelf: "flex-end", marginBottom: "20px", marginTop: "-48px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#f87171", padding: "8px 16px", borderRadius: "10px", fontWeight: "600", fontSize: "13px", cursor: "pointer" },
  card: { background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", padding: "40px", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" },
  badgeRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  idBadge: { color: "#94a3b8", fontSize: "13px", fontWeight: "600", textTransform: "capitalize" },
  statusLive: { background: "rgba(16, 185, 129, 0.15)", color: "#34d399", padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" },
  statusClosed: { background: "rgba(100, 116, 139, 0.15)", color: "#94a3b8", padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" },
  questionTitle: { fontSize: "26px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0", letterSpacing: "-0.02em" },
  metaText: { color: "#94a3b8", fontSize: "14px", marginBottom: "30px" },
  optionsGrid: { display: "flex", flexDirection: "column", gap: "15px" },
  optionBox: { border: "1px solid", borderRadius: "14px", padding: "20px", transition: "all 0.2s ease" },
  optionTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  optionName: { fontSize: "16px", fontWeight: "700", color: "#fff" },
  barTrack: { width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden", marginBottom: "10px" },
  barFill: { height: "100%", background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)", borderRadius: "4px", transition: "width 0.4s ease" },
  optionFooter: { display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8", fontWeight: "600" },
  starBtn: { padding: "10px 16px", border: "1px solid", borderRadius: "10px", color: "#fff", cursor: "pointer", fontWeight: "700", fontSize: "16px" },
  voteBtn: { marginTop: "25px", width: "100%", padding: "14px", background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", fontSize: "16px", cursor: "pointer" },
  successBanner: { marginTop: "25px", background: "rgba(6, 78, 59, 0.5)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "14px 20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", color: "#34d399", fontSize: "14px", fontWeight: "600" },
  removeVoteBtn: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "6px 14px", borderRadius: "8px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },
  infoBadge: { fontSize: "12px", padding: "4px 10px", borderRadius: "8px", fontWeight: "600" },
  input: { width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2, 6, 23, 0.5)", color: "#fff", fontSize: "15px", boxSizing: "border-box" },
};

export default PollDetails;
