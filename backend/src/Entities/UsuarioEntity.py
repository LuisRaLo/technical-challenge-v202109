import datetime
import json

from Entities.PersonaEntity import PersonaEntity

class UsuarioEntity:
    def __init__(self):
        self._usuario_id: int
        self._persona_id: PersonaEntity | int
        self._rol: str
        self._email: str
        self._password: str
        self._token: str
        self._token_recovery: str
        self._isActive: bool
        self._createdAt: datetime
        self._updateAt: datetime
        self._deleteAt: datetime

    @property
    def usuario_id(self) -> str:
        return self._usuario_id

    @usuario_id.setter
    def usuario_id(self, usuario_id: str):
        self._usuario_id = usuario_id
        
    @property
    def persona_id(self) -> int | PersonaEntity:
        return self._persona_id
    
    @persona_id.setter
    def persona_id(self, persona_id: int | PersonaEntity):
        self._persona_id = persona_id
        
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
    def password(self) -> str:
        return self._password
    
    @password.setter
    def password(self, password: str):
        self._password = password
        
    @property
    def token(self) -> str:
        return self._token
    
    @token.setter
    def token(self, token: str):
        self._token = token
        
    @property
    def token_recovery(self) -> str:
        return self._token_recovery
    
    @token_recovery.setter
    def token_recovery(self, token_recovery: str):
        self._token_recovery = token_recovery
        
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
        
    @property
    def updatedAt(self) -> str:
        return self._updateAt
    
    @updatedAt.setter
    def updatedAt(self, updateAt: str):
        self._updateAt = updateAt
        
    @property
    def deletedAt(self) -> str:
        return self._deleteAt
    
    @deletedAt.setter
    def deletedAt(self, deleteAt: str):
        self._deleteAt = deleteAt
        
        
    def to_JSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
