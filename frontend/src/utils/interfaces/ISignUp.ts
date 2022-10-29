import RoleEnum from "../enums/RoleEnum";

export default interface ISignUpRequest {
  rol: RoleEnum;
  email: string;
  password: string;
  password_repeat: string;
  isActive: boolean;
  telefono: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  fecha_nacimiento: string;
  genero: string;
}