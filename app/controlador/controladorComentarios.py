from app.controlador import bp
from app.modelo.comentarios import Comentario
from flask import request



# @app.route('/')
# def inicio():
#     return("Inicio Producto")

# Consulta los comentarios de una oferta
@bp.route('/consultarComentarios', methods=['POST'])
def consultarComentarios():
    msg = request.get_json()
    comentario = Comentario(Oferta_codOferta=msg.get('idOferta'))
    res = comentario.consultarComentarios()
    if len(res) != 0:
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea un comentario para ser publicado al instante
@bp.route('/insertarComentario', methods=['POST'])
def insertarComentario():
    msg = request.get_json()
    comentario = Comentario(descripcionComentario=msg.get('comentario'),Oferta_codOferta=msg.get('idOferta'),
                            Usuario_idUsuario=msg.get('idUsuario'))
    if comentario.agregarComentario():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}