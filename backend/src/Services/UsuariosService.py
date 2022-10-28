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

