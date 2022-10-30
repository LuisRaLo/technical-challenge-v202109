
from typing import List

from flask import jsonify
from Entities.UsuarioEntity import UsuarioEntity
from Utils.DTOs.SendNewsletterContenidoDTO import SendNewsletterContenidoDTO
from Utils.DTOs.SendNewsletterProgramingDTO import SendNewsletterProgramingDTO
import json


class SendNewsletterDTO:
    def __init__(self):
        self._contenido: SendNewsletterContenidoDTO
        self._programing: SendNewsletterProgramingDTO
        self._users: tuple

    @property
    def contenido(self) -> SendNewsletterContenidoDTO:
        return self._contenido

    @contenido.setter
    def contenido(self, contenido: SendNewsletterContenidoDTO):
        self._contenido = contenido

    @property
    def programing(self) -> SendNewsletterProgramingDTO:
        return self._programing

    @programing.setter
    def programing(self, programing: SendNewsletterProgramingDTO):
        self._programing = programing

    @property
    def users(self) -> tuple:
        return self._users

    @users.setter
    def users(self, users: tuple):
        self._users = users

    def toJSON(self):
        return {
            "contenido": self.contenido.toJSON(),
            "programing": self.programing.toJSON(),
            "users": self.users.__str__()
        }
