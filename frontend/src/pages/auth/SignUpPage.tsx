import { FormEvent, useContext, useState, Fragment } from "react";
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
import { AuthContext } from "../../context/Authentication/AuthContext";
import RoleEnum from "../../utils/enums/RoleEnum";
import ISignUpRequest from "../../utils/interfaces/ISignUp";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ModalComponent from "../../components/common/ModalComponent";

export default function SignUpPage() {
  const { signUp } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  const [credentials, setCredentials] = useState<ISignUpRequest>({
    rol: RoleEnum.USER,
    email: '',
    password: '',
    password_repeat: '',
    isActive: true,
    telefono: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    fecha_nacimiento: '',
    genero: '',
    acceptTerms: false,
    acceptPrivacy: false,
    acceptNewsletters: false,
  });


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trySignup = await signUp(credentials);
    if (trySignup === true) {
      setOpen(true);
      return;
    }

  };

  const handleInputChange = (propiedad: string, valor: any) => {
    setCredentials({
      ...credentials,
      [propiedad]: valor,
    });
  }



  return (
    <Fragment>
      <ModalComponent
        open={open}
        title="Registro exitoso"
        content="Se ha registrado exitosamente, por favor inicie sesión"
        setOpen={() => {
          window.location.href = '/';
          setOpen(false);
        }}
        onAccept={() => {
          window.location.href = '/';
        }}
      />
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    label="Nombre"
                    autoFocus
                    value={credentials.nombre}
                    inputProps={{
                      pattern: "[A-Za-z]{1,20}",
                    }}
                    onChange={(e) => {
                      handleInputChange("nombre", e.target.value);
                    }}
                  />
                </Grid>


                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Apellido Paterno"
                    value={credentials.apaterno}
                    onChange={(e) =>
                      handleInputChange("apaterno", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Apellido Materno"
                    value={credentials.amaterno}
                    onChange={(e) =>
                      handleInputChange("amaterno", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Telefono"
                    value={credentials.telefono}
                    onChange={(e) =>
                      handleInputChange("telefono", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Fecha de Nacimiento"
                    value={credentials.fecha_nacimiento}
                    onChange={(e) =>
                      handleInputChange("fecha_nacimiento", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Genero</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={credentials.genero}
                      label="Age"
                      onChange={(e) =>
                        handleInputChange("genero", e.target.value)
                      }
                    >
                      <MenuItem value={""}></MenuItem>
                      <MenuItem value={"M"}>Masculino</MenuItem>
                      <MenuItem value={"F"}>Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Correo Electrónico"
                    autoComplete="email"
                    value={credentials.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
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
                    value={credentials.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
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
                    value={credentials.password_repeat}
                    onChange={(e) =>
                      handleInputChange("password_repeat", e.target.value)
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
                          handleInputChange("acceptTerms", e.target.checked)
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
                          handleInputChange("acceptPrivacy", e.target.checked)
                        }
                      />
                    }
                    label="Acepto la política de privacidad."
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
                          handleInputChange("acceptNewsletters", e.target.checked)
                        }
                      />
                    }
                    label="Deseo recibir correos electrónicos de promociones y ofertas."
                  />
                </Grid>

              </Grid>

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
    </Fragment>
  );
}
