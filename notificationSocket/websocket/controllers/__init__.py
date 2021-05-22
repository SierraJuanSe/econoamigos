from flask import Blueprint

bp = Blueprint('controllers', __name__)

from websocket.controllers import socketController
