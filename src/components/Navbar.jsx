import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        📝 <span>NoteFlow</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="nav-actions">

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <Link to="/add" className="create-button">
          + New Note
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;