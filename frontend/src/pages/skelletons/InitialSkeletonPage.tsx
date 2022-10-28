import { Container, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Fragment } from "react";

export default function InitialSkeletonPage() {
  return (
    <Fragment>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton
              variant="text"
              sx={{ fontSize: "10rem" }}
              animation="wave"
            />
          </Grid>

          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" height={100} width={100} />
          </Grid>

          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>

          <Grid item xs={12}>
            <Skeleton variant="rounded" height={60} />
          </Grid>

          <Grid item xs={12}>
            <Skeleton variant="rounded" height={60} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
