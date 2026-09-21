import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Auth/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import PollList from "./pages/Polls/PollList";
import CreatePoll from "./pages/Polls/CreatePoll";
import PollDetails from "./pages/Polls/PollDetails";

import TeamList from "./pages/Teams/TeamList";
import CreateTeam from "./pages/Teams/CreateTeam";
import TeamDetails from "./pages/Teams/TeamDetails";

import Profile from "./pages/Profile/Profile";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyResetOTP from "./pages/Auth/VerifyResetOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
import ManageUsers from "./pages/Admin/ManageUsers";
import CommunityList from "./pages/Communities/CommunityList";
import CommunityDetails from "./pages/Communities/CommunityDetails";
import CreateCommunity from "./pages/Communities/CreateCommunity";
import CommunityHub from "./pages/Communities/CommunityHub";
import Comments from "./pages/Dashboard/Comments";
import Reports from "./pages/Profile/Reports";
import Notifications from "./pages/Notification/Notifications";
import OptionComparison from
"./pages/Decision/OptionComparison";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-reset-otp"
          element={<VerifyResetOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Polls */}

        <Route
          path="/polls"
          element={<PollList />}
        />

        <Route
          path="/polls/create"
          element={<CreatePoll />}
        />

        <Route
          path="/polls/:id"
          element={<PollDetails />}
        />

        {/* Teams */}

        <Route
          path="/teams"
          element={<TeamList />}
        />

        <Route
          path="/teams/create"
          element={<CreateTeam />}
        />

        <Route
          path="/teams/:id"
          element={<TeamDetails />}
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/manage-users"
          element={<ManageUsers />}
        />
        <Route
          path="/Communities"
          element={<CommunityList />}
        />

        <Route
          path="/Community/:id"
          element={<CommunityDetails />}
        />

        <Route
          path="/Communities/create"
          element={<CreateCommunity />}
        />
        <Route
          path="/communities/:id/hub"
          element={<CommunityHub />}
        />
        <Route
          path="/comments"
          element={<Comments />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />
        <Route
          path="/option-comparison"
          element={<OptionComparison />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;