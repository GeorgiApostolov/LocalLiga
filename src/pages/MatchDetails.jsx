import { Link, useParams, useNavigate } from "react-router-dom";

function MatchDetails({ matches, onDeleteMatch }) {
  const { matchId } = useParams();
  const navigate = useNavigate;

  const match = matches.find((m) => m.id === Number(matchId));

  if (!match) {
    return (
      <main>
        <h2>Match not found.</h2>
      </main>
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmed) {
      return;
    }

    onDeleteMatch(match.id);
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
      <p>
        <strong>ID:</strong> {match.id}
      </p>

      <Link to={`/matches/${matchId}/edit`}>Edit match</Link>

      <div style={{ marginTop: "1rem" }}>
        <button className="danger" onClick={handleDelete}>
          Delete match
        </button>
      </div>
    </main>
  );
}

export default MatchDetails;
