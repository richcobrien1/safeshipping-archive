import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AgentDashboard from "./roles/AgentDashboard";
import OpsDashboard from "./roles/OpsDashboard";
import FieldRepDashboard from "./roles/FieldRepDashboard";
import LoginPage from "./auth/LoginPage";
import { useAuth } from "./auth/AuthContext";

export default function AppRoutes() {
  const { role, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) return null;

  if (!role && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/agent" element={<AgentDashboard />} />
      <Route path="/ops" element={<OpsDashboard />} />
      <Route path="/field" element={<FieldRepDashboard />} />
    </Routes>
  );
}
