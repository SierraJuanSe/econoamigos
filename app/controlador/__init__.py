from flask import Blueprint

bp = Blueprint('controlador', __name__)

from app.controlador import controladorCompra, controladorOferta, controladorComentarios, controladorTransaccion, controladorUsuario, controladorValoracion
