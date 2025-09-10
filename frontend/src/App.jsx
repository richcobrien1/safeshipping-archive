import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppRoutes from "./AppRoutes";
import SiteTheme from "./themes/theme.cryochrome";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./auth/LoginPage";
import AgentDashboard from "./roles/AgentDashboard";
import FieldRepDashboard from "./roles/FieldRepDashboard";
import OpsDashboard from "./roles/OpsDashboard";
import GlassTester from "./pages/GlassTester";
import Preview from "./pages/Preview";

export default function App() {
  return (
    <ThemeProvider theme={SiteTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/field" element={<FieldRepDashboard />} />
            <Route path="/ops" element={<OpsDashboard />} />
            <Route path="/glass-test" element={<GlassTester />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="*" element={<AppRoutes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
