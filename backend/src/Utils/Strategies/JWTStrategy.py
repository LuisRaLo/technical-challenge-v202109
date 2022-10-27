from jwt import encode, decode, exceptions
from dotenv import dotenv_values
from os import getenv
from datetime import datetime, timedelta
from flask import jsonify
from Utils.Helpers.StringsHelper import StringsHelper


def expire_date(days: int) -> int:
    now = datetime.now()
    new_date = now + timedelta(days)
    return new_date.timestamp()


def write_jwt(data: dict) -> str:
    token = encode(
        payload={
            **data, "exp": expire_date(days=1)
        },
        key=getenv('JWT_SECRET'),
        algorithm='HS256'
    )
    return token.encode('utf-8')


def validate_jwt(token: str, output=False) -> bool:
    try:
        if output:
            return decode(
                jwt=token,
                key=getenv('JWT_SECRET'),
                algorithms=['HS256']
            )
        else:
            return True

    except exceptions.DecodeError:

        response = jsonify({
            'folio': StringsHelper.generate_folio(),
            'mensaje': 'Operación fallida',
            'resultado': 'Token no válido'
        })
        response.status_code = 401
        return response

    except exceptions.ExpiredSignatureError:
        response = jsonify({
            'folio': StringsHelper.generate_folio(),
            'mensaje': 'Operación fallida',
            'resultado': 'Token expirado'
        })
        response.status_code = 401
        return response
