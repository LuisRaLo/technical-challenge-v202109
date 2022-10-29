import logging
import traceback
from Utils.Strategies.JWTStrategy import validate_jwt
from flask import Blueprint, request, jsonify
from Utils.Helpers.StringsHelper import StringsHelper

testController = Blueprint("testController", __name__)


@testController.route("/isValidateJwt", methods=["GET"])
def get_usuarios():
    try:
        token = request.headers.get("Authorization")

        if token and validate_jwt(token=token, output=False) == True:
            return validate_jwt(token=token, output=True)
        else:
            return validate_jwt(token=token, output=False)
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
