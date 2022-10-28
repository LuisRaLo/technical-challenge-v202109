import logging
import traceback
from flask_mysqldb import MySQL
from Repository.UsuariosRepository import UsuarioRepository
from Repository.PersonaRepository import PersonaRepository
from Entities.UsuarioEntity import UsuarioEntity
from Entities.PersonaEntity import PersonaEntity
from Utils.DTOs.RegistroDTO import RegistroDTO
from Utils.DTOs.UsuarioDTO import UsuarioDTO
from Utils.Helpers.StringsHelper import StringsHelper
from Utils.Strategies.JWTStrategy import write_jwt


class NewsletterService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL()),
                 personaRepository=PersonaRepository(mysql=MySQL())):
        self.usuarioRepository = usuarioRepository
        self.personaRepository = personaRepository
        
    def send_newsletter(self):
        pass