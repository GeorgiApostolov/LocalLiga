import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import MatchDetails from "./pages/MatchDetails";
import CreateMatch from "./pages/CreateMatch";
import EditMatch from "./pages/EditMatch";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./guards/PrivateRoute";
import GuestRoute from "./guards/GuestRoute";

import * as matchesApi from "./api/matches";

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

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <h2>Loading...</h2>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog matches={matches} />} />

        <Route
          path="/matches/:matchId"
          element={<MatchDetails matches={matches} onDeleted={reloadMatches} />}
        />

        <Route element={<PrivateRoute />}>
          <Route
            path="/create"
            element={<CreateMatch onCreated={reloadMatches} />}
          />
          <Route
            path="/matches/:matchId/edit"
            element={<EditMatch matches={matches} onEdited={reloadMatches} />}
          />
        </Route>

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
