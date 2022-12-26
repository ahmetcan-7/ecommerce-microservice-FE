import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
