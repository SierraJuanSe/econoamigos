from app.controlador import bp
from app.modelo.usuario import Usuario
from app.modelo.transaccion import Transaccion
from flask import request
import random

@bp.route('/')
def inicio():
    return("Inicio Usuario")

# Creación de un nuevo usuario
@bp.route('/registro', methods=['POST'])
def registrarUsuario():
    msg = request.get_json()
    nuevo = Usuario(id = msg.get('idUsuario'), nombre = msg.get('nombreUsuario'),
               apellido = msg.get('apellidoUsuario'), email = msg.get('emailUsuario'),
               password = msg.get('passwordUsuario'), codBarrio= msg.get('codBarrio'))
    nuevo.tel = msg.get('telefonoUsuario')
    nuevo.ocupacion = msg.get('ocupacionUsuario')
    nuevo.fechaNac = msg.get('fechaNacimiento')
    nuevo.direccion = msg.get('direccion')
    nuevo.moneda = 100
    nuevo.codReferido = nuevo.nombre + nuevo.apellido +str(random.randint(0,2000))
    nuevo.registroCodigo()
    if nuevo.registro():
        return {"status": 200, "info": True}
    else:
        return {"status": 400,"info": False}

# Permite o no el ingreso a la plataforma
@bp.route('/ingreso', methods = ['POST'])
def ingresar():
    msg = request.get_json()
    usuarioReg = Usuario(email = msg.get('emailUsuario'), password= msg.get('passwordUsuario'))
    if usuarioReg.ingreso():
        respuesta = {"status": 200, "info": True, "token":{'id': usuarioReg.id, 'nombre': usuarioReg.nombre, 'apellido': usuarioReg.apellido,
                 'telefono': usuarioReg.tel, 'codBarrio': usuarioReg.codBarrio,
                 'fecha_Nacimiento': usuarioReg.fechaNac, 'moneda': usuarioReg.moneda, 'direccion': usuarioReg.direccion,
                 'estadoReferido': usuarioReg.estadoReferido, 'codReferido': usuarioReg.codReferido}}
        return respuesta
    else:
        return {"status": 400,"info": False, "token":""}

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

if __name__ == '__main__':
  app.run(host="25.7.209.143")
