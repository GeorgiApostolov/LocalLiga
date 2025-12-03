import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMP
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MatchCard from "./components/MatchCard.jsx";
import MatchList from "./components/MatchList.jsx";

// PAGES
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import MatchDetails from "./pages/MatchDetails.jsx";

function App() {
  const matches = [
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
  ];

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog matches={matches} />} />
        <Route
          path="/matches/:matchId"
          element={<MatchDetails matches={matches} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
