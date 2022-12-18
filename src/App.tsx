import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Products />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
