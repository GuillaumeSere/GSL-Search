import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:search" element={<Search />} />
      </Routes>
  );
}

export default App;
