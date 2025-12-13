import { useState } from "react";
import MatchList from "../components/MatchList";

function Catalog({ matches }) {
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const sortedMatches = [...matches].sort((a, b) => {
    const diff = new Date(a.date) - new Date(b.date);
    return sortOrder === "asc" ? diff : -diff;
  });

  function toggleSort() {
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
  }

  return (
    <main>
      <h1 className="page-title">Upcoming Matches</h1>

      <button onClick={toggleSort} style={{ marginBottom: "1rem" }}>
        Sort by date {sortOrder === "asc" ? "↑" : "↓"}
      </button>

      <MatchList matches={sortedMatches} />
    </main>
  );
}

export default Catalog;
