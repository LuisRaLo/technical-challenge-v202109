import { useContext } from "react";
import { AuthContext } from "../../context/Authentication/AuthContext";
import BackgroundComponent from "../../components/backgrounds/BackgroundComponent";
import MenuComponent from "../../components/dashboard/menuComponent";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <BackgroundComponent whitHeader={true}>

      <MenuComponent rol={user?.rol as string} />

    </BackgroundComponent >
  );
}
