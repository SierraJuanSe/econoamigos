from app.controlador import bp
from app.modelo.usuario import Usuario
from app.modelo.compra import Compra
from app.modelo.transaccion import Transaccion
from app.modelo.oferta import Oferta
from app.modelo.mensajes import Mensaje
from app.utils.formValidations import create_response
from app.email.purchase_email import send_purchase_notification_email, send_sale_notification_email
from flask import request, jsonify
from app import socketio, onlineUsers
from datetime import datetime

@bp.route('/purchases')
def allPurchases():
    return jsonify(Compra.queryAll())

@bp.route('/insertarCompra', methods=['POST'])
def insertarCompra():
    msg = request.get_json()
    response = [{'status':200, 'info':True, 'message':'OK'}, 200]
    oferta = Oferta().consultarOferta(msg['idOferta'])
    vendedor = Usuario(id=oferta.idUsuario); vendedor.get()
    comprador = Usuario(id=msg['idUsuario']); comprador.get()
    isCambio = msg['precio'] is None
    compra = None
    if isCambio:
        compra = Compra(ofertaCambio=msg['ofertaCambio'],estado=1,
                        usuario=comprador,cod_oferta=oferta.id)
    else:
        compra = Compra(precio=msg['precio'], estado=1,
                        usuario=comprador, cod_oferta=oferta.id)
    
    compra_succeed = compra.agregar()

    if compra_succeed and not isCambio:
        tranCompra = Transaccion(concepto="Compra", usuario=comprador,valor=int(msg['precio']), estado=False, idCompra= compra.id)
        tranIngreso = Transaccion(concepto="Ingreso", usuario=vendedor, valor=int(msg['precio']), estado=False, idCompra= compra.id)
        try:
            tranCompra.agregar()
            tranIngreso.agregar() 
            notificateCompra(vendedor, oferta)
            send_sale_notification_email(vendedor, oferta)
            send_purchase_notification_email(comprador, oferta)
        except:
            response = create_response(response, False, "BAD_TRANSACTION", 500)
            return tuple(response)
    elif compra_succeed and isCambio:
        notificateCompra(vendedor, oferta)
        send_sale_notification_email(vendedor, oferta)
        send_purchase_notification_email(comprador, oferta)
    else:
        response = create_response(response, False, "BAD_COMPRA", 500)

    return tuple(response)

# Al negar un intercambio se elimina la compra
@bp.route('/negarIntercambio', methods=['POST'])
def negarIntercambio():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    if comp.no_aceptar_intercambio():
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

# El vendedor cambia en qué estado se encuentra la compra
@bp.route('/actualizarEstadoCompra', methods=['POST'])
def actualizarEstadoCompra():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'), estado=msg.get('estado'))
    if comp.actualizar_estado():
        _, moneda = Usuario(id=msg.get('idUsuario')).get()
        return {'status': 200, 'info':True, 'moneda': moneda}
    else:
        return {'status': 400, 'info':False}

@bp.route('/consultarEstadoCompra', methods=['POST'])
def consultarEstadoCompra():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    res = comp.consultar_estado_compra()
    if res != None:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

@bp.route('/consultarMensajes', methods=['POST'])
def consultarMensajes():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    mes = Mensaje(compra=comp)
    res=mes.consultarMensaje()
    if res != []:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

def notificateCompra(vendor, producto):
    onlineUser = list(filter(lambda i: int(onlineUsers[i]['id']) == int(vendor.id), onlineUsers.keys()))
    if onlineUser:
        p = producto.to_dict()
        aux = datetime.now()
        horaComentario = str(aux.hour) + ":" + str(aux.minute) + ":" + str(aux.second)
        p['hora'] = horaComentario
        socketio.emit('buyNotification', {'sid':onlineUser[0], 'status':'newNotification', 'info': p}, to=onlineUser[0])

