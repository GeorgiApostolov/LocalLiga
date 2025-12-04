import { Link } from "react-router-dom";

function MatchCard({ id, title, date, location }) {
  return (
    <article className="card">
      <div>
        <h3 className="card-title">{title}</h3>
        <span className="card-date">{date}</span>
      </div>

      <p className="card-location">Location: {location}</p>

      <Link to={`/matches/${id}`} className="btn-link">
        View details
      </Link>
    </article>
  );
}
export default MatchCard;
