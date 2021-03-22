#!/usr/bin/python3
from modelo.usuario import Usuario
from modelo.compra import Compra
from modelo.transaccion import Transaccion
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def inicio():
    return("Inicio Compra")

@app.route('/insertarCompra', methods=['POST'])
def insertarCompra():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    print("id",user.id)
    tranCompra = Transaccion(concepto="Compra", usuario=user,
                           valor=int(msg.get('precio')), estado=False)
    user2 = Usuario(id=Transaccion().consultarIdUsuario(msg.get('idOferta')))
    tranIngreso = Transaccion(concepto="Ingreso", usuario=user2,
                           valor=int(msg.get('precio')), estado=False)
    print("precio",tranIngreso.valor)
    print("oferta",msg.get('idOferta'))
    tranCompra.agregar()
    tranIngreso.agregar()
    comp = Compra(precio=int(msg.get('precio')), estado=False, usuario=user,
                  cod_oferta=msg.get('idOferta'))
    if comp.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}


@app.route('/consultarOfertasCompradas', methods=['POST'])
def consultarOfertasComprados():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    comp = Compra(usuario=user)
    res = comp.consultar_productos_comprados()
    res2 = comp.consultar_servicios_comprados()
    if res != [] or res2 != []:
        return {'status': 200, 'info': res+res2}
    else:
        return {'status': 404}


@app.route('/consultarOfertasVendidas', methods=['POST'])
def consultarOfertasVendidos():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    comp = Compra(usuario=user)
    res = comp.consulta_productos_vendidos()
    res2 = comp.consulta_servicios_vendidos()
    if res != [] or res2 != []:
        return {'status': 200, 'info': res+res2}
    else:
        return {'status': 404}

@app.route('/actualizarEstadoCompra', methods=['POST'])
def insertarTransaccion():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    if comp.actualizar_estado():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}


if __name__ == '__main__':
    app.run(host="25.7.209.143")
