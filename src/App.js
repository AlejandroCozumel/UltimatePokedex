import "./App.css";
import React from "react";
import Pokeball from "./Views/Pokeball.jsx";
import Camera from "./Views/Camera.jsx";

function App() {
  return (
    <>
      <Pokeball />
      <div className="main">
        {" "}
        <Camera />
      </div>
    </>
  );
}

export default App;
