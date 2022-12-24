import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Products />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
