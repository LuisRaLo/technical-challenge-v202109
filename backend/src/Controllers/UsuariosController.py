import logging
import traceback
import json
from Services.UsuariosService import UsuariosService
from Utils.Strategies.JWTStrategy import validate_jwt
from flask import Blueprint, request, jsonify
from Utils.DTOs.RegistroDTO import RegistroDTO
from Services.AuthService import AuthService
from Utils.Helpers.StringsHelper import StringsHelper

usuariosController = Blueprint("usuariosController", __name__)
usuariosService = UsuariosService()


@usuariosController.route("/", methods=["GET"])
def get_usuarios():
    try:
        token = request.headers.get("Authorization")
                        
        if token and validate_jwt(token=token.split(" ")[1], output=False) == True:
            
            proccess = usuariosService.get_usuarios()

            if proccess != None:
                return (
                    jsonify(
                        {
                            "folio": StringsHelper.generate_folio(),
                            "mensaje": "Operación exitosa",
                            "resultado": json.loads(proccess),
                        }
                    ),
                    200,
                )
            else:
                response = (
                    jsonify(
                        {
                            "folio": StringsHelper.generate_folio(),
                            "mensaje": "Operación fallida",
                            "resultado": "Revisa tus datos",
                        }
                    ),
                    400,
                )

            return response
        else:
            return validate_jwt(token=token, output=True)
    except Exception as e:
        logging.exception(traceback.format_exc())
        response = jsonify(
            {
                "folio": StringsHelper.generate_folio(),
                "mensaje": "Operación fallida",
                "resultado": "Revisa tus datos",
            }
        )
        response.status_code = 500
        return response
