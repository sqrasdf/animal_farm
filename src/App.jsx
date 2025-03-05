import { useEffect, useState } from "react";
import "./App.css";

import Animal from "../components/Animal";

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  return (
    <>
      <div className="search-container">
        <h1>Animal Farm</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </div>

      <div className="animals-container">
        {animals.map((animal) => (
          <div className="animal-card" key={animal.id}>
            <Animal {...animal} />
          </div>
        ))}
        {animals.length === 0 && <p className="no-animals">No animals found</p>}
      </div>
    </>
  );
}

export default App;
