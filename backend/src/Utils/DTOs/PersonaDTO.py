import json


class PersonaDTO:
    def __init__(self):
        self._ID_Peronsa: int
        self._Telefono: str
        self._Nombre: str
        self._APaterno: str
        self._AMaterno: str
        self._Genero: str
        
    @property
    def ID_Persona(self) -> int:
        return self._ID_Persona
    
    @ID_Persona.setter
    def ID_Persona(self, ID_Persona: int):
        self._ID_Persona = ID_Persona
        
    @property
    def Telefono(self) -> str:
        return self._Telefono

    @Telefono.setter
    def Telefono(self, Telefono: str):
        self._Telefono = Telefono
        
    @property
    def Nombre(self) -> str:
        return self._Nombre

    @Nombre.setter
    def Nombre(self, Nombre: str):
        self._Nombre = Nombre

    @property
    def APaterno(self) -> str:
        return self._APaterno

    @APaterno.setter
    def APaterno(self, APaterno: str):
        self._APaterno = APaterno

    @property
    def AMaterno(self) -> str:
        return self._AMaterno

    @AMaterno.setter
    def AMaterno(self, AMaterno: str):
        self._AMaterno = AMaterno
        
    @property
    def Genero(self) -> str:
        return self._Genero

    @Genero.setter
    def Genero(self, Genero: str):
        self._Genero = Genero
                        
        
    def toJSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
