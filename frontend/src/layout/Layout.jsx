// src/components/Layout.jsx

import React from "react";
import { useAuth } from "../auth/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "../locales/index";

const FrostedHeader = styled(AppBar)(({ theme }) => ({
  width: "calc(100% - 40px)",
  margin: "0 20px",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: "rgba(0, 255, 200, 0.05)",
  boxShadow: "0 0 20px rgba(0,255,200,0.15)",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0 0 20px 20px",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 10,
}));

export default function Layout({ children }) {
  const { language, setLanguage, role, login, logout } = useAuth();
  const location = useLocation();

  const handleRoleSelect = (newRole) => {
    if (newRole) login(newRole);
  };

  const navigate = useNavigate(); // ✅ correctly scoped here

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const path = location.pathname;
  const dashboardKey = path.slice(1);
  const isLogin = path === "/login";

  const title = isLogin
    ? t("login.title", language)
    : t(`dashboard.title.${dashboardKey}`, language) || t("login.title", language);

  return (
    <Box>
      <FrostedHeader position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            🚢 {title}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <ToggleButtonGroup
              exclusive
              value={language}
              onChange={(e, val) => val && setLanguage(val)}
              size="small"
              color="secondary"
            >
              <ToggleButton value="en">🇺🇸 EN</ToggleButton>
              <ToggleButton value="es">🇪🇸 ES</ToggleButton>
              <ToggleButton value="ja">🇯🇵 JA</ToggleButton>
            </ToggleButtonGroup>

            {isLogin && (
              <ToggleButtonGroup
                exclusive
                value={role}
                onChange={(e, val) => handleRoleSelect(val)}
                size="small"
                color="primary"
              >
                <ToggleButton value="agent">{t("roles.agent", language)}</ToggleButton>
                <ToggleButton value="field">{t("roles.field", language)}</ToggleButton>
                <ToggleButton value="ops">{t("roles.ops", language)}</ToggleButton>
              </ToggleButtonGroup>
            )}

            {!isLogin && (
              <Box
                onClick={handleLogout}
                sx={{
                  cursor: "pointer",
                  color: "text.primary", // Matches standard menu text color
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    color: "error.main", // 🔴 Red on hover
                    transform: "scale(1.1)"
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <LogoutIcon sx={{ fontSize: 28 }} />
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                  {t("header.logout", language)}
                </Typography>
              </Box>
            )}

          </Box>
        </Toolbar>
      </FrostedHeader>

      <Box sx={{ mt: 10 }}>{children}</Box>
    </Box>
  );
}
