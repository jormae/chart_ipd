import React from "react";
import { Routes, Route } from "react-router-dom";
import MiniDrawer from "./components/Drawer";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Summary from "./views/Summary";
import ReturnSummary from "./views/Return-Summary";
import Reaudit from "./views/Reaudit";
import Login from "./views/Login";

function App() {
  return (
    <div>
      <MiniDrawer>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/return-summary" element={<ReturnSummary />} />
          <Route path="/reaudit" element={<Reaudit />} />
        </Routes>
      </MiniDrawer>
    </div>
  );
}

export default App;
