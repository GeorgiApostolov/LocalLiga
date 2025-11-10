import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />

      <main>
        <h1>Welcome to LocalLiga</h1>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </main>
      <Footer />
    </>
  );
}

export default App;
