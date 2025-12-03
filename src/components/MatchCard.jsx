import { Link } from "react-router-dom";

function MatchCard({ id, title, date, location }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>Location: {location}</p>

      <Link
        to={`/matches/${id}`}
        style={{ marginTop: "0.5rem", display: "inline-block" }}
      >
        View Details
      </Link>
    </article>
  );
}
export default MatchCard;
