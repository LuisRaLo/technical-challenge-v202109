import logging
import traceback
from Services.NewsletterService import NewsletterService
from flask import Blueprint, request, jsonify, current_app
from Utils.DTOs.RegistroDTO import RegistroDTO
from Utils.Helpers.StringsHelper import StringsHelper
from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename

newsletterController = Blueprint("newsletterController", __name__)
newsletterService = NewsletterService()

root_path = dirname(dirname(realpath(__file__)))
UPLOADS_PATH = join(root_path, "assets", "uploads", "newsletter")


@newsletterController.route("/", methods=["POST"])
def send():
    try:
        print("send")
        if request.method == "POST":
            if "imagen" not in request.files:
                Exception("there is no imagen in form!")
            """ imagen = request.files["imagen"]
            path = join(UPLOADS_PATH, secure_filename(imagen.filename))
            imagen.save(path) """
            print(request.files)
            return request.files

        """  if request_data['email'] != None and request_data['password'] != None: 

        proccess = newsletterService.send_newsletter()

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
            return (
                jsonify(
                    {
                        "folio": StringsHelper.generate_folio(),
                        "mensaje": "Operación fallida",
                        "resultado": "Usuario o contraseña incorrectos",
                    }
                ),
                401,
            )

         else:
            response = jsonify(
                {
                    'folio': StringsHelper.generate_folio(),
                    'mensaje': 'Operación fallida',
                    'resultado': 'Revisa tus datos'
                })
            response.status_code = 400
            return response """
    except Exception as e:
        logging.exception(traceback.format_exc())
        return (
            jsonify(
                {
                    "folio": StringsHelper.generate_folio(),
                    "mensaje": "Operación fallida",
                    "resultado": str(e),
                }
            ),
            500,
        )
