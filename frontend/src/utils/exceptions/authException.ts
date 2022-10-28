import StringsHelper from "../helpers/StringsHelper";
import { ErrorResponse } from "../interfaces/ErrorResponse";

export default class AuthException {
  public static getExceptions(exception: any): ErrorResponse {
    return this.exceptionsHandler(exception);
  }

  private static exceptionsHandler(exception: any): ErrorResponse {
    const response = {
      code: 500,
      data: {
        folio: StringsHelper.generarFolio(),
        mensaje: "",
        resultado: "",
      },
    };

    switch (exception.name) {
      case "AbortError":
        response.data.mensaje =
          "ELa petición ha sido abortada debido a que se ha excedido el tiempo de espera";
        response.data.resultado = exception.message;
        break;

      case "TypeError":
        response.data.mensaje =
          "Revisa tu conexión a internet, o intenta más tarde";
        response.data.resultado = exception.message;
        break;

      case "TimeoutError":
        response.data.mensaje =
          "No se pudo conectar con el servidor, intenta más tarde";
        response.data.resultado = exception.message;
        break;

      default:
        response.data.mensaje = "Operacion no exitosa";
        response.data.resultado = exception.toString();
        break;
    }

    return response;
  }
}
