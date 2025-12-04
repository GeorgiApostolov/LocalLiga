import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav">
        <NavLink to="/" className="site-logo">
          LocalLiga ⚽
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Matches
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Create Match
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
