import MatchList from "../components/MatchList.jsx";

function Catalog({ matches }) {
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <main>
      <h1 className="page-title">Upcoming Matches</h1>
      <MatchList matches={sortedMatches} />
    </main>
  );
}

export default Catalog;
