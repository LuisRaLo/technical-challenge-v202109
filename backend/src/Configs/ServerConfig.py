from dotenv import dotenv_values

class DevelopmentConfig():
    DEBUG = dotenv_values()['APP_DEBUG']
    PORT = dotenv_values()['APP_PORT']
    MYSQL_HOST = dotenv_values()['DB_HOST']
    MYSQL_PORT =int(dotenv_values()['DB_PORT'])
    MYSQL_USER = dotenv_values()['DB_USERNAME']
    MYSQL_PASSWORD = dotenv_values()['DB_PASSWORD']
    MYSQL_DB = dotenv_values()['DB_DATABASE'] 

config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}