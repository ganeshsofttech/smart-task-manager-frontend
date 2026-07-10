import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../css/Navbar.css";

import onboardingImage from "../assets/onboarding.png";

export default function Navbar({ theme, setTheme }) {
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
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          Login
        </NavLink>
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

        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </nav>
  );
}