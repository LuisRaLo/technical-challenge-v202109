import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./authReducer";
import IUsuario from "../../utils/interfaces/IUsuario";
import useAsyncStorage from "../../hooks/useAsynStorage";
import AuthException from "../../utils/exceptions/authException";
import useFetchAuth, { ISigninResponse } from "../../hooks/useFetchAuth";
import useFetchTest from "../../hooks/useFetchTest";
import useFetchUsuarios from "../../hooks/useFetchUsuarios";
import ISignUpRequest from "../../utils/interfaces/ISignUp";
import ValidationHelper from "../../utils/helpers/ValidationHelper";

type AuthContextProps = {
  errorMessage: { title?: string; message: string } | undefined;
  user: IUsuario | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: (payload: ISignUpRequest) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => void;
  removeError: () => void;
  recoverPassword: (email: string) => Promise<void>;
  updateUser: (user: IUsuario) => Promise<void>;
};

const authInicialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: undefined,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  const { setItem, getItem, removeItem } = useAsyncStorage();
  const { signin, signup } = useFetchAuth();
  const { isValidateJwt } = useFetchTest();
  const { getUsuarioByID } = useFetchUsuarios();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const objJWT = await getItem();

    if (objJWT !== null) {

      const { jwt } = objJWT;
      const isValidate: any = await isValidateJwt(jwt);
      if (isValidate.message === "Token válido") {
        const user = await getUsuarioByID(isValidate.result.id, jwt);
        
        if (user) {
          return dispatch({
            type: "login",
            payload: { user },
          });
        }

        return dispatch({
          type: "notAuthenticated",
        });
      }

    };
    await removeItem();
    return dispatch({ type: "notAuthenticated" });
  }

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  const signUp = async (
    payload: ISignUpRequest,
  ): Promise<boolean> => {
    try {

      const isValid = ValidationHelper.validateSignUpRequest(payload);
      console.log(isValid);

      if (isValid === true) {
        
        const trySignup = await signup(payload);
        console.log(trySignup);

        return true;

        //dispatch({ type: "signUp" });
      }

      dispatch({
        type: "addError",
        payload: {
          title: 'Error',
          message: isValid as string,
        },
      });

      return false;
    } catch (error: any) {
      const exception = AuthException.getExceptions(error);
      dispatch({
        type: "addError",
        payload: {
          title: exception.data.mensaje,
          message: exception.data.resultado,
        },
      });
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userResponse: ISigninResponse = await signin(email, password);

      if (userResponse.resultado instanceof Object) {
        dispatch({ type: "login", payload: { user: userResponse.resultado as IUsuario } });

        setItem({ jwt: userResponse.resultado.token as string });

        return true;

      } else {
        dispatch({
          type: "addError",
          payload: {
            title: userResponse.mensaje,
            message: userResponse.resultado as string,
          },
        });

        dispatch({ type: "notAuthenticated" });
        return false;
      }
    } catch (error: any) {
      const exception = AuthException.getExceptions(error);
      dispatch({
        type: "addError",
        payload: {
          title: exception.data.mensaje,
          message: exception.data.resultado,
        },
      });
      return false;
    }
  };

  const setError = (error: any, title?: string, actions?: any) => {
    if (title || actions) {
      const objErr = {
        title: title ? error.title : "Alerta",
        message: error,
        actions: actions ? error.actions : [],
      };

      return dispatch({
        type: "addError",
        payload: objErr,
      });
    } else {
      const objErr = {
        title: "Alerta",
        message: error,
        actions: [],
      };
      return dispatch({
        type: "addError",
        payload: objErr,
      });
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      await removeItem();
      return dispatch({ type: "notAuthenticated" });
    } catch (error) {
      console.log(error);
      return setError(error);
    }
  };

  const updateUser = async (userDTO: IUsuario): Promise<void> => { }

  const recoverPassword = async (email: string): Promise<void> => { };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        recoverPassword,
        removeError,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
