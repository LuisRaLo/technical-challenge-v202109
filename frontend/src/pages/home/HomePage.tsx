import { useContext } from "react";
import { AuthContext } from "../../context/Authentication/AuthContext";
import { Button, Grid, Typography } from "@mui/material";
import BackgroundComponent from "../../components/backgrounds/BackgroundComponent";

export default function Home() {
  const { logOut, user } = useContext(AuthContext);
  return (
    <BackgroundComponent>
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
            Bienvenido {user?.email} a{" "}
          </Typography>
        </Grid>

        <Grid item xs={2} textAlign="right" paddingRight={10}>
          <Button variant="text" onClick={() => logOut()} color={"inherit"}>
            <Typography variant="h6" color="white" fontWeight={"bold"}>
              Sign Out
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </BackgroundComponent>
  );
}
