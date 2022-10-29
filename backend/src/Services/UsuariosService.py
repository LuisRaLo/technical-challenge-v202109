import logging
import traceback
from typing import List
from flask_mysqldb import MySQL
from Repository.UsuariosRepository import UsuarioRepository
from Entities.UsuarioEntity import UsuarioEntity
from Utils.DTOs.UsuarioDTO import UsuarioDTO
from Utils.DTOs.PersonaDTO import PersonaDTO


class UsuariosService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL())):
        self.usuarioRepository = usuarioRepository

    def get_usuarios(self) -> List[UsuarioEntity] | None:
        try:
            try_users = self.usuarioRepository.join_personas()

            list_users = []

            for user in try_users:

                usuarioDTO = UsuarioDTO()
                personaDTO = PersonaDTO()

                personaDTO.persona_id = user["persona_id"]
                personaDTO.telefono = user["telefono"]
                personaDTO.apaterno = user["apaterno"]
                personaDTO.amaterno = user["amaterno"]
                personaDTO.nombre = user["nombre"]
                personaDTO.genero = user["genero"]
                usuarioDTO.usuario_id = user["usuario_id"]
                usuarioDTO.persona = personaDTO
                usuarioDTO.rol = user["rol"]
                usuarioDTO.email = user["email"]
                usuarioDTO.token = user["token"]
                usuarioDTO.isActive = user["isActive"]
                usuarioDTO.acceptTerms = user["acceptTerms"]
                usuarioDTO.acceptPrivacy = user["acceptPrivacy"]
                usuarioDTO.acceptNewsletters = user["acceptNewsletters"]
                usuarioDTO.createdAt = str(user["createdAt"])

                list_users.append(usuarioDTO.toJSON())

            return list_users

        except Exception as e:
            logging.ERROR(traceback.format_exc())
            return e

    def get_usuarios_for_newsletter(self) -> List[UsuarioEntity] | None:
        try:
            try_users = self.usuarioRepository.join_personas_for_newsletter()

            list_users = []

            for user in try_users:

                usuarioDTO = UsuarioDTO()
                personaDTO = PersonaDTO()

                personaDTO.persona_id = user["persona_id"]
                personaDTO.telefono = user["telefono"]
                personaDTO.apaterno = user["apaterno"]
                personaDTO.amaterno = user["amaterno"]
                personaDTO.nombre = user["nombre"]
                personaDTO.genero = user["genero"]
                usuarioDTO.usuario_id = user["usuario_id"]
                usuarioDTO.persona = personaDTO
                usuarioDTO.rol = user["rol"]
                usuarioDTO.email = user["email"]
                usuarioDTO.token = user["token"]
                usuarioDTO.isActive = user["isActive"]
                usuarioDTO.acceptTerms = user["acceptTerms"]
                usuarioDTO.acceptPrivacy = user["acceptPrivacy"]
                usuarioDTO.acceptNewsletters = user["acceptNewsletters"]
                usuarioDTO.createdAt = str(user["createdAt"])

                list_users.append(usuarioDTO.toJSON())

            return list_users

        except Exception as e:
            logging.ERROR(traceback.format_exc())
            return e

    def get_usuario(self, usuario_id: int) -> UsuarioEntity | None:
        try:

            usuario = self.usuarioRepository.join_persona(
                usuario_id=usuario_id)

            if usuario_id != None:
                usuarioDTO = UsuarioDTO()
                personaDTO = PersonaDTO()

                personaDTO.persona_id = usuario.persona_id.persona_id
                personaDTO.telefono = usuario.persona_id.telefono
                personaDTO.apaterno = usuario.persona_id.apaterno
                personaDTO.amaterno = usuario.persona_id.amaterno
                personaDTO.nombre = usuario.persona_id.nombre
                personaDTO.genero = usuario.persona_id.genero

                usuarioDTO.usuario_id = usuario.usuario_id
                usuarioDTO.persona = personaDTO
                usuarioDTO.rol = usuario.rol
                usuarioDTO.email = usuario.email
                usuarioDTO.token = usuario.token
                usuarioDTO.isActive = usuario.isActive
                usuarioDTO.acceptTerms = usuario.acceptTerms
                usuarioDTO.acceptPrivacy = usuario.acceptPrivacy
                usuarioDTO.acceptNewsletters = usuario.acceptNewsletters
                usuarioDTO.createdAt = str(usuario.createdAt)

                return usuarioDTO

            else:
                return None

        except Exception as e:
            logging.ERROR(traceback.format_exc())
            return e

        finally:
            usuarioDTO = None
