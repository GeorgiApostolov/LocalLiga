import { Link, useParams } from "react-router-dom";

function MatchDetails({ matches }) {
  const { matchId } = useParams();

  const match = matches.find((m) => m.id === Number(matchId));

  if (!match) {
    return (
      <main>
        <h2>Match not found.</h2>
      </main>
    );
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
    </main>
  );
}

export default MatchDetails;
