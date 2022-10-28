import json


class UsuarioDTO:
    def __init__(self):
        self._usuario_id: str
        self._email: str
        self._rol: str
        self._telefono: str
        self._nombre: str
        self._genero: str
        self._fecha_nacimiento: str
        self._jwt: str
        self.gustos : list

    @property
    def usuario_id(self) -> str:
        return self._usuario_id

    @usuario_id.setter
    def usuario_id(self, usuario_id: str):
        self._usuario_id = usuario_id

    @property
    def email(self) -> str:
        return self._email

    @email.setter
    def email(self, email: str):
        self._email = email

    @property
    def rol(self) -> str:
        return self._rol

    @rol.setter
    def rol(self, rol: str):
        self._rol = rol

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
    def genero(self) -> str:
        return self._genero

    @genero.setter
    def genero(self, genero: str):
        self._genero = genero

    @property
    def fecha_nacimiento(self) -> str:
        return self._fecha_nacimiento

    @fecha_nacimiento.setter
    def fecha_nacimiento(self, fecha_nacimiento: str):
        self._fecha_nacimiento = fecha_nacimiento

    @property
    def jwt(self) -> str:
        return self._jwt

    @jwt.setter
    def jwt(self, jwt: str):
        self._jwt = jwt
        
    @property
    def gustos(self) -> list:
        return self._gustos

    @gustos.setter
    def gustos(self, gustos: list):
        self._gustos = gustos
        

    def toJSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
