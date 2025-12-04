import MatchList from "../components/MatchList.jsx";

function Catalog({ matches }) {
  return (
    <main>
      <h1 className="page-title">Upcoming Matches</h1>
      <MatchList matches={matches} />
    </main>
  );
}

export default Catalog;
