from app.controlador import bp
from app.modelo.oferta import Oferta
from flask import request



# @app.route('/')
# def inicio():
#     return("Inicio Producto")

# Trae todas las ofertas excepto las que el usuario ofertó
@bp.route('/consultarOfertas', methods=['POST'])
def consultarOfertas():
    msg = request.get_json()
    ofertas = Oferta(idUsuario=msg.get('id'))
    res = ofertas.consultarTodaOferta()
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea una oferta para ser publicada al instante
@bp.route('/consultarOfertaEspecifica', methods=['POST'])
def consultarOferta():
    msg = request.get_json()
    ofertas = Oferta(idUsuario=msg.get('id'))
    res = ofertas.consultarOfertaEspecifica(msg.get('busqueda'))
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea un oferta para ser publicada al instante
@bp.route('/insertarOferta', methods=['POST'])
def insertarProducto():
    msg = request.get_json()
    oferta = None
    if msg.get('tipo') == "Producto":
        oferta = Oferta(tipo="Producto", nombre=msg.get('nombre'), descripcion=msg.get('descripcion'),
                            precio=msg.get('precio'), estado=True, imagenProducto=msg.get('imagen'),
                            cantidadProducto=msg.get('cantidad'), idUsuario=msg.get('idUsuario'))
    elif msg.get('tipo') == "Servicio":
        oferta = Oferta(tipo="Servicio", nombre=msg.get('nombre'), descripcion=msg.get('descripcion'),
                            precio=msg.get('precio'), estado=True, lugarServicio=msg.get('lugar'),
                            idUsuario=msg.get('idUsuario'))

    if oferta != None and oferta.agregarOferta():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}


if __name__ == '__main__':
  app.run(host="25.7.209.143")
