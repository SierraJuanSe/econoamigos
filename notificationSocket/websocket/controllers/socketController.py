from flask import jsonify
from flask_socketio import send, emit
from websocket import socketio
from websocket.controllers import bp

users = {}

@bp.route('/socket')
def socket():
  return 'Socket'

@socketio.on('connect')
def connect():
  print(socketio)

@socketio.on('disconnect')
def test_disconnect():
  print('Client disconnected')

@socketio.on('userRegistration')
def userRegistration(user):
  users[user['username']] = []
  emit('userRegistration', {'status': 'userRegistred'})
  emit('userNew', list(users.keys()), broadcast=True)

@socketio.on('userExit')
def userRegistration(user):
  del users[user['username']]
  emit('userRegistration', {'status': 'userRegistred'})
  emit('userNew', list(users.keys()), broadcast=True)

@socketio.on('message')
def userRegistration(data):
  users[data['user']].append(data['text'])
  print(users)
  emit('message', data, broadcast=True, include_self=False)

