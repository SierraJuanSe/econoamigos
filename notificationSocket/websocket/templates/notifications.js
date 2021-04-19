const URLSocket = 'http://127.0.0.1:5000'
let numNotifications = 0

// Objeto socket que maneja la connection
const socket = io(URLSocket, {
  autoConnect: false,
})

/* 
acciones

estos son los eventos que envia el cliente al servidor para establecer la conexion
y enviar informacion.
*/

/*
Conecta el socket al servidor
Esta funcion se debe poner cuando se confirma el login del usuario
*/
socket.connect() 

/*
Desconecta al socket del servidor
Se debe llamar cuando el usaurio cierra sesion
*/
socket.disconnect()


/* escuchas

estos son los eventos que escuchan al servidor en busca de informacion

*/
 
// El servidor envia un id unico confirmando su conexion
socket.on('sid', (data) => {
  socketVendor.emit('userInfo', readCookie('token'))
})

// escucha si se ha creado una compra de alguna de sus ofertas publicadas
socketVendor.on('buyNotification', (data) => {
  numNotifications += 1;
  // aca se llama a la funcion que dibuja la notificacion
})
