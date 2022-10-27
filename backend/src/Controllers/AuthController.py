import logging
import traceback
from flask import Blueprint, request, jsonify
from Utils.DTOs.RegistroDTO import RegistroDTO
from Services.AuthService import AuthService
from Utils.Helpers.StringsHelper import StringsHelper

authController = Blueprint('authController', __name__)
authService = AuthService()


@authController.route('/signin', methods=['POST'])
def signIn():
    try:
        request_data = request.get_json()
        if request_data['email'] != None and request_data['password'] != None:

            proccess = authService.sign_in(data=request_data)
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

        else:
            response = jsonify(
                {
                    'folio': StringsHelper.generate_folio(),
                    'mensaje': 'Operación fallida',
                    'resultado': 'Revisa tus datos'
                })
            response.status_code = 400
            return response
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


@authController.route('/signup', methods=['PUT'])
def user():
    try:
        request_data = request.get_json()
        if request_data['email'] and request_data['password'] and request_data['nombre'] and request_data['apellidoPaterno'] and request_data['apellidoMaterno'] and request_data['telefono'] and request_data['fechaNacimiento'] and request_data['genero']:

            registroDTO = RegistroDTO()
            registroDTO.email = request_data['email']
            registroDTO.password = request_data['password']
            registroDTO.rol = request_data['rol']
            registroDTO.nombre = request_data['nombre']
            registroDTO.apellidoPaterno = request_data['apellidoPaterno']
            registroDTO.apellidoMaterno = request_data['apellidoMaterno']
            registroDTO.telefono = request_data['telefono']
            registroDTO.fechaNacimiento = request_data['fechaNacimiento']
            registroDTO.genero = request_data['genero']

            proccess = authService.sign_up(data=registroDTO)

            if proccess == True:
                return jsonify({
                    'folio': StringsHelper.generate_folio(),
                    'mensaje': 'Operación exitosa',
                    'resultado': 'Usuario registrado'
                }), 201

            else:
                return jsonify({
                    'folio': StringsHelper.generate_folio(),
                    'mensaje': 'Operación fallida',
                    'resultado': proccess,
                }), 401

        else:
            response = jsonify(
                {
                    'folio': StringsHelper.generate_folio(),
                    'mensaje': 'Operación fallida',
                    'resultado': 'Revisa tus datos'
                })
            response.status_code = 400
            return response
    except Exception as e:
        
        logging.exception(traceback.format_exc())
        response = jsonify(
            {
                'folio': StringsHelper.generate_folio(),
                'mensaje': 'Operación fallida',
                'resultado': 'Tenemos problemas con el servidor'
            })
        response.status_code = 500
        return response
