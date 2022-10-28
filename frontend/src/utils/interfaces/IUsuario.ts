import RoleEnum from "../enums/RoleEnum";

export interface IUsuario {
  contrato: string;
  rol: RoleEnum;
  sucursalId: number;
  jobPosicitionId?: number;
  jobPosicitionName?: string;
  cloudMessaging_token?: string;
  generalData: IUsuarioGeneralData;
  address?: IUsuarioAddress[];
  conditions: IUsuarioConditions;
  dependents?: IUsuarioDependents[];
}

export interface IUsuarioGeneralData {
  curp?: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  email: string;
  telefono?: string;
  lastChangePassword?: string;
  createdAt?: string;
}

export interface IUsuarioAddress {
  tipoVialidad: string;
  nombreVialidad: string;
  mzoni: string;
  ltone: string;
  colonia: string;
  cp: string;
  municipioID: string;
  estadoID: string;
  latitud: string;
  longitud: string;
}

export interface IUsuarioConditions {
  acceptNewsletter?: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  acceptNotifications?: boolean;
}

export interface IUsuarioDependents {
  curp: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  relationship: string;
  isIndependentAccount: boolean;
  address: IUsuarioAddress[];
  createdAt: string;
}
