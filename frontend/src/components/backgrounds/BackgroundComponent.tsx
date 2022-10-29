import { useContext, ReactNode } from "react";
import { ThemeProvider } from "@emotion/react";
import { Breadcrumbs, CssBaseline, Grid, Link, Typography, Button } from "@mui/material";
import healthyTheme from "../../themes/theme";
import AlertDialogComponent from "../common/DialogComponent";
import { AuthContext } from "../../context/Authentication/AuthContext";

type Props = {
  children: React.ReactNode;
  breadCrumb?: {
    name: string;
    link: string;
  }[];
  whitHeader?: boolean;
};

export default function BackgroundComponent({ children, breadCrumb, whitHeader }: Props): JSX.Element {
  const { logOut, user } = useContext(AuthContext);

  const header = () => {
    return (
      <Grid
        container
        bgcolor={"primary.main"}
        height={100}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={10} p={2}>
          <Typography
            variant="h4"
            color="white"
            fontWeight="bold"
            paddingLeft={10}
          >
            Bienvenido {user?.persona?.nombre} | {user?.rol}
          </Typography>
        </Grid>
        <Grid item xs={2} p={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => logOut()}
          >
            <Typography
              variant="h6"
              color="white"
              fontWeight="bold"
              textAlign="right"
            >
              Cerrar sesión
            </Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }

  const BreadCrumb = () => {
    return <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      {breadCrumb?.map((item: { name: string; link: string; }, index: number) => {
        return <Link
          underline="hover"
          color="inherit"
          href={item.link}
          key={index}
        >
          {item.name}
        </Link>
      })}
    </Breadcrumbs>
  }

  return (
    <ThemeProvider theme={healthyTheme}>
      <CssBaseline />
      {whitHeader ? header() : null}
      {breadCrumb && breadCrumb.length > 0 ? <BreadCrumb /> : null}
      <br />
      <br />
      {children}
      <AlertDialogComponent />
    </ThemeProvider>
  );
}
