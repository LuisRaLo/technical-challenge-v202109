import datetime
import json
from Utils.DTOs.PersonaDTO import PersonaDTO


class UsuarioDTO:
    def __init__(self):
        self._ID_Usuario: int
        self._Persona: int | PersonaDTO
        self._Rol: str
        self._Email: str
        self._Token: str
        self._IsActive: str
        self._CreatedAt: datetime
        
    @property
    def ID_Usuario(self) -> int:
        return self._ID_Usuario
    
    @ID_Usuario.setter
    def ID_Usuario(self, ID_Usuario: int):
        self._ID_Usuario = ID_Usuario
        
    @property
    def Persona(self) -> int | PersonaDTO:
        return self._Persona
    
    @Persona.setter
    def Persona(self, Persona: int | PersonaDTO):
        self._Persona = Persona
        
    @property
    def Rol(self) -> str:
        return self._Rol
    
    @Rol.setter
    def Rol(self, Rol: str):
        self._Rol = Rol
        
    @property
    def Email(self) -> str:
        return self._Email

    @Email.setter
    def Email(self, Email: str):
        self._Email = Email

    @property
    def Token(self) -> str:
        return self._Token

    @Token.setter
    def Token(self, Token: str):
        self._Token = Token
        
    @property
    def IsActive(self) -> str:
        return self._IsActive

    @IsActive.setter
    def IsActive(self, IsActive: str):
        self._IsActive = IsActive
        
    @property
    def CreatedAt(self) -> str:
        return self._CreatedAt

    @CreatedAt.setter
    def CreatedAt(self, CreatedAt: str):
        self._CreatedAt = CreatedAt
        
        
    def toJSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
