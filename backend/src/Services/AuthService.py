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


class AuthService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL()),
                 personaRepository=PersonaRepository(mysql=MySQL())):
        self.usuarioRepository = usuarioRepository
        self.personaRepository = personaRepository

    def sign_in(self, data) -> UsuarioDTO:
        try:

            usuarioDTO = UsuarioDTO()
            usuario = self.usuarioRepository.join_persona(
                email=data.get('email'))

            if (usuario != None):

                if (StringsHelper.compare(data.get('password'),
                                          usuario.password)):
                    jwt: str = str(
                        write_jwt({
                            'id': usuario.usuario_id,
                            'email': usuario.email,
                            'persona_id': usuario.persona_id.persona_id,
                        }))

                    try_update_jwt = self._update_token(
                        usuario_id=usuario.usuario_id, token=jwt)

                    usuarioDTO.jwt = str(jwt)
                    usuarioDTO.usuario_id = usuario.usuario_id
                    usuarioDTO.email = usuario.email
                    usuarioDTO.rol = usuario.rol
                    usuarioDTO.nombre = usuario.persona_id.nombre
                    usuarioDTO.genero = usuario.persona_id.genero
                    usuarioDTO.fecha_nacimiento = usuario.persona_id.fecha_nacimiento
                    return usuarioDTO

            else:
                return None
        except Exception as e:
            logging.ERROR(traceback.format_exc())
            return e

        finally:
            usuarioDTO = None

    def sign_up(self, data: RegistroDTO) -> str | bool:
        try:
            if (self.usuarioRepository.find_by_email(
                    email=data.email) == None):
                persona_id = self._insert_persona(data=data)

                if (persona_id > 0):

                    tryInsert = self._insert_usuario(data=data,
                                                     persona_id=persona_id)
                    if tryInsert == True:
                        return True
                    return (tryInsert)

                else:
                    return "Error al insertar persona"
            else:
                return "El usuario ya existe"
        except BaseException as exception:
            logging.ERROR(traceback.format_exc())

    def _insert_persona(self, data: RegistroDTO) -> int:
        try:
            personaEntity = PersonaEntity()

            personaEntity.telefono = data.telefono
            personaEntity.nombre = data.nombre
            personaEntity.apaterno = data.apellidoPaterno
            personaEntity.amaterno = data.apellidoMaterno
            personaEntity.fecha_nacimiento = data.fechaNacimiento
            personaEntity.genero = data.genero

            return self.personaRepository.insert(personaEntity=personaEntity)

        except Exception as e:
            print(e)
            return 0
        finally:
            personaEntity = None

    def _insert_usuario(self, data: RegistroDTO,
                        persona_id: int) -> str | bool:
        try:
            usuarioEntity = UsuarioEntity()
            usuarioEntity.rol = data.rol
            usuarioEntity.email = data.email
            usuarioEntity.password = data.password

            return self.usuarioRepository.insert(usuarioEntity=usuarioEntity,
                                                 persona_id=persona_id,
                                                 is_active=1)

        except Exception as e:
            logging.exception(traceback.format_exc())
            return e
        finally:
            usuarioEntity = None

    def _update_token(self, usuario_id: int, token: str) -> str | bool:
        try:
            usuarioEntity = UsuarioEntity()
            usuarioEntity.usuario_id = usuario_id
            usuarioEntity.token = token

            return self.usuarioRepository.update(usuarioEntity=usuarioEntity)
        except Exception as e:
            logging.exception(traceback.format_exc())
            return False
        finally:
            usuarioEntity = None
