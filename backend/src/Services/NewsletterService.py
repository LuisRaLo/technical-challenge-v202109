import logging
import os
import traceback
from flask import copy_current_request_context
from flask_mysqldb import MySQL
from Repository.UsuariosRepository import UsuarioRepository
from Repository.PersonaRepository import PersonaRepository
from Utils.DTOs.SendNewsletterDTO import SendNewsletterDTO
from flask_mail import Message, Mail
from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename
from Factory.Scheduler import scheduler
import threading


class NewsletterService:

    def __init__(self,
                 usuarioRepository=UsuarioRepository(mysql=MySQL()),
                 personaRepository=PersonaRepository(mysql=MySQL())):
        self._usuarioRepository = usuarioRepository
        self._personaRepository = personaRepository
        self._mail = Mail()
        self._root_path = dirname(dirname(realpath(__file__)))
        self._UPLOADS_PATH = join(self._root_path, "assets", "uploads")

    def __save_file(self, file) -> bool | dict:
        try:
            if file is not None:
                filename = secure_filename(file.filename)
                path = join(self._UPLOADS_PATH, filename)
                if not os.path.exists(self._UPLOADS_PATH):
                    os.makedirs(self._UPLOADS_PATH)

                if os.path.exists(path):
                    os.remove(path)

                file.save(os.path.join(path))

                return {
                    "path_file_save_complete": path,
                    "path_file_save": "/assets/uploads/" + filename,
                    "content_type": file.content_type,
                    "filename": filename
                }

        except Exception as e:
            logging.exception(traceback.format_exc())
            return False

    def __create_massege(self, sendNewsletterDTO: SendNewsletterDTO, file=None) -> Message:
        if not sendNewsletterDTO.users:
            raise ValueError('Target email not defined.')

        subject = sendNewsletterDTO.contenido.asunto

        msg = Message(
            subject,
            sendNewsletterDTO.users,
            sendNewsletterDTO.contenido.contenido
        )

        if file and file is not False and file is not None:
            msg.attach(
                filename=file['filename'],
                content_type=file['content_type'],
                data=open(
                    file['path_file_save_complete'], 'rb').read()
            )

        return msg

    def __send_async(self, sendNewsletterDTO: SendNewsletterDTO, file=None):
        message = self.__create_massege(sendNewsletterDTO, file)

        @copy_current_request_context
        def send_message(message):
            self._mail.send(message)

        sender = threading.Thread(
            name='mail_sender', target=send_message, args=(message,))
        sender.start()

    def send_newsletter(self, sendNewsletterDTO: SendNewsletterDTO, file=None):
        try:
            try_save_file = self.__save_file(file)

            trysend = self.__send_async(sendNewsletterDTO, try_save_file)

            print(trysend)

            return True
        except Exception as e:
            logging.exception(traceback.format_exc())
            return False

    @scheduler.task('cron', id='send_newsletter', minute='*/1', misfire_grace_time=900)
    def send_newsletter_task():
        print("send_newsletter_task")
