import { FormEvent, useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CopyrightComponent from "../../components/common/CopyrightComponent";
import BackgroundComponent from "../../components/backgrounds/BackgroundComponent";
import IUsuario from "../../utils/interfaces/IUsuario";
import { AuthContext } from "../../context/Authentication/AuthContext";
import RoleEnum from "../../utils/enums/RoleEnum";

export default function SignUpPage() {
  const { signUp } = useContext(AuthContext);

  const [credentials, setCredentials] = useState<IUsuario>({
    usuario_id: 0,
    persona_id: 0,
    rol: RoleEnum.USER,
    email: "",
    password: "",
    token: null,
    token_recovery: null,
    isActive: false,
    createdAt: new Date(),
    updateAt: new Date(),
    deleteAt: new Date(),
  });
  const [contrasenas, setContrasenas] = useState({
    contrasena: "",
    contrasena2: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      signUp(credentials, contrasenas);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleInputChange = (propiedad: string, valor: any) => {
    setCredentials({
      ...credentials,
      [propiedad]: valor,
    });
  }


  return (
    <BackgroundComponent>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro Temporal
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  label="Nombre"
                  autoFocus
                  value={credentials.generalData.nombre}
                  inputProps={{
                    pattern: "[A-Za-z]{1,20}",
                  }}
                  onChange={(e) => {
                    handleInputChange("generalData", "nombre", e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Apellido Paterno"
                  value={credentials.generalData.apaterno}
                  onChange={(e) =>
                    handleInputChange("generalData", "apaterno", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Apellido Materno"
                  value={credentials.generalData.amaterno}
                  onChange={(e) =>
                    handleInputChange("generalData", "amaterno", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Correo Electrónico"
                  autoComplete="email"
                  value={credentials.generalData.email}
                  onChange={(e) =>
                    handleInputChange("generalData", "email", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  autoComplete="new-password"
                  value={contrasenas.contrasena}
                  onChange={(e) =>
                    setContrasenas({
                      ...contrasenas,
                      contrasena: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Repetir Contraseña"
                  type="password"
                  autoComplete="new-password"
                  value={contrasenas.contrasena2}
                  onChange={(e) =>
                    setContrasenas({
                      ...contrasenas,
                      contrasena2: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="true"
                      color="primary"
                      onChange={(e) =>
                        handleInputChange(
                          "conditions",
                          "acceptTerms",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Deseo recibir correos electrónicos de promociones y ofertas."
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="true"
                      color="primary"
                      required
                      onChange={(e) =>
                        handleInputChange(
                          "conditions",
                          "acceptPrivacy",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Acepto los términos y condiciones."
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="true"
                      color="primary"
                      required
                      onChange={(e) =>
                        handleInputChange(
                          "conditions",
                          "acceptNotifications",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Acepto la política de privacidad."
                />
              </Grid>
            </Grid>
 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Ya tengo una cuenta, iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyrightComponent sx={{ mt: 5 }} />
      </Container>
    </BackgroundComponent>
  );
}
