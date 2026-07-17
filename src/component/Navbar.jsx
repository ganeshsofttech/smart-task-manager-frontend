import { NavLink } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
import "../css/Navbar.css";
import { useEffect, useState } from "react";
import logoutIcon from "../assets/logoutIcon.png";

export default function Navbar({ theme, setTheme }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  useEffect(() => {
    console.log(theme + setTheme("Dark"));
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

            <NavLink className="text-nowrap"
              to="/createtask"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Create Task
            </NavLink>

            <NavLink className="text-nowrap"
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
            <button className="btn bg-transparent border-0 p-0"
            title="Logout"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
             <img src={logoutIcon} alt="Logout" width="20" height="20"/>
              
            </button>

            {/* <ThemeToggle theme={theme} setTheme={setTheme} /> */}
          </>
        )}
      </div>
    </nav>
  );
}
