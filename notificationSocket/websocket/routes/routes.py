from flask import render_template, jsonify
from websocket.routes import bp

@bp.route('/')
@bp.route('/index')
def index():
  return jsonify({'data': 'holax2'})
