from app.controlador import bp
from app.modelo.usuario import Usuario
from app.modelo.compra import Compra
from app.modelo.transaccion import Transaccion
from app.modelo.oferta import Oferta
from flask import request
from app import socketio, onlineUsers

# @app.route('/')
# def inicio():
#     return("Inicio Compra")

# Crea una compra de tal forma que se genere un transacción de ingreso y compra
# Su estado cambiará cuando el que oferta confirme la entrega o la prestación del servicio
@bp.route('/insertarCompra', methods=['POST'])
def insertarCompra():
    msg = request.get_json()
    comprador = Usuario(id=msg.get('idUsuario'))
    oferta = Oferta()
    print(oferta.consultarOfertaEspecificaUsuario(msg.get('idOferta')))
    comp = Compra(precio=int(msg.get('precio')), estado=False, usuario=comprador,
                  cod_oferta=msg.get('idOferta'))
    compra = comp.agregar()
    tranCompra = Transaccion(concepto="Compra", usuario=comprador,
                           valor=int(msg.get('precio')), estado=False, idCompra= msg.get('idOferta'))
    # user2 = Usuario(id=Transaccion().consultarIdUsuario(msg.get('idOferta')))
    # tranIngreso = Transaccion(concepto="Ingreso", usuario=user2,
    #                        valor=int(msg.get('precio')), estado=False, idCompra= msg.get('idOferta'))
    # tranCompra.agregar()
    # tranIngreso.agregar()
    
    if True:
        notificateCompra(msg, None, None)
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

def notificateCompra(data, vendor, producto):
    onlineUser = list(filter(lambda i: onlineUsers[i]['id'] == data['idUsuario'], onlineUsers.keys()))
    socketio.emit('buyNotification', {'sid':onlineUser[0], 'status':'newNotofication', 'info': {}}, to=onlineUser[0])

if __name__ == '__main__':
    app.run(host="25.7.209.143")
