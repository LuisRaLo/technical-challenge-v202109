import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import RoleEnum from "../../utils/enums/RoleEnum";
import MenusEnum from "../../utils/enums/MenusEnum";

import Lottie from "lottie-react";
import bannersLottie from "../../assets/media/lotties/9386-banner-app-animation.json";
import importDataLottie from "../../assets/media/lotties/54778-files-imported.json";
import notificationsCardLottie from "../../assets/media/lotties/93038-notifications.json";
import POSCardLottie from "../../assets/media/lotties/116785-pos-phone-letim.json";
import HRCardLottie from "../../assets/media/lotties/41291-human-resources-approval-animation.json";
import SettingsCardLottie from "../../assets/media/lotties/110200-mobile-setting.json";
import ManageBusinessCardLottie from "../../assets/media/lotties/99797-data-management.json";

type MenuComponentProps = {
  rol: string;
};

function MenuComponent(props: MenuComponentProps): JSX.Element {
  const [menus, setMenus] = useState<MenusEnum[]>([]);

  useEffect(() => {
    assignPermissions();
  }, [props.rol]);

  //TODO: Verificar Permisos por Rol y acomodarlos en un orden más lógico
  /*TODO: Asignar el rola desde la base de datos para que sea más dinamico aunque 
    mejor que se analice para evitar escribir en la base de datos si existiera 
    alguna actualizacion de menus vs rol
  */
  const assignPermissions = () => {
    switch (props.rol) {

      case RoleEnum.ADMINISTRATOR:
        setMenus([
          MenusEnum.USERS,
          MenusEnum.NEWSLETTER,
          MenusEnum.REPORTS,

          MenusEnum.CONFIGURATION,
        ]);
        break;

      case RoleEnum.USER:
        setMenus([MenusEnum.CONFIGURATION]);
        break;

      default:
        return (
          <div>
            <Typography variant="h6" color="white" fontWeight={"bold"}>
              No tiene permisos
            </Typography>
          </div>
        );
    }
  };

  //TODO: Se puede hacer un componente para solo maperar los menus
  const MenuJSX = () => {
    const menusArray = menus.map((menu, index) => {
      switch (menu) {


        case MenusEnum.CONFIGURATION:
          return (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="/admin/imports/catalogos" disabled>
                  <Lottie animationData={SettingsCardLottie} />
                  <CardContent style={{ height: "120px" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Settings
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Manage your settings.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );


        case MenusEnum.NEWSLETTER:
          return (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="/admin/banners">
                  <Lottie animationData={bannersLottie} loop={true} />
                  <CardContent style={{ height: "120px" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Promotion
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Manage your promotion, create, edit, and delete them.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );

        case MenusEnum.USERS:
          return (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="/admin/users">
                  <Lottie animationData={HRCardLottie} />
                  <CardContent style={{ height: "120px" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Human Resources
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Manage your employees, their permissions, catalogues and
                      more.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );

        case MenusEnum.REPORTS:
          return (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="/admin/users">
                  <Lottie animationData={HRCardLottie} />
                  <CardContent style={{ height: "120px" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Reports
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Manage your reports.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );

        default:
          return <div key={index}> </div>;
      }
    });

    return (
      <Grid container spacing={2}>
        {menusArray}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid container marginTop={5} spacing={2} mb={10}>
        <MenuJSX />
      </Grid>
    </Container>
  );
}

export default MenuComponent;
