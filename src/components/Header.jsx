import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ background: "#111", color: "#fff", padding: "1rem" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}
        >
          LocalLiga ⚽
        </Link>

        <Link to="/catalog" style={{ color: "#fff", textDecoration: "none" }}>
          Matches
        </Link>
      </nav>
    </header>
  );
}

export default Header;
