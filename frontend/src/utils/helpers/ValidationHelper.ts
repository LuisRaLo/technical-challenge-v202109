import ISignUpRequest from "../interfaces/ISignUp";
import StringsHelper from "./StringsHelper";

export default class ValidationHelper{

    public static validateSignUpRequest(signUpRequest: ISignUpRequest): boolean | string {
        if (StringsHelper.isNullOrEmptyStrings(signUpRequest.email, signUpRequest.password, signUpRequest.password_repeat, signUpRequest.telefono, signUpRequest.nombre, signUpRequest.apaterno, signUpRequest.amaterno, signUpRequest.fecha_nacimiento, signUpRequest.genero)) {
            return "Todos los campos son requeridos";
        }
        if (signUpRequest.password !== signUpRequest.password_repeat) {
            return "Las contraseñas no coinciden";
        }
        if (!StringsHelper.isAlpha(signUpRequest.nombre) || !StringsHelper.isAlpha(signUpRequest.apaterno) || !StringsHelper.isAlpha(signUpRequest.amaterno)) {
            return "El nombre, apellido paterno y apellido materno deben contener solo letras";
        }
        if (!StringsHelper.isdigit(signUpRequest.telefono)) {
            return "El teléfono debe contener solo números";
        }
        return true;
    }
}