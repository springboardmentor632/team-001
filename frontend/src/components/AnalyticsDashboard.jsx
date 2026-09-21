import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./AnalyticsDashboard.css";

const decisionData = [
  { month: "Jan", decisions: 8 },
  { month: "Feb", decisions: 12 },
  { month: "Mar", decisions: 10 },
  { month: "Apr", decisions: 15 },
  { month: "May", decisions: 18 },
  { month: "Jun", decisions: 22 },
];

const categoryData = [
  { category: "Education", decisions: 18 },
  { category: "Career", decisions: 15 },
  { category: "Technology", decisions: 12 },
  { category: "Finance", decisions: 9 },
  { category: "Travel", decisions: 7 },
];

const voteData = [
  { name: "Option A", value: 45 },
  { name: "Option B", value: 30 },
  { name: "Option C", value: 25 },
];

const optionPopularity = [
  { option: "Online Learning", votes: 68 },
  { option: "Offline Learning", votes: 42 },
  { option: "Hybrid Learning", votes: 31 },
  { option: "Self Learning", votes: 20 },
];

const participationData = [
  { month: "Jan", participation: 52 },
  { month: "Feb", participation: 61 },
  { month: "Mar", participation: 58 },
  { month: "Apr", participation: 72 },
  { month: "May", participation: 76 },
  { month: "Jun", participation: 84 },
];

const outcomeData = [
  { name: "Approved", value: 60 },
  { name: "Rejected", value: 20 },
  { name: "Pending", value: 20 },
];

const COLORS = ["#2563eb", "#ef4444", "#f59e0b"];

function AnalyticsDashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          Decision<span>Hub</span>
        </div>

        <nav>
          <div className="nav-item active">📊 Dashboard</div>
          <div className="nav-item">🗳️ Decisions</div>
          <div className="nav-item">👥 Community</div>
          <div className="nav-item">📈 Analytics</div>
          <div className="nav-item">📄 Reports</div>
        </nav>

        <div className="sidebar-bottom">
          <div className="nav-item">⚙️ Settings</div>
          <div className="nav-item">🚪 Logout</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="top-header">
          <div>
            <h1>Decision Analytics</h1>
            <p>
              Monitor decisions, voting activity and community participation.
            </p>
          </div>

          <div className="profile">
            <div className="notification">🔔</div>
            <div className="avatar">U</div>
            <span>User</span>
          </div>
        </header>

        {/* Overview Cards */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">📋</div>
            <div>
              <p>Active Decisions</p>
              <h2>25</h2>
              <span className="positive">↑ 12% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">🗳️</div>
            <div>
              <p>Total Votes</p>
              <h2>150</h2>
              <span className="positive">↑ 18% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">👥</div>
            <div>
              <p>Active Users</p>
              <h2>45</h2>
              <span className="positive">↑ 9% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">📈</div>
            <div>
              <p>Participation</p>
              <h2>78%</h2>
              <span className="positive">↑ 6% this month</span>
            </div>
          </div>

        </section>

        {/* Decision Trends */}
        <section className="chart-card full-width">
          <div className="section-header">
            <div>
              <h2>Decision Trends</h2>
              <p>Number of decisions created over time</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={decisionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="decisions"
                name="Decisions"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Charts Row */}
        <section className="charts-grid">

          {/* Vote Distribution */}
          <div className="chart-card">
            <div className="section-header">
              <div>
                <h2>Vote Distribution</h2>
                <p>Distribution of votes across options</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={voteData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {voteData.map((entry, index) => (
                    <Cell
                      key={`vote-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Decision Outcomes */}
          <div className="chart-card">
            <div className="section-header">
              <div>
                <h2>Decision Outcomes</h2>
                <p>Current status of decisions</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={outcomeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {outcomeData.map((entry, index) => (
                    <Cell
                      key={`outcome-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </section>

        {/* Category + Option Popularity */}
        <section className="charts-grid">

          <div className="chart-card">
            <div className="section-header">
              <div>
                <h2>Popular Categories</h2>
                <p>Decisions grouped by category</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="decisions"
                  name="Decisions"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="section-header">
              <div>
                <h2>Option Popularity</h2>
                <p>Most selected decision options</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={optionPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="option" type="category" width={110} />
                <Tooltip />

                <Bar
                  dataKey="votes"
                  name="Votes"
                  fill="#7c3aed"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </section>

        {/* Participation Statistics */}
        <section className="chart-card full-width">

          <div className="section-header">
            <div>
              <h2>Participation Statistics</h2>
              <p>Community participation percentage over time</p>
            </div>

            <div className="participation-value">
              78%
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="participation"
                name="Participation %"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </section>

        {/* Active Decisions + Community Activity */}
        <section className="bottom-grid">

          {/* Active Decisions */}
          <div className="table-card">
            <div className="section-header">
              <div>
                <h2>Active Decisions</h2>
                <p>Currently active community decisions</p>
              </div>
            </div>

            <div className="decision-list">

              <div className="decision-row">
                <div>
                  <strong>Online vs Offline Learning</strong>
                  <span>Education</span>
                </div>
                <div className="status active-status">
                  Active
                </div>
              </div>

              <div className="decision-row">
                <div>
                  <strong>Best Technology for Project</strong>
                  <span>Technology</span>
                </div>
                <div className="status active-status">
                  Active
                </div>
              </div>

              <div className="decision-row">
                <div>
                  <strong>College Event Planning</strong>
                  <span>Community</span>
                </div>
                <div className="status active-status">
                  Active
                </div>
              </div>

            </div>
          </div>

          {/* Community Activity */}
          <div className="table-card">
            <div className="section-header">
              <div>
                <h2>Community Activity</h2>
                <p>Recent activity from community members</p>
              </div>
            </div>

            <div className="activity-list">

              <div className="activity">
                <div className="activity-icon">🗳️</div>
                <div>
                  <strong>New vote submitted</strong>
                  <p>A user voted on Education decision</p>
                  <small>5 minutes ago</small>
                </div>
              </div>

              <div className="activity">
                <div className="activity-icon">💬</div>
                <div>
                  <strong>New comment added</strong>
                  <p>A user joined the discussion</p>
                  <small>20 minutes ago</small>
                </div>
              </div>

              <div className="activity">
                <div className="activity-icon">📋</div>
                <div>
                  <strong>New decision created</strong>
                  <p>A new Technology decision was created</p>
                  <small>1 hour ago</small>
                </div>
              </div>

            </div>
          </div>

        </section>

      </main>
    </div>
  );
}

export default AnalyticsDashboard;