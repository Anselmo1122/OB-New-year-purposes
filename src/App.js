import React, { useState, useEffect } from "react"
import "./index.scss";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const initialState = JSON.parse(localStorage.getItem("purposes"));

function App() {

  const [purposes, setPurposes] = useState(initialState || [])
  const [next, setNext] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("purposes", JSON.stringify(purposes), [purposes])
  })

  return (
    <div className="App">
      <Header next={{ next, setNext } }/>
      {
        next && <Dashboard 
          next={{ next, setNext }} 
          purpose={{ purposes, setPurposes }} 
        />
      }
    </div>
  );
}

export default App;