from app.controlador import bp
from app.modelo.usuario import Usuario
from app.modelo.transaccion import Transaccion
from flask import request, jsonify
from app.utils.formValidations import validateLoginForm, validateRegisterForm, create_response

@bp.route('/users')
def inicio():
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
            u.moneda = 1000
            if not u.registro():
                response = create_response(response, False, "BAD_REGISTRO", 400)
            else:
                u.create_codeRef()
                if not u.registroCodigo():
                    response = create_response(response, False, "BAD_REGISTRO_COD_REF", 400)

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
    response = [{"status": 200,"info": True, "message": "OK"}, 200]
    u = Usuario()
    isValid = u.from_dict(msg)
    if isValid[0]:
        if not u.actualizar():
            response = create_response(response, False, "BAD_UPDATE", 400)
        else:
            u.get()
            response[0]["token"] = u.create_token()    
    else:
        response = create_response(response, False, isValid[1], 400)
    return tuple(response)

# Retorna la información del usuario
@bp.route('/consultarUsuario', methods = ['POST'])
def consultar():
    msg = request.get_json()
    response = [{"status": 200,"info": True, "message": "OK"}, 200]
    u = Usuario(id = msg.get('id'))
    data, _ = u.get()
    if data:
        response[0]["info"] = data
    else:
       response = create_response(response, False, "USER_NOT_FOUND", 404)
    return tuple(response)

# Recarga la moneda de un usuario
@bp.route('/recargar', methods=['POST'])
def insertarRecarga():
    msg = request.get_json()
    response = [{"status": 200,"info": True, "message": "OK", "monenda":None}, 200]
    user = Usuario(id=msg.get('idUsuario'))
    tran = Transaccion(concepto="Recarga", usuario=user, valor=msg.get('valor'), estado=True)
    if tran.agregar():
        _, moneda = user.get()
        response[0]['moneda'] = moneda
    else:
        response = create_response(response, False, "BAD_RECARGA", 400)
    return tuple(response)

# Referir un usuario
@bp.route('/referirUsuario', methods=['POST'])
def referirUsuario():
    msg = request.get_json()
    response = [{"status": 200,"info": True, "message": "OK", "monenda":None}, 200]
    u = Usuario(id=msg['idUsuario'])
    u.get()
    codref = u.existsCodeRef(msg['codReferido'])
    if codref:
        if u.estadoReferido:
            response[0]["moneda"] = u.moneda
            response = create_response(response, False, "BAD_YA_RECLAMO", 400)
            return tuple(response)
        if codref['codReferido'] != u.codReferido:
            if u.referirUsuario(codref):
                _, moneda = u.get()
                response[0]["moneda"] = moneda
            else:
                response = create_response(response, False, "BAD_REFERIDO", 400)
        else:
            response = create_response(response, False, "BAD_MISMO_CODIGO", 400)
    return tuple(response)

