import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MatchCard from "./components/MatchCard.jsx";
import MatchList from "./components/MatchList.jsx";

function App() {
  const [count, setCount] = useState(0);

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
    <>
      <Header />

      <main>
        <h1>Upcoming Matches</h1>

        <MatchList matches={matches} />
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </main>
      <Footer />
    </>
  );
}

export default App;
