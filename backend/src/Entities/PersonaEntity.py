import json

class PersonaEntity:
    def __init__(self):
        self._persona_id: int
        self._telefono: str
        self._nombre: str
        self._apaterno: str
        self._amaterno: str
        self._fecha_nacimiento: str
        self._genero: str
     
    @property
    def persona_id(self) -> str:
        return self._persona_id
    
    @persona_id.setter
    def persona_id(self, persona_id: str):
        self._persona_id = persona_id
        
    @property
    def telefono(self) -> str:      
        return self._telefono
    
    @telefono.setter
    def telefono(self, telefono: str):
        self._telefono = telefono
        
    @property
    def nombre(self) -> str:
        return self._nombre
    
    @nombre.setter
    def nombre(self, nombre: str):
        self._nombre = nombre
        
    @property
    def apaterno(self) -> str:
        return self._apaterno
    
    @apaterno.setter
    def apaterno(self, apaterno: str):
        self._apaterno = apaterno
        
    @property
    def amaterno(self) -> str:
        return self._amaterno
    
    @amaterno.setter
    def amaterno(self, amaterno: str):
        self._amaterno = amaterno
        
    @property
    def fecha_nacimiento(self) -> str:
        return self._fecha_nacimiento
    
    @fecha_nacimiento.setter
    def fecha_nacimiento(self, fecha_nacimiento: str):
        self._fecha_nacimiento = fecha_nacimiento
        
    @property
    def genero(self) -> str:
        return self._genero
    
    @genero.setter
    def genero(self, genero: str):
        self._genero = genero
          
        
    def to_JSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
