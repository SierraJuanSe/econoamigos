#!/usr/bin/python3
from modelo.servicio import Servicio
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def inicio():
    return("Inicio Servicio")

# Trae todas las ofertas excepto las que el usuario ofertó
@app.route('/consultarOfertas', methods=['POST'])
def consultarOfertas():
    msg = request.get_json()
    ofertas = Servicio(idUsuario=msg.get('id'))
    res = ofertas.consultarTodaOferta()
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Trae todas las ofertas que coinciden con la búsqueda excepto las que el usuario ofertó
@app.route('/consultarOfertaEspecifica', methods=['POST'])
def consultarOferta():
    msg = request.get_json()
    ofertas = Servicio(idUsuario=msg.get('id'))
    res = ofertas.consultarOfertaEspecifica(msg.get('busqueda'))
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea un servicio para ser ofertado al instante
@app.route('/insertarServicio', methods=['POST'])
def insertarOferta():
    msg = request.get_json()
    producto = Servicio(nombre=msg.get('nombre'), descripcion=msg.get('descripcion'),
                        precio=msg.get('precio'), estado=True, idUsuario=msg.get('idUsuario'),
                        lugar=msg.get('lugar'))
    if producto.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}


if __name__ == '__main__':
  app.run(host="25.7.209.143")