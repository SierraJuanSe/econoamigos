# econoamigos

Applicacion web para generar ingresos y disminuir gastos.

Para la ejecución del servidor web backend construido en flask:

1. Creacion de un ambiente virutal

    ```bash
    ~/econoamigos$ python3 -m venv env
    ```

2. Activar el ambiete virtual

    Linux:

    ```bash
    ~/econoamigos$ source env/bin/activate
    ```

    Windows:

    ```powershell
    ~/econoamigos$ env\Scripts\activate.bat
    ```

3. Intalar todos los paquetes de python

    ```bash
    (env) ~/econoamigos$ pip install -r requirements.txt
    ```

4. configurar el archivo de arranque del servidor web

    Linux:

    ```bash
    (env) ~/econoamigos$ export FLASK_APP=econoamigos.py
    ```

    Windows:

    ```powershell
    (env) ~/econoamigos$ set FLASK_APP=econoamigos.py
    ```

    4.1 (opcional) iniciar en modo debug o de desarrollo

    Linux:

    ```bash
    (env) ~/econoamigos$ export FLASK_ENV=development
    ```

    Windows:

    ```powershell
    (env) ~/econoamigos$ set FLASK_ENV=development
    ```

5. correr la aplicacion

    ```bash
    (env) ~/econoamigos$ flask run
    ```

    Si se desea correr con una direccion ip diferente a la de local host:

    ```bash
    (env) ~/econoamigos$ flask run -h <0.0.0.0>
    ```
