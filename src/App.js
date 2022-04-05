import React from "react";
import Facture from "./components/Facture";
import Settings from "./components/Settings";
import "./App.css";
function App() {
  return (
    <div className='app'>
      <Facture />
      <Settings />
    </div>
  );
}

export default App;
