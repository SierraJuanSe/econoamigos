from flask import request, jsonify
from app.controlador import bp
from app.modelo.oferta import Oferta
from app.modelo.usuario import Usuario
from app.utils.formValidations import validate_getpublications, create_response

@bp.route('/publications')
def publications():
    o = Oferta().consultarOferta(22)
    return jsonify({"solo":o.__dict__, "todos": Oferta.queryAll()})

# Trae todas las ofertas excepto las que el usuario ofertó
@bp.route('/consultarOfertas', methods=['POST'])
def consultarOfertas():
    msg = request.get_json()
    response = [{"status": 200,"info": {}, "message": "OK"}, 200]
    isValid = validate_getpublications(msg)
    if isValid[0]:
        u = Usuario(id=msg.get('id'))
        ofertas = Oferta(idUsuario=u.id)
        response[0]["info"]["ofertas"] = ofertas.consultarTodaOferta()
        response[0]["info"]["misofertas"] = ofertas.consultarMisOfertas()
    else:
        response = create_response(response, False, isValid[1], 400)

    return tuple(response)

# Trae todas las ofertas del barrio del usuario
@bp.route('/consultarOfertasBarrio', methods=['POST'])
def consultarOfertasMiBarrio():
    msg = request.get_json()
    response = [{"status": 200,"info": {}, "message": "OK"}, 200]
    ofertas = Oferta(idUsuario=msg.get('id'), codBarrio =msg.get('codBarrio'))
    response[0]["info"]["ofertas"] = ofertas.consultarOfertasMiBarrio()
    response[0]["info"]["misofertas"] = ofertas.consultarMisOfertas()
    return tuple(response)

# Trae todas las ofertas publicadas por el usuario
@bp.route('/consultarMisOfertas', methods=['POST'])
def consultarMisOfertas():
    msg = request.get_json()
    ofertas = Oferta(idUsuario=msg.get('id'))
    res = ofertas.consultarMisOfertas()
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

# Trae los mejores servicios de la plataforma
@bp.route('/consultarOfertasTop', methods=['POST'])
def consultarOfertasTop():
    msg=request.get_json()
    ofertas = Oferta(idUsuario=msg.get('idUsuario'))
    servicios = ofertas.consultarServiciosTop()
    productos = ofertas.consultarProductosTop()
    MisOfertas= ofertas.consultarMisOfertas()
    if len(servicios) != 0 and len(productos) != 0:
        return {'status': 200, 'info': {'servicios':servicios,'productos':productos,'misOfertas':MisOfertas}}
    else:
        return {'status': 404}



# Crea un oferta para ser publicada al instante
@bp.route('/insertarOferta', methods=['POST'])
def insertarOferta():
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
    print(oferta.tipo)
    if oferta != None and oferta.agregarOferta():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}
