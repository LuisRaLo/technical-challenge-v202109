import json
import logging
import os
import traceback
from Services.NewsletterService import NewsletterService
from flask import Blueprint, request, jsonify
from Utils.DTOs.SendNewsletterContenidoDTO import SendNewsletterContenidoDTO
from Utils.DTOs.SendNewsletterDTO import SendNewsletterDTO
from Utils.DTOs.SendNewsletterProgramingDTO import SendNewsletterProgramingDTO
from Utils.Helpers.StringsHelper import StringsHelper


from Utils.Strategies.JWTStrategy import validate_jwt


newsletterController = Blueprint("newsletterController", __name__)
newsletterService = NewsletterService()


@newsletterController.route("/", methods=["POST"])
def send():
    try:
        token = request.headers.get("Authorization")

        if token and validate_jwt(token=token, output=False) == True:
            payload = request.form.get("payload")
            file = request.files.get("file")

            if payload:

                payload_to_json = json.loads(payload)

                sendNewsletterDTO = SendNewsletterDTO()
                sendNewsletterContenidoDTO = SendNewsletterContenidoDTO()
                sendNewsletterProgramingDTO = SendNewsletterProgramingDTO()

                sendNewsletterContenidoDTO.titulo = payload_to_json['contenido']['titulo']
                sendNewsletterContenidoDTO.asunto = payload_to_json['contenido']['asunto']
                sendNewsletterContenidoDTO.contenido = payload_to_json['contenido']['contenido']

                sendNewsletterProgramingDTO.fecha = payload_to_json['programing']['fecha']
                sendNewsletterProgramingDTO.hora = payload_to_json['programing']['hora']
                sendNewsletterProgramingDTO.sendNow = payload_to_json['programing']['sendNow']

                emails = ['luian.ramirez.12@gmail.com']

                for user in payload_to_json['users']:
                    emails.append(user['email'])

                sendNewsletterDTO.contenido = sendNewsletterContenidoDTO
                sendNewsletterDTO.programing = sendNewsletterProgramingDTO
                sendNewsletterDTO.users = emails

                proccess = newsletterService.send_newsletter(
                    sendNewsletterDTO, file)

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
                return (
                    jsonify(
                        {
                            "folio": StringsHelper.generate_folio(),
                            "mensaje": "Operación no exitosa",
                            "resultado": "Verifique los datos enviados",
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
