import RoleEnum from "../enums/RoleEnum";
import IPersona from "./IPersona";

export default interface IUsuario {
  usuario_id: number;
  persona_id: number | IPersona;
  rol: RoleEnum;
  email: string;
  password: string;
  token: string | null;
  token_recovery: string | null;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
  deleteAt: Date;
}