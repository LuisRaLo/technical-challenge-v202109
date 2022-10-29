import json
from jwt import encode, decode, exceptions
from os import getenv
from datetime import datetime, timedelta
from flask import jsonify
from Utils.Helpers.StringsHelper import StringsHelper


def expire_date(days: int) -> int:
    now = datetime.now()
    new_date = now + timedelta(days)
    return new_date.timestamp()


def write_jwt(data: dict) -> str:
    print(data)
    token = encode(
        payload={**data, "exp": expire_date(days=1)},
        key=getenv("JWT_SECRET"),
        algorithm="HS256",
    )
    return token


def validate_jwt(token: str, output=False) -> bool | dict:

    try:
        if token and token.find(" ") != -1:
            token = token.split(" ")[1]
            if output == True:
                
                encoded_token = decode(jwt=token,  key=getenv("JWT_SECRET"), algorithms=["HS256"])
                encoded_token = json.loads(json.dumps(encoded_token))

                return (
                    jsonify(
                        {
                            "folio": StringsHelper.generate_folio(),
                            "message": "Token válido",
                            "result": encoded_token,
                        }
                    ),
                    200,
                )

            else:
                return True
        
        raise exceptions.DecodeError("No se ha proporcionado un token válido")

    except exceptions.DecodeError as e:
        print(e)
        response = jsonify(
            {
                "folio": StringsHelper.generate_folio(),
                "mensaje": "Operación fallida",
                "resultado": "Token no válido",
            }
        )
        response.status_code = 401
        return response

    except exceptions.ExpiredSignatureError as e:
        print(e)
        response = jsonify(
            {
                "folio": StringsHelper.generate_folio(),
                "mensaje": "Operación fallida",
                "resultado": "Token expirado",
            }
        )
        response.status_code = 500
        return response
