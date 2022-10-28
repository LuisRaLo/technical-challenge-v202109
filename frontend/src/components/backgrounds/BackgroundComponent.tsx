import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import healthyTheme from "../../themes/theme";
import AlertDialogComponent from "../common/DialogComponent";

type Props = {
  children: React.ReactNode;
};

export default function BackgroundComponent({ children }: Props): JSX.Element {
  return (
    <ThemeProvider theme={healthyTheme}>
      <CssBaseline />
      {children}
      <AlertDialogComponent />
    </ThemeProvider>
  );
}
