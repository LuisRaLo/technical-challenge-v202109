from dotenv import dotenv_values

class DevelopmentConfig():
    DEBUG = dotenv_values()['APP_DEBUG']
    PORT = dotenv_values()['APP_PORT']
    MYSQL_HOST = dotenv_values()['DB_HOST']
    MYSQL_PORT =int(dotenv_values()['DB_PORT'])
    MYSQL_USER = dotenv_values()['DB_USERNAME']
    MYSQL_PASSWORD = dotenv_values()['DB_PASSWORD']
    MYSQL_DB = dotenv_values()['DB_DATABASE']
    
    MAIL_SERVER = dotenv_values()['MAIL_SERVER']
    MAIL_PORT = int(dotenv_values()['MAIL_PORT'])
    MAIL_USE_SSL = dotenv_values()['MAIL_USE_SSL']
    MAIL_DEBUG = int(dotenv_values()['MAIL_DEBUG'])
    MAIL_USERNAME = dotenv_values()['MAIL_USERNAME']
    MAIL_PASSWORD = dotenv_values()['MAIL_PASSWORD']
    MAIL_DEFAULT_SENDER = dotenv_values()['MAIL_DEFAULT_SENDER']


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}