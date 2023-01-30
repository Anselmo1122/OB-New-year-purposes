import React, { useState } from "react"
import "./index.scss";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function App() {

  const [next, setNext] = useState(false);

  return (
    <div className="App">
      <Header next={{ next, setNext } }/>
      {
        next && <Dashboard next={{ next, setNext } }/>
      }
    </div>
  );
}

export default App;