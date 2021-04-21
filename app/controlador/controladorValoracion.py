from app.controlador import bp
from app.modelo.valoracion import Valoracion
from flask import request



# @app.route('/')
# def inicio():
#     return("Inicio Valoracion")

# Consulta el promedio del puntaje de una oferta
@bp.route('/consultarPromedioValoracion', methods=['POST'])
def consultarPromedioValoracion():
    msg = request.get_json()
    valoracion = Valoracion(Oferta_codOferta=msg.get('idOferta'))
    res = valoracion.consultarPromedio()
    if res != "":
        return {'status': 200, 'info': res}
    else:
        return {'status': 404}

# Crea un valoración de una oferta
@bp.route('/insertarValoracion', methods=['POST'])
def insertarValoracion():
    msg = request.get_json()
    valoracion = Valoracion(valor=msg.get('valor'), Oferta_codOferta=msg.get('idOferta'))

    if valoracion.agregarValoracion():
        return {'status': 200, 'info':True}
    else:
        return {'status': 400, 'info':False}