import json


class SendNewsletterContenidoDTO:
    def __init__(self):
        self._titulo: str
        self._asunto: str
        self._contenido: str

    @property
    def titulo(self) -> str:
        return self._titulo

    @titulo.setter
    def titulo(self, titulo: str):
        self._titulo = titulo

    @property
    def asunto(self) -> str:
        return self._asunto

    @asunto.setter
    def asunto(self, asunto: str):
        self._asunto = asunto

    @property
    def contenido(self) -> str:
        return self._contenido

    @contenido.setter
    def contenido(self, contenido: str):
        self._contenido = contenido

    def toJSON(self):
        return {
            "titulo": self.titulo,
            "asunto": self.asunto,
            "contenido": self.contenido
        }
