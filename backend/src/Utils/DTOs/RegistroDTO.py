import json

from Utils.Enums.RoleEnum import RoleEnum

class RegistroDTO:
    def __init__(self):
        self._rol = RoleEnum
        self._email = str
        self._password = str
        self._password_repeat = str
        self._isActive = bool
        self._telefono = str
        self._nombre = str
        self._apaterno = str
        self._amaterno = str
        self._fecha_nacimiento = str
        self._genero = str
        self._acceptTerms = bool
        self._acceptPrivacy = bool
        self._acceptNewsletters = bool
        
    @property
    def rol(self)->RoleEnum:
        return self._rol
    
    @rol.setter
    def rol(self, rol:RoleEnum):
        self._rol = rol
        
    @property
    def email(self)->str:
        return self._email

    @email.setter
    def email(self, email:str):
        self._email = email
        
    @property
    def password(self)->str:
        return self._password
    
    @password.setter
    def password(self, password:str):
        self._password = password

    @property
    def password_repeat(self)->str:
        return self._password_repeat

    @password_repeat.setter
    def password_repeat(self, password_repeat:str):
        self._password_repeat = password_repeat
        
    @property
    def isActive(self)->bool:
        return self._isActive

    @isActive.setter
    def isActive(self, isActive:bool):
        self._isActive = isActive
        
    @property
    def telefono(self)->str:
        return self._telefono
    
    @telefono.setter
    def telefono(self, telefono:str):
        self._telefono = telefono
        
    @property
    def nombre(self)->str:
        return self._nombre

    @nombre.setter
    def nombre(self, nombre:str):
        self._nombre = nombre
        
    @property
    def apaterno(self)->str:
        return self._apaterno

    @apaterno.setter
    def apaterno(self, apaterno:str):
        self._apaterno = apaterno
        
    @property
    def amaterno(self)->str:
        return self._amaterno

    @amaterno.setter
    def amaterno(self, amaterno:str):
        self._amaterno = amaterno
        
    @property
    def fecha_nacimiento(self)->str:
        return self._fecha_nacimiento
    
    @fecha_nacimiento.setter
    def fecha_nacimiento(self, fecha_nacimiento:str):
        self._fecha_nacimiento = fecha_nacimiento
        
    @property
    def genero(self)->str:
        return self._genero
    
    @genero.setter
    def genero(self, genero:str):
        self._genero = genero
        
    @property
    def acceptTerms(self)->bool:
        return self._acceptTerms

    @acceptTerms.setter
    def acceptTerms(self, acceptTerms:bool):
        self._acceptTerms = acceptTerms
        
    @property
    def acceptPrivacy(self)->bool:
        return self._acceptPrivacy
    
    @acceptPrivacy.setter
    def acceptPrivacy(self, acceptPrivacy:bool):
        self._acceptPrivacy = acceptPrivacy
        
    @property
    def acceptNewsletters(self)->bool:
        return self._acceptNewsletters
    
    @acceptNewsletters.setter
    def acceptNewsletters(self, acceptNewsletters:bool):
        self._acceptNewsletters = acceptNewsletters

    def toJSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
