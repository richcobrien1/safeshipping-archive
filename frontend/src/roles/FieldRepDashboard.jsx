// src/roles/FieldRepDashboard.jsx

import React from "react";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../auth/AuthContext";
import { t } from "../locales/index";
import Layout from "../layout/Layout";
import FormPanel from "../components/intake/FormPanel";

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
  padding: "2rem",
  backdropFilter: "blur(3px)",
  WebkitBackdropFilter: "blur(3px)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 40px rgba(0,255,200,0.15)",
  borderRadius: "20px",
  color: theme.palette.text.primary,
  overflow: "auto"
}));

export default function FieldRepDashboard() {
  const { language } = useAuth();

  return (
    <Layout>
      <Box sx={{ 
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 10, 
        position: "relative" 
      }}>
        <VideoBackground autoPlay loop muted playsInline>
          <source src="/assets/background-login.mp4" type="video/mp4" />
        </VideoBackground>
        <FrostedPanel elevation={6}>
          <FormPanel title={t("Field Rep Submission Intake", language) || "Field Rep Submission Intake"} />
        </FrostedPanel>
      </Box>
    </Layout>
  );
}
