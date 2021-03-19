#!/usr/bin/python3
from modelo.usuario import Usuario as us
from flask import Flask, request
app=Flask(__name__)

@app.route('/')
def inicio():
    return("Inicio")

@app.route('/registro', methods=['POST'])
def registrarUsuario():
    msg = request.get_json()
    ### CREACION DEL USUARIO ###
    nuevo = us(id = msg.get('idUsuario'), nombre = msg.get('nombreUsuario'),
               apellido = msg.get('apellidoUsuario'), email = msg.get('emailUsuario'), password = msg.get('passwordUsuario'))
    nuevo.tel = msg.get('telefonoUsuario')
    nuevo.ocupacion = msg.get('ocupacionUsuario')
    nuevo.fechaNac = msg.get('fechaNacimiento')
    nuevo.direccion = msg.get('direccion')

    # Retorna True o False segun el exito del registro
    if nuevo.registro():
        return "True"
    else:
        return "False"

@app.route('/ingreso', methods = ['POST'])
def ingresar():
    msg = request.get_json()
    usuarioReg = us(email = msg.get('emailUsuario'), password= msg.get('passwordUsuario'))
    usuarioReg.ingreso()
    respuesta = {'id': usuarioReg.id, 'nombre': usuarioReg.nombre, 'apellido': usuarioReg.apellido,
                 'telefono': usuarioReg.tel, 'ocupacion': usuarioReg.ocupacion,
                 'fecha_Nacimiento': usuarioReg.fechaNac, 'moneda': usuarioReg.moneda, 'direccion': usuarioReg.direccion}
    return respuesta

if __name__ == 'main_':
  app.run(host="0.0.0.0")
