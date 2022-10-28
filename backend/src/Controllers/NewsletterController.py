import logging
import traceback
from Services.NewsletterService import NewsletterService
from flask import Blueprint, request, jsonify
from Utils.DTOs.RegistroDTO import RegistroDTO
from Utils.Helpers.StringsHelper import StringsHelper

newsletterController = Blueprint('newsletterController', __name__)

newsletterService = NewsletterService()

@newsletterController.route('/send', methods=['POST'])
def signIn():
    try:
        request_data = request.get_json()
        """  if request_data['email'] != None and request_data['password'] != None: """

        proccess = newsletterService.send_newsletter()
        
        print("============================>",proccess)
        
        if proccess != None:
            return jsonify({
                'folio': StringsHelper.generate_folio(),
                'mensaje': 'Operación exitosa',
                'resultado': proccess.toJSON()
            }), 200

        else:
            return jsonify({
                'folio': StringsHelper.generate_folio(),
                'mensaje': 'Operación fallida',
                'resultado': 'Usuario o contraseña incorrectos',
            }), 401

        """ else:
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
        response = jsonify(
            {
                'folio': StringsHelper.generate_folio(),
                'mensaje': 'Operación fallida',
                'resultado': 'Revisa tus datos'
            })
        response.status_code = 500
        return response
