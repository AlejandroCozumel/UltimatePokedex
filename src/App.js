import "./App.css";
import React from "react";
import Pokeball from "./Views/Pokeball.jsx";
import CameraModule from "./Views/CameraModule.jsx";

function App() {
  return (
    <>
      <div className="container">
        <Pokeball />
        <div className="main">
          <CameraModule />
        </div>
      </div>
    </>
  );
}

export default App;
