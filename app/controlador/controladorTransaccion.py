from app.controlador import bp
from app.modelo.transaccion import Transaccion
from app.modelo.usuario import Usuario
from app.modelo.compra import Compra

# @app.route('/')
# def inicio():
#     return("Inicio Transaccion")

# Se crea una transacción que por defecto estará en estado pendiente
@bp.route('/insertarTransaccion', methods=['POST'])
def insertarTransaccion():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tran = Transaccion(concepto=msg.get('concepto'), usuario=user,
                           valor=msg.get('valor'), estado=False)
    if tran.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

# Retorna todas las transacciones que un usuario haya realizado
@bp.route('/consultarTransaccion', methods=['POST'])
def consultarTransaccion():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tran = Transaccion(usuario=user)
    res = tran.transacciones_usuario()
    if res != {}:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Actualiza el estado a completado en la transacción
@bp.route('/actualizarEstadoTransaccion', methods=['POST'])
def actualizarTransaccion():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    tran = Transaccion()
    if tran.actualizar_estado(comp):
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}


if __name__ == '__main__':
  app.run(host="25.7.209.143")

