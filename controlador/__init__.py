from modelo.usuario import Usuario
from modelo.transaccion import Transaccion
from modelo.compra import Compra
from modelo.servicio import Servicio
from modelo.producto import Producto
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def inicio():
    return("Inicio")

######## USUARIO ########

# Creación de un nuevo usuario
@app.route('/registro', methods=['POST'])
def registrarUsuario():
    msg = request.get_json()
    nuevo = Usuario(id = msg.get('idUsuario'), nombre = msg.get('nombreUsuario'),
               apellido = msg.get('apellidoUsuario'), email = msg.get('emailUsuario'), password = msg.get('passwordUsuario'))
    nuevo.tel = msg.get('telefonoUsuario')
    nuevo.ocupacion = msg.get('ocupacionUsuario')
    nuevo.fechaNac = msg.get('fechaNacimiento')
    nuevo.direccion = msg.get('direccion')
    if nuevo.registro():
        return {"status": 200, "info": True}
    else:
        return {"status": 400,"info": False}

# Permite o no el ingreso a la plataforma
@app.route('/ingreso', methods = ['POST'])
def ingresar():
    msg = request.get_json()
    usuarioReg = Usuario(email = msg.get('emailUsuario'), password= msg.get('passwordUsuario'))
    if usuarioReg.ingreso():
        respuesta = {"status": 200, "info": True, "token":{'id': usuarioReg.id, 'nombre': usuarioReg.nombre, 'apellido': usuarioReg.apellido,
                 'telefono': usuarioReg.tel, 'ocupacion': usuarioReg.ocupacion,
                 'fecha_Nacimiento': usuarioReg.fechaNac, 'moneda': usuarioReg.moneda, 'direccion': usuarioReg.direccion}}
        return respuesta
    else:
        return {"status": 400,"info": False, "token":""}

# Actualiza la información del usuario a excepción de su correo y fecha de nacimiento
@app.route('/actualizarUsuario', methods=['POST'])
def actualizarUsuario():
    msg = request.get_json()
    nuevo = Usuario(id = msg.get('idUsuario'), nombre = msg.get('nombreUsuario'),
               apellido = msg.get('apellidoUsuario'), password = msg.get('passwordUsuario'))
    nuevo.tel = msg.get('telefonoUsuario')
    nuevo.ocupacion = msg.get('ocupacionUsuario')
    nuevo.direccion = msg.get('direccionUsuario')
    if nuevo.actualizar():
        return {"status": 200, "info": True}
    else:
        return {"status": 400,"info": False}

# Retorna la información del usuario
@app.route('/consultarUsuario', methods = ['POST'])
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
@app.route('/recargar', methods=['POST'])
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


######## OFERTA ########


# Trae todas las ofertas excepto las que el usuario ofertó
@app.route('/consultarOfertas', methods=['POST'])
def consultarOfertas():
    msg = request.get_json()
    ofertas = Producto(idUsuario=msg.get('id'))
    res = ofertas.consultarTodaOferta()
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea una oferta para ser publicada al instante
@app.route('/consultarOfertaEspecifica', methods=['POST'])
def consultarOferta():
    msg = request.get_json()
    ofertas = Producto(idUsuario=msg.get('id'))
    res = ofertas.consultarOfertaEspecifica(msg.get('busqueda'))
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea un producto para ser ofertado al instante
@app.route('/insertarProducto', methods=['POST'])
def insertarProducto():
    msg = request.get_json()
    producto = Producto(nombre=msg.get('nombre'), descripcion=msg.get('descripcion'),
                        precio=msg.get('precio'), estado=True, idUsuario=msg.get('idUsuario'),
                        imagen=msg.get('imagen'), cantidad=msg.get('cantidad'))
    if producto.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

# Crea un servicio para ser ofertado al instante
@app.route('/insertarServicio', methods=['POST'])
def insertarServicio():
    msg = request.get_json()
    producto = Servicio(nombre=msg.get('nombre'), descripcion=msg.get('descripcion'),
                        precio=msg.get('precio'), estado=True, idUsuario=msg.get('idUsuario'),
                        lugar=msg.get('lugar'))
    if producto.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}


######## COMPRA ########


# Crea una compra de tal forma que se genere un transacción de ingreso y compra
# Su estado cambiará cuando el que oferta confirme la entrega o la prestación del servicio
@app.route('/insertarCompra', methods=['POST'])
def insertarCompra():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    tranCompra = Transaccion(concepto="Compra", usuario=user,
                           valor=int(msg.get('precio')), estado=False)
    user2 = Usuario(id=Transaccion().consultarIdUsuario(msg.get('idOferta')))
    tranIngreso = Transaccion(concepto="Ingreso", usuario=user2,
                           valor=int(msg.get('precio')), estado=False)
    tranCompra.agregar()
    tranIngreso.agregar()
    comp = Compra(precio=int(msg.get('precio')), estado=False, usuario=user,
                  cod_oferta=msg.get('idOferta'))
    if comp.agregar():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

# Retorna todas las ofertas que el usuario adquirió
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

# Retorna todas las ofertas que el usuario haya vendido
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

# El usuario que oferta confirma la compra
# Y automáticamente el trigger actualizará el total de moneda de comprador y vendedor
@app.route('/actualizarEstadoCompra', methods=['POST'])
def actualizarEstadoCompra():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    if comp.actualizar_estado():
        aux, moneda = Usuario(id=msg.get('idUsuario')).consultar()
        return {'status': 200, 'info':True, 'moneda': moneda}
    else:
        return {'status': 400, 'info':False}


######## TRANSACCION ########


# Se crea una transacción que por defecto estará en estado pendiente
@app.route('/insertarTransaccion', methods=['POST'])
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

# Actualiza el estado a completado en la transacción
@app.route('/actualizarEstadoTransaccion', methods=['POST'])
def actualizarTransaccion():
    msg = request.get_json()
    comp = Compra(id=msg.get('idCompra'))
    tran = Transaccion()
    if tran.actualizar_estado(comp):
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

# Ejecución del controlador
if __name__ == '__main__':
  app.run(host="25.7.209.143")