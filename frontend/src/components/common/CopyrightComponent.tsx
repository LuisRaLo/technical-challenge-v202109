import { Link, Typography } from "@mui/material";

export default function CopyrightComponent(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright© healthy App "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
