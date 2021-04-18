from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from config import Config

socketio = SocketIO(cors_allowed_origins='*')
cors = CORS()


def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)

  cors.init_app(app)
  socketio.init_app(app)

  from websocket.routes import bp as bp_routes
  app.register_blueprint(bp_routes)

  from websocket.controllers import bp as bp_controllers
  app.register_blueprint(bp_controllers)


  return app
