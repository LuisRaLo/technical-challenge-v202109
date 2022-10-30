from flask import Flask
from flask_mysqldb import MySQL
from Configs.ServerConfig import config
from dotenv import load_dotenv, dotenv_values
from Controllers.AuthController import authController
from Controllers.UsuariosController import usuariosController
from Controllers.NewsletterController import newsletterController
from Controllers.TestController import testController
from flask_cors import CORS
from flask_mail import Mail
from Factory.Scheduler import scheduler

app = Flask(__name__,
            static_folder='assets',
            static_url_path='/assets')

"""ROUTES"""
app.register_blueprint(
    authController, url_prefix=dotenv_values()["URL_PREFIX"] + "/auth"
)
app.register_blueprint(
    usuariosController, url_prefix=dotenv_values()["URL_PREFIX"] + "/usuarios"
)
app.register_blueprint(
    newsletterController, url_prefix=dotenv_values()[
        "URL_PREFIX"] + "/newsletter"
)
app.register_blueprint(
    testController, url_prefix=dotenv_values()["URL_PREFIX"] + "/test"
)


CORS(app)
conexion = MySQL(app)
scheduler.init_app(app)

if __name__ == "__main__":
    load_dotenv()

    app.register_error_handler(404, lambda e: ({"message": "Not found"}, 404))
    app.config.from_object(config[dotenv_values()["ENV"]])
    cors = CORS(app, resource={r"/*": {"origins": "*"}})
    mail = Mail(app)
    scheduler.start()

    app.run()
