from flask import jsonify, request
from flask_socketio import send, emit, rooms
from websocket import socketio
from websocket.controllers import bp

users = {}

@bp.route('/socket')
def socket():
  return 'Socket'

@socketio.on('connect')
def connect():
  user = request.sid
  print(rooms())
  emit('sid', {'stastus': 'discsid', 'sid': user}, to=user)

@socketio.on('disconnect')
def test_disconnect():
  user = request.sid
  emit('sid', {'stastus': 'discsid', 'sid': user}, to=user)
  print(f'Client disconnected {user}')

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

