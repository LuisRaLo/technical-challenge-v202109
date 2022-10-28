import React, { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./authReducer";
import { IUsuario } from "../../utils/interfaces/IUsuario";
import useAsyncStorage from "../../hooks/useAsynStorage";
import StoryChallengeService from "../../services/storyChallenge.service";
import AuthException from "../../utils/exceptions/authException";

type AuthContextProps = {
  errorMessage: { title?: string; message: string } | undefined;
  user: IUsuario | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: (user: IUsuario, constrasenas: any) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  removeError: () => void;
  recoverPassword: (email: string) => Promise<void>;
  updateUser: (user: IUsuario) => Promise<void>;
  getJWToken: () => Promise<string>;
  getUID: () => Promise<string>;
};

const authInicialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: undefined,
  businessAccount: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);


  const { setItem, getItem, removeItem } = useAsyncStorage();

  useEffect(() => {
    checkFireToken();
  }, []);

  const checkFireToken = async () => {
    const objJWT = await getItem();

    return dispatch({ type: "notAuthenticated" });
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  const signUp = async (
    user: IUsuario,
    constrasenas: any
  ): Promise<boolean> => {
    try {


      dispatch({ type: "signUp" });
      return true;
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
     
      //return dispatch({ type: "notAuthenticated" });
    } catch (error: any) {
      const exception = AuthException.getExceptions(error);
      dispatch({
        type: "addError",
        payload: {
          title: exception.data.mensaje,
          message: exception.data.resultado,
        },
      });
    }
  };

  const setError = (error: any, title?: string, actions?: any) => {
    console.log(error);

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

  const getJWToken = async (): Promise<string> => {
    return "";
  };

  const getUID = async (): Promise<string> => {
    return "";
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

  const updateUser = async (userDTO: IUsuario): Promise<void> => {
    /* try {
      await FirestoreService.updateUserDoc(await getUID(), userDTO);

      return dispatch({ type: "updateUser", payload: { user: userDTO } });
    } catch (error) {
      return setError(error);
    } */
  };

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
        getJWToken,
        getUID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
