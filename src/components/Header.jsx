import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

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

        {isAuthenticated ? (
          <>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              Create Match
            </NavLink>

            <span className="nav-link" style={{ marginLeft: "auto" }}>
              {user?.email}
            </span>

            <button
              type="button"
              className="nav-link"
              onClick={logout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
              style={{ marginLeft: "auto" }}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
