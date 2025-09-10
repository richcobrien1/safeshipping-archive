// src/themes/theme.cryochrome.js

import { createTheme } from "@mui/material/styles";

const CryoChromeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ffc8", // brighter aqua-green
      contrastText: "#e0faff"
    },
    secondary: {
      main: "#00e6b8"
    },
    background: {
      default: "#006156FF",
      paper: "rgba(255, 255, 255, 0.05)"
    },
    text: {
      primary: "#e0fff5",
      secondary: "#a0ffe6",
      disabled: "#88b1c0"
    },
    divider: "rgba(255,255,255,0.08)"
  },
  typography: {
    fontFamily: "Segoe UI, Roboto, sans-serif",
    h1: { color: "#e0fff5" },
    h2: { color: "#c5f6fb" },
    h3: { color: "#a0e8ef" },
    button: {
      fontWeight: 500,
      textTransform: "none"
    }
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0,255,200,0.08)",
    "0px 6px 12px rgba(0,255,200,0.15)",
    "0px 12px 24px rgba(0,255,200,0.2)",
    ...Array(22).fill("0 0 18px rgba(0,255,200,0.08)")
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(1px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 20px rgba(0,255,200,0.1)",
          borderRadius: "20px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          background: "linear-gradient(to right, #003c50, #00ffc833)",
          color: "#e0fff5",
          boxShadow: "0 0 12px rgba(0,255,200,0.2)",
          "&:hover": {
            background: "linear-gradient(to right, #005a78, #00FFC866)",
            boxShadow: "0 0 24px rgba(0,255,200,0.4)"
          }
        }
      }
    }
  },
  custom: {
    glassBackground: {
      background: "linear-gradient(135deg, rgba(0,30,45,0.8), rgba(0,60,80,0.8))",
      backdropFilter: "blur(1px) saturate(160%)",
      WebkitBackdropFilter: "blur(1px) saturate(160%)"
    }
  }
});

export default CryoChromeTheme;
