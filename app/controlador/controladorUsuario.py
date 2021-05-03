from app.controlador import bp
from app.modelo.usuario import Usuario
from app.modelo.transaccion import Transaccion
from flask import request, jsonify
from hashlib import md5
import random

@bp.route('/user')
def inicio():
    # u = Usuario(id="1111111111", email='juansebastiansierrac@gmail.com')
    # print(u.existUser())
    return jsonify(Usuario.queryAll())

# Creación de un nuevo usuario
@bp.route('/registro', methods=['POST'])
def registrarUsuario():
    msg = request.get_json()
    response = [{"status": 200,"info": True, "message": "OK"}, 200]
    isValid = validateRegisterForm(msg)
    if isValid[0]:
        u = Usuario()
        isValid = u.from_dict(msg)
        if not isValid[0]:
            response = create_response(response, False, isValid[1], 400)
            return tuple(response)

        if not u.existsUser():
            u.moneda = 100
            has = md5(u.email.encode()).hexdigest()[:5]
            u.codReferido = u.nombre + u.apellido + has
            u.registroCodigo()
            if not u.registro():
                response = create_response(response, False, "BAD_REGISTRO", 400)

        else:
            response = create_response(response, False, "EXISTS_USER", 400)

    else:
        response = create_response(response, False, isValid[1], 400)

    return tuple(response)

# Permite o no el ingreso a la plataforma
@bp.route('/ingreso', methods = ['POST'])
def ingresar():
    msg = request.get_json()
    response = [{"status": 200,"info": True, "message": "OK", "token":None}, 200]
    isValid = validateLoginForm(msg) 
    if isValid[0]:
        u = Usuario()
        isValid = u.from_dict(msg)
        if isValid[0]:
            if u.ingreso():
                response[0]["token"] = u.create_token()
            else:
                response = create_response(response, False, "BAD_LOGIN", 400)
        else:
            response = create_response(response, False, isValid[1], 400)
            
    else:
        response = create_response(response, False, isValid[1], 400)

    return tuple(response)

# Actualiza la información del usuario a excepción de su correo y fecha de nacimiento
@bp.route('/actualizarUsuario', methods=['POST'])
def actualizarUsuario():
    msg = request.get_json()
    nuevo = Usuario(id = msg.get('idUsuario'), nombre = msg.get('nombreUsuario'),
               apellido = msg.get('apellidoUsuario'), password = msg.get('passwordUsuario'))
    nuevo.tel = msg.get('telefonoUsuario')
    nuevo.codBarrio = msg.get('codBarrio')
    nuevo.direccion = msg.get('direccionUsuario')
    if nuevo.actualizar():
        return {"status": 200, "info": True}
    else:
        return {"status": 400,"info": False}

# Retorna la información del usuario
@bp.route('/consultarUsuario', methods = ['POST'])
def consultar():
    msg = request.get_json()
    usuarioCon = Usuario(id = msg.get('id'))
    respuesta, moneda = usuarioCon.consultar()
    if respuesta != {}:
        respuesta = {'status': 200, 'info': respuesta}
    else:
        respuesta = {'status': 404, 'info': False}
    return respuesta

# Recarga la moneda de un usuario
@bp.route('/recargar', methods=['POST'])
def insertarRecarga():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tran = Transaccion(concepto="Recarga", usuario=user,
                           valor=msg.get('valor'), estado=True)
    if tran.agregar():
        aux, moneda = user.consultar()
        return {'status': 200, 'info':True, 'moneda': moneda}
    else:
        return {'status': 400, 'info':False, 'moneda': ""}

# Referir un usuario
@bp.route('/referirUsuario', methods=['POST'])
def referirUsuario():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    user.codReferido = msg.get('codReferido')
    if user.referirUsuario():
        aux, moneda = user.consultar()
        return {'status': 200, 'info':True, 'moneda': moneda}
    else:
        return {'status': 400, 'info':False, 'moneda': ""}



def validateRegisterForm(form_data):
    fields = [
        'idUsuario', 'nombreUsuario', 'apellidoUsuario', 
        'emailUsuario', 'passwordUsuario', 'codBarrio', 
        'telefonoUsuario', 'ocupacionUsuario', 'fechaNacimiento', 'direccion']
    for field in fields:
        if not field in form_data:
            return 0, "MISSING_FIELD"

    return 1, "OK"

def validateLoginForm(form_data):
    fields = ['emailUsuario', 'passwordUsuario']
    for field in fields:
        if not field in form_data:
            return 0, "MISSING_FIELD"

    return 1, "OK"


def create_response(response, info, message, status_code):
    response[0]["info"] = info; response[0]["message"] = message 
    response[0]["status"] = status_code; response[1] = status_code
    return response
