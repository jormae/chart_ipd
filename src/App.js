import React from "react";
import { Routes, Route } from "react-router-dom";
import MiniDrawer from "./components/Drawer";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Summary from "./views/Summary";
// import PositionForm from "./views/PositionForm";
// import Branch from "./views/Branch";
// import BranchForm from "./views/BranchForm";
function App() {
  return (
    <div>
      <MiniDrawer>
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
        {/* </Layout> */}
      </MiniDrawer>
    </div>
  );
}

export default App;
