from app.controlador import bp
from app.modelo.usuario import Usuario
from app.modelo.compra import Compra
from app.modelo.transaccion import Transaccion
from flask import request

# @app.route('/')
# def inicio():
#     return("Inicio Compra")

# Crea una compra de tal forma que se genere un transacción de ingreso y compra
# Su estado cambiará cuando el que oferta confirme la entrega o la prestación del servicio
@bp.route('/insertarCompra', methods=['POST'])
def insertarCompra():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tranCompra = Transaccion(concepto="Compra", usuario=user,
                           valor=int(msg.get('precio')), estado=False, idOferta= msg.get('idOferta'))
    user2 = Usuario(id=Transaccion().consultarIdUsuario(msg.get('idOferta')))
    tranIngreso = Transaccion(concepto="Ingreso", usuario=user2,
                           valor=int(msg.get('precio')), estado=False, idOferta= msg.get('idOferta'))
    tranCompra.agregar()
    tranIngreso.agregar()
    comp = Compra(precio=int(msg.get('precio')), estado=False, usuario=user,
                  cod_oferta=msg.get('idOferta'))
    if comp.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

# Retorna todas las ofertas que el usuario adquirió
@bp.route('/consultarOfertasCompradas', methods=['POST'])
def consultarOfertasComprados():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    comp = Compra(usuario=user)
    res = comp.consultar_ofertas_compradas()
    if res != []:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Retorna todas las ofertas que el usuario haya vendido
@bp.route('/consultarOfertasVendidas', methods=['POST'])
def consultarOfertasVendidos():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    comp = Compra(usuario=user)
    res = comp.consultar_ofertas_vendidas()
    if res != []:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# El usuario que oferta confirma la compra
# Y automáticamente el trigger actualizará el total de moneda de comprador y vendedor
@bp.route('/actualizarEstadoCompra', methods=['POST'])
def actualizarEstadoCompra():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    if comp.actualizar_estado():
        aux, moneda = Usuario(id=msg.get('idUsuario')).consultar()
        return {'status': 200, 'info':True, 'moneda': moneda}
    else:
        return {'status': 400, 'info':False}


if __name__ == '__main__':
    app.run(host="25.7.209.143")
