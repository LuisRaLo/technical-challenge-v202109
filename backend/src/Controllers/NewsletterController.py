import logging
import os
import traceback
from Services.NewsletterService import NewsletterService
from flask import Blueprint, request, jsonify
from Utils.Helpers.StringsHelper import StringsHelper
from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename

from Utils.Strategies.JWTStrategy import validate_jwt


newsletterController = Blueprint("newsletterController", __name__)
newsletterService = NewsletterService()

root_path = dirname(dirname(realpath(__file__)))
UPLOADS_PATH = join(root_path, "assets", "uploads")


@newsletterController.route("/", methods=["POST"])
def send():
    try:
        token = request.headers.get("Authorization")

        if token and validate_jwt(token=token, output=False) == True:
            payload = request.form.get("payload")
            file = request.files.get("file")
            path_file_save_complete: str = ""
            path_file_save: str = ""

            if file:
                filename = secure_filename(file.filename)
                path = join(UPLOADS_PATH, filename)
                if not os.path.exists(UPLOADS_PATH):
                    os.makedirs(UPLOADS_PATH)

                if os.path.exists(path):
                    os.remove(path)

                file.save(os.path.join(path))
                path_file_save_complete = path
                path_file_save = "/assets/uploads/" + filename

            proccess = newsletterService.send_newsletter(
                payload, path_file_save_complete, path_file_save)

            if proccess == True:
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
                return (
                    jsonify(
                        {
                            "folio": StringsHelper.generate_folio(),
                            "mensaje": "Operación fallida",
                            "resultado": str(proccess),
                        }
                    ),
                    400,
                )

        else:
            return validate_jwt(token=token, output=False)
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
