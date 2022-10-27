import uuid
import bcrypt

class StringsHelper:
    @staticmethod
    def crypt(string: str) -> str:
        return bcrypt.hashpw(string.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    @staticmethod
    def compare(string: str, hashed: str) -> bool:
        return bcrypt.checkpw(string.encode('utf-8'), hashed.encode('utf-8'))

    @staticmethod
    def generate_folio() -> str:
        return str(uuid.uuid4().hex)
