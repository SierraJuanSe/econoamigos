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
$(document).on('click', '.btn-send', function() {
    sendMsg(this)
});

//Enter para enviar documento
$(document).on('keypress', '.ipt-chat', function(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        sendMsg(this)
    }
});

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
function sendMsg(btn) {
    let info = getInfoMsgOut(btn)
    if (info.msg != '') {
        drawMsgOut(info)
            // websocket.send(JSON.stringify(info))
    }
}

//Recolectar Datos
function getInfoMsgOut(btn) {
    //const USUARIO = JSON.parse(readCookie('token'));
    let msg = $(btn).parent().children('ipt-cha').val();
    let chat = $(btn).parent().parent().parent().parent().attr('id');
    let today = new Date()
    let time = today.getHours() + ':' + today.getMinutes();

    info = {
        type: 'msg',
        from: "Val", ///JSON.parse(USUARIO['nombre']), //Ajustar
        to: chat,
        msg: msg,
        time: time
    }
    $(btn).parent().children('.ipt-chat').val('')
    console.log(info)
    return info
}

//Pintar en pantalla el mensaje
function drawMsgOut(info) {
    let chatPage = $('#' + info.to).find('.msg-page');
    let outgoingMSg = '<div class="outgoing-chats"><div class="outgoing-msg-inbox">\
                    <p>' + info.msg + '</p><span class="time-send">' + info.time + '</span></div></div>'
    chatPage.append(outgoingMSg).parent().animate({ scrollTop: chatPage.prop("scrollHeight") }, 500);
}

/* Funciones para agregar un nuevo chat */

//Abrir pestaña nueva
function openChat(codcompra, grupo) {
    let chatCont = $('#chatContainer')

    if (chatsActivos.includes(grupo)) {
        $('#chat' + grupo).show()
    } else {
        chatCont.append(drawChat(codcompra, grupo))
        chatsActivos.push(grupo)
    }
}

//Pintar pestaña de nuevo chat
function drawChat(codcompra, grupo) {
    let chatDiv = '<div class="chati"><div id="' + grupo + '" class="chat" value>' +
        '<div class="msg-header"><div class="msg-header-name"><h4>' + grupo + '</h4></div>' +
        '<div class="header-icons">' +
        '<i class="min-chat fas fa-minus"></i><i class="close-chat fas fa-times"></i></div></div>' +
        '<div class="chat-page">' +
        '<div class="msg-inbox">' +
        '<div class="chats"><div class="msg-page"></div></div></div>' +
        '<div class="msg-bottom">' +
        '<div class="input-group">' +
        '<textarea type="text" class="form-control ipt-chat' + codcompra + '" placeholder="Escribe un mensaje" rows="1"></textarea>' +
        '<div class="input-group-append btn-send">' +
        '<span class="input-group-text"><i class="fab fa-telegram-plane fa-lg"></i></span>' +
        '</div></div></div></div></div></div>'
    return chatDiv
}
/* Funciones para la respuesta*/
/*
function reciveMsg(mensaje) {
    let msg = JSON.parse(mensaje.data);

    if (msg.type === 'msg') {
        if (msg.from === actualUsuario.nombre) {
            drawMsgOut(msg)
        } else {
            drawRecivedMsg(msg);
        }
    }
}
*/
function drawRecivedMsg(msg) {
    let chatPage = $('#' + msg.to).find('.msg-page');
    let recivedMsg = '<div class="received-chats"><div class="received-msg-inbox">\
    <p><span class="sender">' + msg.from + '</span>' + msg.msg + '</p>\
    <span class="time-send">' + msg.time + '</span></div></div>'

    chatPage.append(recivedMsg).parent().animate({ scrollTop: chatPage.prop("scrollHeight") }, 500);
}