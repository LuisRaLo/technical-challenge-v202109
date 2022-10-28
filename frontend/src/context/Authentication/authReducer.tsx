import IBusinessAccount from "../../utils/interfaces/IBusinessAccount";
import { IUsuario } from "../../utils/interfaces/IUsuario";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  errorMessage: { title?: string; message: string; actions?: any } | undefined;
  user: IUsuario | null;
  businessAccount: IBusinessAccount | null;
}

type AuthAction =
  | { type: "login"; payload: { user: IUsuario, businessAccount: IBusinessAccount } }
  | { type: "signUp" }
  | {
      type: "addError";
      payload: { title?: string; message: string; action?: any };
    }
  | { type: "removeError" }
  | { type: "notAuthenticated" }
  | { type: "logout" }
  | { type: "updateUser"; payload: { user: IUsuario } };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        user: null,
        status: "not-authenticated",
        errorMessage: action.payload,
      };

    case "removeError":
      return {
        ...state,
        errorMessage: undefined,
      };

    case "login":
      return {
        ...state,
        errorMessage: undefined,
        status: "authenticated",
        user: action.payload.user,
        businessAccount: action.payload.businessAccount,
      };

    case "signUp":
      return {
        ...state,
        errorMessage: undefined,
        status: "not-authenticated",
        user: null,
      };

    case "logout":
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        user: null,
      };

    case "updateUser":
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
