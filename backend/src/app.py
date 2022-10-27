from flask import Flask
from flask_mysqldb import MySQL
from Configs.ServerConfig import config
from dotenv import load_dotenv, dotenv_values
from Controllers.AuthController import authController

app = Flask(__name__)

conexion = MySQL(app)

'''ROUTES'''
app.register_blueprint(authController, url_prefix=dotenv_values()['URL_PREFIX'] + '/auth')


if __name__ == '__main__':
    load_dotenv()

    app.register_error_handler(404, lambda e: ({"message": "Not found"}, 404))
    app.config.from_object(config[dotenv_values()['ENV']])
    app.run()
