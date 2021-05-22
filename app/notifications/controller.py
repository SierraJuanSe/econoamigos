from flask import request
from flask_socketio import emit, join_room, leave_room
from app import socketio, onlineUsers

@socketio.on('connect')
def connect():
  user = request.sid
  onlineUsers[user] = {}
  emit('sid', {'status': 'SocketConnected', 'sid':user})

@socketio.on('disconnect')
def disconnect():
  user = request.sid
  del onlineUsers[user]

@socketio.on('userInfo')
def userInfo(data):
  user = request.sid
  onlineUsers[user] = data


@socketio.on('connect', namespace='/chat')
def connect():
  print('se conecto a chat')

@socketio.on('disconnect', namespace='/chat')
def disconnect():
  print('se desconecto de chat')


@socketio.on('join', namespace='/chat')
def join(data):
  data['newUser'] = request.sid
  print('Se une a la sala')
  join_room(data['room'])
  emit('join', data, to=data['room'], namespace='/chat')

@socketio.on('leave', namespace='/chat')
def leave(data):
  data['leaveUser'] = request.sid
  print('Se va de la sala')
  emit('leave', data, to=data['room'], namespace='/chat')
  leave_room(data['room'])


@socketio.on('message', namespace='/chat')
def message(data):
  print('Se une a la sala')
  emit('message', data, to=data['room'], include_self=False, namespace='/chat')
