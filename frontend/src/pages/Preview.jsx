// src/pages/CryoPreview.jsx

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Layout from "../layout/Layout";

const BackgroundLayer = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundImage: "url('/assets/background1.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.5)",
  zIndex: -1,
});

const FrostedPanel = styled(Paper)(({ theme }) => ({
  margin: "20px",
  width: "calc(100% - 40px)",
  height: "calc(100% - 40px)",
  padding: "2rem",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 40px rgba(0,255,200,0.25)",
  borderRadius: "20px",
  color: theme.palette.text.primary,
  overflow: "auto",
}));

export default function CryoPreview() {
  return (
    <Layout>
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center", position: "relative" }}>
        <BackgroundLayer />
        <FrostedPanel elevation={6}>
          <Typography variant="h4" gutterBottom>
            🎨 CryoChrome UI Test Panel
          </Typography>
          <Typography variant="body1">
            Tweak spacing, shadows, glow, and layout here without routing noise.
          </Typography>
        </FrostedPanel>
      </Box>
    </Layout>
  );
}
