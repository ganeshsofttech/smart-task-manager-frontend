import React from "react";

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className="theme-toggle-btn"
      onClick={toggleTheme} >
      {theme === "light" ? "🌙 " : "☀️ "}
    </button>

  );
}

const styles = {
  button: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    background: "#0077cc",
    color: "#fff"
  }
};

export default ThemeToggle;
