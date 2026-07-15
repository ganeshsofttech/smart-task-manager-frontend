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

export default ThemeToggle;
