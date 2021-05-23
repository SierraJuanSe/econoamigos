let chatsActivos = []

/* Funciones de click */

//Minimizar
$(document).on('click', '.min-chat', function() {
    minChat(this);
});

//Cerrar
$(document).on('click', '.close-chat', function() {
    closeChat(this)
});

//Enviar
function sendMessage(codCompra,id) {
    $("#btnSend" + codCompra).click(async function() {
        console.log("A")
        sendMsg(codCompra,id)
    });
    //Enter para enviar documento
    $('#inputchat' + codCompra).keypress(function(e) {
        if (e.which == 13) {
            console.log("A")

            e.preventDefault();
            sendMsg(codCompra,id);
        }
    });
}

/* Funciones para las funciones de click */

//Minimizar chat
function minChat(chat_page) {
    let chat = $(chat_page).parent().parent().parent()
    chat.children('.chat-page').slideToggle();
}

//Cerrar Chat
function closeChat(chat_page) {
    let chat = $(chat_page).parent().parent().parent()
    chat.find('.msg-page').empty()
    chat.slideToggle()
}

//Enviar Mensaje
function sendMsg(codCompra,id) {
    let info = getInfoMsgOut(codCompra,id)
    if (info.msg != '') {
        drawMsgOut(info)
        socketChat.emit('message', info)
    }
}

//Recolectar Datos
function getInfoMsgOut(codCompra,id) {
    //const USUARIO = JSON.parse(readCookie('token'));
    let msg = $('#inputchat' + codCompra).val();
    let today = new Date()
    let time = today.getHours() + ':' + today.getMinutes();
    var USUARIO = JSON.parse(readCookie('token'));
    info = {
        destinatario:id,
        Usuario_idUsuario: USUARIO['id'],
        desMensaje: msg,
        Compra_codCompra: codCompra,
        room : 'room'+codCompra,
        time: time
    }
    console.log(info)
    $('#inputchat' + codCompra).val('');
    return info
}

//Pintar en pantalla el mensaje del emisor
function drawMsgOut(info) {
    let chatPage = $('#chat' + info.Compra_codCompra).find('.msg-page');
    let outgoingMSg = '<div class="outgoing-chats"><div class="outgoing-msg-inbox">\
                    <p>' + info.desMensaje + '</p><span class="time-send">' + info.time + '</span></div></div>'
    chatPage.append(outgoingMSg).parent().animate({ scrollTop: chatPage.prop("scrollHeight") }, 500);
}

/* Funciones para agregar un nuevo chat */

//Pintar pestaña de nuevo chat
function drawChat(codcompra, grupo) {
    let chatDiv = '<div class="chati" ><div id="chat' + codcompra + '"  style= "display: none;" class="chat" value>' +
        '<div class="msg-header"><div class="msg-header-name"><h4>' + grupo + '</h4></div>' +
        '<div class="header-icons">' +
        '<i class="min-chat fas fa-minus"></i><i class="close-chat fas fa-times"></i></div></div>' +
        '<div class="chat-page">' +
        '<div class="msg-inbox">' +
        '<div class="chats"><div class="msg-page" id="msginbox' + codcompra + '"></div></div></div>' +
        '<div class="msg-bottom">' +
        '<div class="input-group">' +
        '<textarea type="text" class="form-control ipt-chat" id="inputchat' + codcompra + '"  placeholder="Escribe un mensaje" rows="1"></textarea>' +
        '<div class="input-group-append btn-send" id="btnSend' + codcompra + '">' +
        '<span class="input-group-text"><i class="fab fa-telegram-plane fa-lg"></i></span>' +
        '</div></div></div></div></div></div>'
    return chatDiv
}

/* Funciones para la respuesta*/

//Funcion de Pruebas
function reciveMsg(mensaje) {
    msg = {
        codMensaje: 1,
        destinatario: "1000257419",
        Usuario_idUsuario: "1010029624",
        desMensaje: "Te amo",
        Compra_codCompra: "003",
        time: "21:35"
    }
    drawRecivedMsg(msg);

}

function drawRecivedMsg(msg) {

    let chatPage = $('#chat' + msg.Compra_codCompra).find('.msg-page');
    let recivedMsg = '<div class="received-chats"><div class="received-msg-inbox">\
      <p>' + msg.desMensaje + '</p>\
      <span class="time-send">' + msg.time + '</span></div></div>'
    chatPage.append(recivedMsg).parent().animate({ scrollTop: chatPage.prop("scrollHeight") }, 500);
}

socketChat.on('message', drawRecivedMsg)

socketChat.on('chatNotification', (data) => {
    $("#Alertas").empty();
    mostrarNotificaciones(data.time, "tienes un nuevo mensaje");
    mostrarAlertas(data.time, "tienes un nuevo mensaje");
});
