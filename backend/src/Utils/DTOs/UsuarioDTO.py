import datetime
import json
from Utils.DTOs.PersonaDTO import PersonaDTO


class UsuarioDTO:
    def __init__(self):
        self._usuario_id: int
        self._persona: int | PersonaDTO
        self._rol: str
        self._email: str
        self._token: str
        self._isActive: str
        self._createdAt: datetime
        
    @property
    def usuario_id(self) -> int:
        return self._usuario_id
    
    @usuario_id.setter
    def usuario_id(self, usuario_id: int):
        self._usuario_id = usuario_id
    
    @property
    def persona(self) -> int | PersonaDTO:
        return self._persona
    
    @persona.setter
    def persona(self, persona: int | PersonaDTO):
        self._persona = persona
        
    @property
    def rol(self) -> str:
        return self._rol
    
    @rol.setter
    def rol(self, rol: str):
        self._rol = rol
        
    @property
    def email(self) -> str:
        return self._email

    @email.setter
    def email(self, email: str):
        self._email = email

    @property
    def token(self) -> str:
        return self._token

    @token.setter
    def token(self, token: str):
        self._token = token
        
    @property
    def isActive(self) -> str:
        return self._isActive

    @isActive.setter
    def isActive(self, isActive: str):
        self._isActive = isActive
        
    @property
    def createdAt(self) -> str:
        return self._createdAt

    @createdAt.setter
    def createdAt(self, createdAt: str):
        self._createdAt = createdAt
        
        
    def toJSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
