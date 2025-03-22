import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/FormPage";
import CustomerDetails from "./pages/CustomerDetails";

export default function App() {
  return (
    <AuthProvider>
      <Router >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form" element={
            <ProtectedRoute>
              <FormPage />
            </ProtectedRoute>
            } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
             </ProtectedRoute>
          } />
          <Route path="/customers/:id" element={<CustomerDetails />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
