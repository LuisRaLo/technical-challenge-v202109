import email
from importlib.resources import path
import json
import logging
import traceback
from typing import List
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


class NewsletterService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL()),
                 personaRepository=PersonaRepository(mysql=MySQL())):
        self.usuarioRepository = usuarioRepository
        self.personaRepository = personaRepository
        
    def send_newsletter(self, payload, path_file_save_complete, path_file_save):
        try:
            payload_to_json = json.loads(payload)
            
            sendNewsletterDTO = SendNewsletterDTO()

            sendNewsletterDTO.contenido = self.__contenido_to_DTO(payload_to_json['contenido'])
            sendNewsletterDTO.programing = self.__programing_to_DTO(payload_to_json['programing'])
            sendNewsletterDTO.users = self.__users_to_DTO(payload_to_json['users'])

            
            print(sendNewsletterDTO.toJSON())
            return True
        except Exception as e:
            logging.exception(traceback.format_exc())
            return False
        
        
    def __contenido_to_DTO(self, contenido) -> SendNewsletterContenidoDTO:
        sendNewsletterContenidoDTO = SendNewsletterContenidoDTO()
        sendNewsletterContenidoDTO.titulo = contenido['titulo']
        sendNewsletterContenidoDTO.asunto = contenido['asunto']
        sendNewsletterContenidoDTO.contenido = contenido['contenido']
        return sendNewsletterContenidoDTO
    
    def __programing_to_DTO(self, programing) -> SendNewsletterProgramingDTO:
        sendNewsletterProgramingDTO = SendNewsletterProgramingDTO()
        sendNewsletterProgramingDTO.fecha = programing['fecha']
        sendNewsletterProgramingDTO.hora = programing['hora']
        sendNewsletterProgramingDTO.sendNow = programing['sendNow']
        return sendNewsletterProgramingDTO
    
    def __users_to_DTO(self, users) -> tuple:
        emails = tuple()
        for user in users:
            emails += (user['email'],)
        return emails
        
        