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
import HRCardLottie from "../../assets/media/lotties/41291-human-resources-approval-animation.json";
import SettingsCardLottie from "../../assets/media/lotties/110200-mobile-setting.json";

type MenuComponentProps = {
  rol: string;
};

function MenuComponent(props: MenuComponentProps): JSX.Element {
  const [menus, setMenus] = useState<MenusEnum[]>([]);

  useEffect(() => {
    assignPermissions();
  }, [props.rol]);

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
                <CardActionArea href="/newsletter">
                  <Lottie animationData={bannersLottie} loop={true} />
                  <CardContent style={{ height: "120px" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Newsletter
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Manage your newsletter´s; create, edit, and delete them.
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
                <CardActionArea href="/users">
                  <Lottie animationData={HRCardLottie} />
                  <CardContent style={{ height: "120px" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Users
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Manage your users, their permissions, and their roles.
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
                <CardActionArea href="/resports">
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
