import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../css/Navbar.css";
import { useEffect, useState } from "react";

import onboardingImage from "../assets/onboarding.png";

export default function Navbar({ theme, setTheme }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateToken);

    return () => {
      window.removeEventListener("storage", updateToken);
    };
  }, []);

  // const token = localStorage.getItem("token");

  const activeStyle = {
    color: "red",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav className="navbar">
      <h2>Smart Task Manager</h2>
      {/* <NavLink
        to="/">
        <img className="logo"
        src={onboardingImage}
        alt="Task Management" />
      </NavLink> */}
      <div className="nav-links">
        {/* <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : {})}>
          Login
        </NavLink> */}
        {!token && (
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            Login
          </NavLink>
        )}
        {token && (
          <>
            <NavLink
              to="/home"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Home
            </NavLink>

            <NavLink
              to="/createtask"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Create Task
            </NavLink>

            <NavLink
              to="/taskdetails"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Task Details
            </NavLink>

            {/* <NavLink
          to="/contact"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          Contact
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          About
        </NavLink> */}
            <button className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </button>

            {/* <ThemeToggle theme={theme} setTheme={setTheme} /> */}
          </>
        )}
      </div>
    </nav>
  );
}
