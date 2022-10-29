import json
import logging
import traceback
from typing import List
from Entities.UsuarioEntity import UsuarioEntity
from Entities.PersonaEntity import PersonaEntity
from Utils.Helpers.StringsHelper import StringsHelper
from flask_mysqldb import MySQL
from Repository.Repository import Repository


class UsuarioRepository(Repository):

    def __init__(self, mysql: MySQL = MySQL()):
        self.mysql = mysql

    def find_all(self) -> List[UsuarioEntity] | None:
        try:
            cur = self.mysql.connection.cursor()
            cur.execute('''SELECT * FROM usuarios''')
            usuarios = cur.fetchall()
                      
            if len(usuarios) > 0:
                return usuarios
            else:
                return None
        except Exception as e:
            logging(traceback.format_exc())
            return None
        finally:
            cur.close()

    def find_by_id(self, usuario_id: int) -> UsuarioEntity | None:
        try:
            cur = self.mysql.connection.cursor()
            cur.execute('''SELECT * FROM usuarios WHERE usuario_id = %s''',
                        (usuario_id, ))
            usuario = cur.fetchone()

            if usuario:
                return usuario
            else:
                return None
        except Exception as e:
            logging(traceback.format_exc())
            return False
        finally:
            cur.close()

    def find_by_email(self, email: str) -> UsuarioEntity | None:
        try:
            mysql_cursor = self.mysql.connection.cursor()
            mysql_cursor.execute('''SELECT * FROM usuarios WHERE email = %s''',
                                 (email, ))
            usuario = mysql_cursor.fetchone()

            if usuario is not None:
                return usuario
            else:
                return None
        except Exception as e:
            logging(traceback.format_exc())
            return False
        finally:
            mysql_cursor.close()

    def insert(self, usuarioEntity: UsuarioEntity, persona_id: int,
               is_active: int) -> str | bool:
        try:
            password: str = StringsHelper.crypt(usuarioEntity.password)
            cur = self.mysql.connection.cursor()
            cur.execute(
                '''INSERT INTO usuarios (persona_id,rol,email, password,isActive)
                VALUES (%s,%s,%s, %s, %s)''',
                (persona_id, usuarioEntity.rol, usuarioEntity.email, password,
                 is_active))
            self.mysql.connection.commit()

            return True

        except Exception as e:
            return e
        finally:
            cur.close()

    def update(self, usuarioEntity: UsuarioEntity) -> bool:
        try:
            for key, value in usuarioEntity.__dict__.items():
                if value is not None:
                    cur = self.mysql.connection.cursor()
                    cur.execute(
                        f'''UPDATE usuarios SET {key[1:]} = %s WHERE usuario_id = %s''',
                        (value, usuarioEntity.usuario_id))
                    self.mysql.connection.commit()

            return True

        except Exception as e:
            logging.exception(traceback.format_exc())
            return e
        finally:
            cur.close()

    def delete(self):
        pass

    def join_persona(self, email: str = None, usuario_id: int = None) -> UsuarioEntity | None:
        try:
            mysql_cursor = self.mysql.connection.cursor()
            mysql_cursor.execute(
                '''SELECT * 
                FROM usuarios AS u
                LEFT JOIN personas AS p ON u.persona_id = p.persona_id
                WHERE email = %s OR usuario_id = %s''', (email, usuario_id))
            
            usuario = mysql_cursor.fetchone()

            if usuario is not None:

                usuario = dict(
                    zip([key[0] for key in mysql_cursor.description], usuario))

                personaEntity = PersonaEntity()
                usuarioEntity = UsuarioEntity()

                personaEntity.persona_id = usuario['persona_id']
                personaEntity.telefono = usuario['telefono']
                personaEntity.nombre = usuario['nombre']
                personaEntity.apaterno = usuario['apaterno']
                personaEntity.amaterno = usuario['amaterno']
                personaEntity.fecha_nacimiento = usuario['fecha_nacimiento']
                personaEntity.genero = usuario['genero']

                usuarioEntity.usuario_id = usuario['usuario_id']
                usuarioEntity.persona_id = personaEntity
                usuarioEntity.rol = usuario['rol']
                usuarioEntity.email = usuario['email']
                usuarioEntity.password = usuario['password']
                usuarioEntity.token = usuario['token']
                usuarioEntity.token_recovery = usuario['token_recovery']
                usuarioEntity.isActive = usuario['isActive']
                usuarioEntity.createdAt = usuario['createdAt']
                usuarioEntity.updateAt = usuario['updateAt']
                usuarioEntity.deleteAt = usuario['deleteAt']

                return usuarioEntity
            else:
                return None
        except Exception as e:
            logging(traceback.format_exc())
            return None
        finally:
            mysql_cursor.close()

    def to_JSON(self):
        json_str = json.dumps(self,
                              default=lambda o: o.__dict__,
                              sort_keys=True,
                              indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
