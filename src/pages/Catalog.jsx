import MatchList from "../components/MatchList.jsx";

function Catalog({ matches }) {
  return (
    <main>
      <h1>Upcoming Matches</h1>
      <MatchList matches={matches} />
    </main>
  );
}

export default Catalog;
