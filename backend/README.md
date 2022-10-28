# technical-challenge-v202109

## SQL: ##

Dump de la base de datos mi_test_db. Sólo hay que importarlo.

## BACKEND <test_servicios>: ##
Backend hecho en Python con Flask.

## Ficha Técnica:

* Python 3.10
* Flask
* Mysql
* JWT

## Intalación

* Sobre mi OS:

    * Tener instalado python 3.10.
    * Tener instalado un [virtualenv](https://docs.python.org/3/tutorial/venv.html)
        ```console
        $ pip install virtualenv
        ```
        **Nota**: ir a la documentación de [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) ya que puede variar la instalación dependiendo su OS

    * Ya que este back se conecta a su base de datos, usa la libreria [flask-mysql](https://virtualenv.pypa.io/en/latest/installation.html) es necesario tener instalado un cliente de mysql

* Una vez teniendo instalado lo anterior:
    * Clonar el repositorio a su equipo.
    * pocisionarse sobre el la raiz del proyecto:
        ```console
        $ cd /backend
        ```
    * **Crear el archivo .env a partir del .env.example y llenar las configuraciones.**
    * iniciar el entorno virtual
        * Para Windows es necesario hacerlos desde el powershell:
            ```console
            $ ./venv/Scripts/activate  
            ```

            Si se muestra algun error en consola diciendo que "la ejecución de scripts está        
            deshabilitada en este sistema. Para obtener más información, consulta el tema about_Execution_Policies en" pegar el siguiente comando en powershell en modo admin
            
            ```
            $ Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
            ```

        * Para sistemas basados en UNIX:
            ```console
            $ source ./venv/bin/activate  
            ```
        Una vez adentro la terminal lucirá como la siguiente linea: 

         ```console
         (venv) technical-challenge-v202109\backend >
        ```

        Por lo que indica que está dentro del entrono virtual. 

    * Finalmente introducir:
        ```console
        $  python .\src\app.py 
        ```
        Esto arranacará el servidor de prueba.

    * Para terminarlo puede teclear ctrl + C
    * Para salir del entrono virtual introducir
        ```console
        $ deactivate
        ```
    

## DIRECTORIO DE ENDPOINTS

1. POST /api/v1/auth/signin : Login
    ```json
    body:
    {
        "email":"luian.ramirez.12@gmail.com",
        "password": "123"
    }
    ```
2. PUT /api/v1/auth/signup : Registro
    ```json
    body:
    {
        "email":"luian.ramirez.12@gmail.com",
        "password": "123",
        "rol": "admin",
        "nombre": "Luis",
        "apellidoPaterno": "Ramírez",
        "apellidoMaterno": "López",
        "telefono": "9995148922",
        "fechaNacimiento": "1994-12-12",
        "genero": "M"
    }
    ```
3. GET /api/v1/usuarios/{usuario_id} : Consulta de usuario. **Necesita JWT**.

4. GET /api/v1/usuarios/{usuario_id}/gustos: información a detalle del usuario que se pase como parámetro en “usuario_id”. **Necesita JWT**.





librerias instaladas
pip install flask     
pip install flask-mysql
pip install python-dotenv
pip install PyJWT 
pip install bcrypt
pip install Werkzeug