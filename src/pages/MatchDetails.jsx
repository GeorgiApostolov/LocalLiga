import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import * as matchesApi from "../api/matches";

function MatchDetails({ matches }) {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const match = matches.find((m) => m._id === matchId);
  const { user, isAuthenticated } = useAuth();

  const isOwner = isAuthenticated && match._ownerId === user._id;

  if (!match) {
    return (
      <main>
        <h2>Match not found.</h2>
      </main>
    );
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmed) {
      return;
    }

    await matchesApi.deleteMatch(match._id, user.accessToken);
    navigate("/catalog");
  }

  return (
    <main>
      <h1>{match.title}</h1>
      <p>
        <strong>Date:</strong> {match.date}
      </p>
      <p>
        <strong>Location:</strong> {match.location}
      </p>

      {isOwner && (
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
          <Link to={`/matches/${matchId}/edit`} className="btn-link">
            Edit
          </Link>

          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </main>
  );
}

export default MatchDetails;
