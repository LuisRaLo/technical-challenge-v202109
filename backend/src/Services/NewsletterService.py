from array import array
from cgi import FieldStorage
import email
from importlib.resources import path
import json
import logging
import os
import traceback
from typing import List
from flask import current_app
from flask_mysqldb import MySQL
from Repository.UsuariosRepository import UsuarioRepository
from Repository.PersonaRepository import PersonaRepository
from Entities.UsuarioEntity import UsuarioEntity
from Entities.PersonaEntity import PersonaEntity
from Utils.DTOs.RegistroDTO import RegistroDTO
from Utils.DTOs.SendNewsletterContenidoDTO import SendNewsletterContenidoDTO
from Utils.DTOs.SendNewsletterDTO import SendNewsletterDTO
from Utils.DTOs.SendNewsletterProgramingDTO import SendNewsletterProgramingDTO
from Utils.Helpers.StringsHelper import StringsHelper
from Utils.Strategies.JWTStrategy import write_jwt
from flask_mail import Message, Mail
from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename


root_path = dirname(dirname(realpath(__file__)))
UPLOADS_PATH = join(root_path, "assets", "uploads")


class NewsletterService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL()),
                 personaRepository=PersonaRepository(mysql=MySQL())):
        self._usuarioRepository = usuarioRepository
        self._personaRepository = personaRepository
        self._mail = Mail()

    def send_newsletter(self, sendNewsletterDTO: SendNewsletterDTO, file=None):
        try:
            print(sendNewsletterDTO.users)

            try_save_file = self.__save_file(file)
            
            print(try_save_file)

            # with current_app.app_context():
            msg = Message(
                sender=current_app.config['MAIL_USERNAME'],
                subject=sendNewsletterDTO.contenido.asunto,
                recipients=sendNewsletterDTO.users,
                html=sendNewsletterDTO.contenido.contenido,
            )
            
            if try_save_file is not True:
                msg.attach(
                    filename=try_save_file['name'], 
                    content_type=try_save_file['content_type'], 
                    data=open(try_save_file['path_file_save_complete'], 'rb').read()
                )

            try_send_emails = self._mail.send(msg)

            print(try_send_emails.__str__())

            return True
        except Exception as e:
            logging.exception(traceback.format_exc())
            return False

    def __save_file(self, file) -> bool | dict:
        try:
            if file is not None:
                filename = secure_filename(file.filename)
                path = join(UPLOADS_PATH, filename)
                if not os.path.exists(UPLOADS_PATH):
                    os.makedirs(UPLOADS_PATH)

                if os.path.exists(path):
                    os.remove(path)

                file.save(os.path.join(path))

                return {
                    "path_file_save_complete": path,
                    "path_file_save": "/assets/uploads/" + filename,
                    "content_type": file.content_type,
                    "filename": filename
                }

        except Exception as e:
            logging.exception(traceback.format_exc())
            return False
