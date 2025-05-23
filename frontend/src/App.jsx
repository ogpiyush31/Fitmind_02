import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MoodForm from "./components/MoodForm";
import MoodChart from "./components/MoodChart";
import UpliftingMessages from "./components/UpliftingMessages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.css";

// 🔐 Logout Button (shown only on protected pages)
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username"); // ✅ clear username too
    alert("Logged out successfully.");
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

// 🔐 PrivateRoute wrapper to protect authenticated pages
const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId");
  return isLoggedIn ? (
    <div className="protected-wrapper">
      <LogoutButton />
      {children}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  const isLoggedIn = !!localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const currentPath = window.location.pathname;

  return (
    <Router>
      <div className="App">
        {/* ✅ Show Hello with username on main page */}
        {isLoggedIn && currentPath === "/" && username && (
          <div className="hello-banner">
  Hello, {localStorage.getItem("username") || "😊"}
</div>
        )}

        <div className="date-display">{new Date().toDateString()}</div>
        <h1 className="main-heading">FitMind: Mental Fitness Journal</h1>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MoodForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/mood-chart"
            element={
              <PrivateRoute>
                <MoodChart />
              </PrivateRoute>
            }
          />
          <Route
            path="/uplifting-messages"
            element={
              <PrivateRoute>
                <UpliftingMessages />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

