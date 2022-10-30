import json


class SendNewsletterProgramingDTO:
    def __init__(self):
        self._sendNow: bool
        self._fecha: str
        self._hora: str

    @property
    def sendNow(self) -> bool:
        return self._sendNow

    @sendNow.setter
    def sendNow(self, sendNow: bool):
        self._sendNow = sendNow

    @property
    def fecha(self) -> str:
        return self._fecha

    @fecha.setter
    def fecha(self, fecha: str):
        self._fecha = fecha

    @property
    def hora(self) -> str:
        return self._hora

    @hora.setter
    def hora(self, hora: str):
        self._hora = hora

    def toJSON(self):
        return {
            "sendNow": self.sendNow,
            "fecha": self.fecha,
            "hora": self.hora
        }
