import json


class RegistroDTO:
    def __init__(self):
        self._email: str
        self._password: str
        self._rol: str
        self._nombre: str
        self._apellidoPaterno: str
        self._apellidoMaterno: str
        self._telefono: str
        self._fechaNacimiento: str
        self._genero: str

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
    def rol(self) -> str:
        return self._rol

    @rol.setter
    def rol(self, rol: str):
        self._rol = rol

    @property
    def nombre(self) -> str:
        return self._nombre

    @nombre.setter
    def nombre(self, nombre: str):
        self._nombre = nombre

    @property
    def apellidoPaterno(self) -> str:
        return self._apellidoPaterno

    @apellidoPaterno.setter
    def apellidoPaterno(self, apellidoPaterno: str):
        self._apellidoPaterno = apellidoPaterno

    @property
    def apellidoMaterno(self) -> str:
        return self._apellidoMaterno

    @apellidoMaterno.setter
    def apellidoMaterno(self, apellidoMaterno: str):
        self._apellidoMaterno = apellidoMaterno

    @property
    def telefono(self) -> str:
        return self._telefono

    @telefono.setter
    def telefono(self, telefono: str):
        self._telefono = telefono

    @property
    def fechaNacimiento(self) -> str:
        return self._fechaNacimiento

    @fechaNacimiento.setter
    def fechaNacimiento(self, fechaNacimiento: str):
        self._fechaNacimiento = fechaNacimiento

    @property
    def genero(self) -> str:
        return self._genero

    @genero.setter
    def genero(self, genero: str):
        self._genero = genero


    def toJSON(self):
        json_str = json.dumps(
            self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        json_str = json_str.replace("_", "")
        return json.loads(json_str)
