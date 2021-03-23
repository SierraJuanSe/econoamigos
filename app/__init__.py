from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from app.controlador import bp as controlador_bp
app.register_blueprint(controlador_bp)


from app.modelo.usuario import Usuario
from app.modelo.transaccion import Transaccion
from app.modelo.servicio import Servicio
from app.modelo.producto import Producto
from app.modelo.oferta import Oferta
from app.modelo.compra import Compra
