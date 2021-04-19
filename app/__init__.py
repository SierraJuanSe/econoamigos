from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from config import Config

socketio = SocketIO(cors_allowed_origins='*')
cors = CORS()
onlineUsers = {}

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)


  cors.init_app(app)
  socketio.init_app(app)

  from app.controlador import bp as controlador_bp
  app.register_blueprint(controlador_bp)
  
  from app.notifications import bp as notifications_bp
  app.register_blueprint(notifications_bp)

  return app


from app.modelo.usuario import Usuario
from app.modelo.transaccion import Transaccion
from app.modelo.comentarios import Comentario
from app.modelo.producto import Oferta
from app.modelo.valoracion import Valoracion
from app.modelo.compra import Compra
