// src/components/LoginPage.jsx

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "./AuthContext";
import { t } from "../locales/index";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

// const BackgroundLayer = styled(Box)({
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   zIndex: -2,
//   backgroundImage: "url('/assets/background2.jpg')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   filter: "brightness(0.5)"
// });

const VideoBackground = styled("video")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  zIndex: -2,
  filter: "brightness(0.4)", // optional dimming
});

const FrostedPanel = styled(Paper)(({ theme }) => ({
  margin: "20px",
  width: "calc(100% - 40px)",
  height: "calc(100% - 40px)",
  padding: "4rem",
  backdropFilter: "blur(3px)",
  WebkitBackdropFilter: "blur(3px)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 40px rgba(0,255,200,0.15)",
  borderRadius: "20px",
  color: theme.palette.text.primary,
  overflow: "auto"
}));

export default function LoginPage() {
  const { login, language, role } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role) {
      login(role);               // ensure login state is set
      navigate(`/${role}`);      // redirect to dashboard
    }
  };

  useEffect(() => {
    console.log("👁️ LoginPage mounted");
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 10,
        }}
      >
        {/* <BackgroundLayer /> */}
        <VideoBackground autoPlay loop muted playsInline>
          <source src="/assets/background-video1.mp4" type="video/mp4" />
        </VideoBackground>
        <FrostedPanel elevation={6}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {t("login.title", language)}
          </Typography>
          <Button
            variant="contained"
            disabled={!role}
            onClick={handleLogin}
          >
            🚀 {t("login.button", language)}{role ? ` ${t(`roles.${role}`, language)}` : ""}
          </Button>
        </FrostedPanel>
      </Box>
    </Layout>
  );
}
