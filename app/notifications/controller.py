from flask import jsonify, request
from flask_socketio import emit, rooms
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
  print(data)
  user = request.sid
  onlineUsers[user] = data
