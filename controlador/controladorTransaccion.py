#!/usr/bin/python3
from modelo.transaccion import Transaccion
from modelo.usuario import Usuario
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def inicio():
    return("Inicio Transaccion")

@app.route('/insertarTransaccion', methods=['POST'])
def insertarTransaccion():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tran = Transaccion(concepto=msg.get('concepto'), usuario=user,
                           valor=msg.get('valor'), estado=True)
    if tran.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

@app.route('/consultarTransaccion', methods=['POST'])
def consultarTransaccion():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tran = Transaccion(usuario=user)
    res = tran.transacciones_usuario()
    if res != {}:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}



if __name__ == '__main__':
  app.run(host="25.7.209.143")

