import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Position from "./views/Position";
import PositionForm from "./views/PositionForm";
import Branch from "./views/Branch";
import BranchForm from "./views/BranchForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Position />} />
        <Route path="position" element={<Position />} />
        <Route path="position/:positionId" element={<PositionForm />} />
        <Route path="branch" element={<Branch />} />
        <Route path="branch/:branchId" element={<BranchForm />} />
      </Routes>
    </div>
  );
}

export default App;
