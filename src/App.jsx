import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as matchesApi from "./api/matches";

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
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// GUARDS
import PrivateRoute from "./guards/PrivateRoute.jsx";
import GuestRoute from "./guards/GuestRoute.jsx";

function App() {


function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  async function reloadMatches() {
    const data = await matchesApi.getAllMatches();
    setMatches(data);
  }

  useEffect(() => {
    (async () => {
      try {
        await reloadMatches();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

        {/* PRIVATE */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/create"
            element={<CreateMatch onCreateMatch={handleCreateMatch} />}
          />
          <Route
            path="/matches/:matchId/edit"
            element={
              <EditMatch matches={matches} onEditMatch={handleEditMatch} />
            }
          />
        </Route>

        {/* GUEST */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
