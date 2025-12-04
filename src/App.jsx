import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// COMP
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MatchCard from "./components/MatchCard.jsx";
import MatchList from "./components/MatchList.jsx";

// PAGES
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import MatchDetails from "./pages/MatchDetails.jsx";
import CreateMatch from "./pages/CreateMatch.jsx";
import EditMatch from "./pages/EditMatch.jsx";

function App() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      title: "Sunday League",
      date: "2025-11-09",
      location: "Studentski",
    },
    {
      id: 2,
      title: "After-work 5v5",
      date: "2025-11-12",
      location: "Nadezhda",
    },
    { id: 3, title: "Weekend Cup", date: "2025-11-15", location: "Druzhba" },
  ]);

  function handleCreateMatch(matchData) {
    const newMatch = {
      id: Date.now(), // проста уникална стойност
      ...matchData,
    };

    setMatches((prevMatches) => [...prevMatches, newMatch]);
  }

  function handleEditMatch(matchId, updatedData) {
    setMatches((prevMatches) =>
      prevMatches.map((m) => (m.id === matchId ? { ...m, ...updatedData } : m))
    );
  }

  function handleDeleteMatch(matchId) {
    setMatches((prevMatches) => prevMatches.filter((m) => m.id !== matchId));
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog matches={matches} />} />
        <Route
          path="/matches/:matchId"
          element={
            <MatchDetails matches={matches} onDeleteMatch={handleDeleteMatch} />
          }
        />
        <Route
          path="/matches/:matchId/edit"
          element={
            <EditMatch matches={matches} onEditMatch={handleEditMatch} />
          }
        />
        <Route
          path="/create"
          element={<CreateMatch onCreateMatch={handleCreateMatch} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
