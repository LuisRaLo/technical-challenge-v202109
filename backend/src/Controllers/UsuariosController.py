import logging
import traceback
import json
from dotenv import dotenv_values
from Services.UsuariosService import UsuariosService
from Utils.Strategies.JWTStrategy import validate_jwt
from Utils.Helpers.ValidateHelper import ValidateHelper
from flask import Blueprint, request, jsonify
from Utils.Helpers.StringsHelper import StringsHelper

usuariosController = Blueprint("usuariosController", __name__)
usuariosService = UsuariosService()


@usuariosController.route(rule="/", methods=["GET"])
def get_all():
    print("get_usuarios")
    try:
        token = request.headers.get("Authorization")

        if token and validate_jwt(token=token, output=False) == True:

            proccess = usuariosService.get_usuarios()

            if proccess != None:
                return (
                    jsonify(
                        {
                            "folio": StringsHelper.generate_folio(),
                            "mensaje": "Operación exitosa",
                            "resultado": proccess,
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


@usuariosController.route("/<int:usuario_id>", methods=["GET"])
def get_usuario_by_id(usuario_id: int):
    try:
        token = request.headers.get("Authorization")

        if ValidateHelper.validate_request(
            request={"usuario_id": usuario_id}, required=["usuario_id"]
        ):

            if token and validate_jwt(token=token, output=False) == True:
                proccess = usuariosService.get_usuario(usuario_id)
                if proccess != None:
                    return (
                        jsonify(
                            {
                                "folio": StringsHelper.generate_folio(),
                                "mensaje": "Operación exitosa",
                                "resultado": proccess.toJSON(),
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
        else:
            return (
                jsonify(
                    {
                        "folio": StringsHelper.generate_folio(),
                        "mensaje": "Operación fallida",
                        "resultado": "Revisa tus datos",
                    }
                ),
                400,
            )

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
