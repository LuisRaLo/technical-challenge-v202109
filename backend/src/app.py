from flask import Flask
from flask_mysqldb import MySQL
from Configs.ServerConfig import config
from dotenv import load_dotenv, dotenv_values
from Controllers.AuthController import authController
from Controllers.UsuariosController import usuariosController
from Controllers.NewsletterController import newsletterController
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
conexion = MySQL(app)

'''ROUTES'''
app.register_blueprint(authController, url_prefix=dotenv_values()['URL_PREFIX'] + '/auth')
app.register_blueprint(usuariosController, url_prefix=dotenv_values()['URL_PREFIX'] + '/usuarios')
app.register_blueprint(newsletterController, url_prefix=dotenv_values()['URL_PREFIX'] + '/newsletter')


if __name__ == '__main__':
    load_dotenv()

    app.register_error_handler(404, lambda e: ({"message": "Not found"}, 404))
    app.config.from_object(config[dotenv_values()['ENV']])

    app.run()
