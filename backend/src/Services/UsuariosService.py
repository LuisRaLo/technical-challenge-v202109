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
from Utils.DTOs.UsuarioDTO import UsuarioDTO
from Utils.DTOs.PersonaDTO import PersonaDTO
from Utils.Helpers.StringsHelper import StringsHelper
from Utils.Strategies.JWTStrategy import write_jwt


class UsuariosService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL())):
        self.usuarioRepository = usuarioRepository

    def get_usuarios(self) ->  List[UsuarioEntity] | None:
        try:
            try_users = self.usuarioRepository.find_all()

            if try_users != None:
                
                users_list = []
                
                for user in try_users:
                    usuarioDTO = UsuarioDTO()
                    
                    usuarioDTO.usuario_id = user[0]
                    usuarioDTO.rol = user[2]
                    usuarioDTO.email = user[3]
                    
                    users_list.append(usuarioDTO)

           
                tojson = json.dumps(users_list, default=lambda o: o.__dict__, sort_keys=True, indent=4)
                return tojson
            else:
                return None
        except Exception as e:
            logging.ERROR(traceback.format_exc())
            return e

        finally:
            usuarioDTO = None

    def get_usuario(self, usuario_id: int) -> UsuarioEntity | None:
        try:
            usuarioDTO = UsuarioDTO()
            personaDTO = PersonaDTO()
            
            usuario = self.usuarioRepository.join_persona(usuario_id=usuario_id)

            if usuario_id != None:

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
