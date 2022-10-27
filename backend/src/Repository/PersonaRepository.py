import json
import logging
import traceback
from typing import List
from Entities.UsuarioEntity import UsuarioEntity
from Entities.PersonaEntity import PersonaEntity
from Utils.Helpers.StringsHelper import StringsHelper
from flask_mysqldb import MySQL
from Repository.Repository import Repository


class PersonaRepository(Repository):

    def __init__(self, mysql: MySQL = MySQL()):
        self.mysql = mysql

    def find_all(self) -> List[PersonaEntity] | None:
        try:
            cur = self.mysql.connection.cursor()
            cur.execute('''SELECT * FROM personas''')
            usuarios = cur.fetchall()
            usuarios = dict(zip([key[0] for key in cur.description], usuarios))

            if len(usuarios) > 0:
                return usuarios
            else:
                return None
        except Exception as e:
            logging(traceback.format_exc())
            return None
        finally:
            cur.close()

    def find_by_id(self, ) -> PersonaEntity | None:
        pass

    def insert(self, personaEntity: PersonaEntity) -> str | int:
        try:
            mysql_cursor = self.mysql.connection.cursor()
            mysql_cursor.execute(
                '''INSERT INTO personas (nombre, apaterno, amaterno, telefono, fecha_nacimiento, genero)
                VALUES (%s, %s, %s, %s, %s, %s)''',
                (personaEntity.nombre, personaEntity.apaterno,
                 personaEntity.amaterno, personaEntity.telefono,
                 personaEntity.fecha_nacimiento, personaEntity.genero))
            self.mysql.connection.commit()

            return mysql_cursor.lastrowid
        
        except Exception as e:
            return e
        finally:
            mysql_cursor.close()

    def update(self) -> bool:
        pass

    def delete(self):
        pass

    def to_JSON(self):
        json_str = json.dumps(self,
                              default=lambda o: o.__dict__,
                              sort_keys=True,
                              indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
