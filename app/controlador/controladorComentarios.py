from app.controlador import bp
from app.modelo.comentarios import Comentario
from app.modelo.usuario import Usuario
from flask import request

# @app.route('/')
# def inicio():
#     return("Inicio Comentario")

# Consulta los comentarios de una oferta
@bp.route('/consultarComentarios', methods=['POST'])
def consultarComentarios():
    msg = request.get_json()
    comentario = Comentario(Oferta_codOferta=msg.get('idOferta'))
    res = comentario.consultarComentarios()
    return {'status': 200, 'info': res}

# Consulta los comentarios de una oferta propia
@bp.route('/consultarMisComentarios', methods=['POST'])
def consultarMisComentarios():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    comentario = Comentario(usuario=user)
    res = comentario.consultarMisComentarios()
    return {'status': 200, 'info': res}

# Crea un comentario para ser publicado al instante
@bp.route('/insertarComentario', methods=['POST'])
def insertarComentario():
    msg = request.get_json()
    user = Usuario(id=msg.get('idUsuario'))
    comentario = Comentario(descripcionComentario=msg.get('comentario'),Oferta_codOferta=msg.get('idOferta'),
                            usuario=user)
    if comentario.agregarComentario():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}

# Crea una respuesta a un comentario
@bp.route('/insertarRespuesta', methods=['POST'])
def insertarRespuesta():
    msg = request.get_json()
    comentario = Comentario(respuestaComentario=msg.get('respuesta'))
    if comentario.agregarRespuesta(msg.get('idComentario')):
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}    