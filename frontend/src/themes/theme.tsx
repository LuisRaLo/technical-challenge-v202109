import { createTheme } from "@mui/material/styles";

const healthyTheme = createTheme({
  palette: {
    primary: {
      main: "#2ED3D9",
    },
    secondary: {
      main: "#ff6d00",
    },
    error: {
      main: "#d50000",
    },
    warning: {
      main: "#ffab00",
    },
    info: {
      main: "#2962ff",
    },
    success: {
      main: "#00c853",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.75,

      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
  },
});

export default healthyTheme;
