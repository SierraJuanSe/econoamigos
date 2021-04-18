//Mostrar nombre del usuario
//if (window.location.href.includes('menu.html')) {
mostrarNombre();
mostrarSaldo();
//}


function mostrarNombre() {
    const USUARIO = JSON.parse(readCookie('token'));
    $("#nombreUser").empty();
    $("#nombreUser").append(USUARIO['nombre'] + ' ' + USUARIO['apellido']);
}
//Mostrar saldo del usuario
function mostrarSaldo() {
    const USUARIO = JSON.parse(readCookie('token'));
    $("#saldoUser").empty();
    $("#saldoUser").append(' ' + USUARIO['moneda']);
}

function actualizarMonedaVista(newMoneda) {

    $("#saldoUser").empty();
    $("#saldoUser").append(' ' + newMoneda.toString());
}

function mostrarCompras(codcompra, nombre, descripcion, tipo, precio, estado, lugar, imagen) {
    if (tipo == "Producto") {
        namelugar = "";
        nameimagen = "";
        nameimagen = '<img id="imagenmodOfe" src=' + imagen + ' align="middle" width="300px">';
    } else {
        namelugar = "Lugar: " + lugar;
        nameimagen = " ";
    }
    if (estado) {
        nameestado = "Adquirido";
    } else {
        nameestado = "En Proceso"
    }
    ofertasC = "";
    ofertasC = '<div class="col-sm-4" id="' + codcompra + '">' + '<div class="card">' + '<div class="card-header" id="tipoOferta">' + tipo + '</div>' + '<div class="card-body">' +
        '<h5 class="card-title" id="nombreOferta">' + nombre + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="precioOferta">' + precio + '</h6>' + '<p class="card-text" id="descOferta">' + descripcion + '</p>' +
        '<button type="button" id="vermasbot" class="card-link" data-toggle="modal" data-target="#myModal' + codcompra + '">Ver más...</button>' + '<div class="modal" id="myModal' + codcompra + '">' + '<div class="modal-dialog">' +
        '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title">' + nombre + '</h4>' + '<button id="cerrarMod" type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' + '<div class="modal-body">' + nameimagen + '<h6 id="preciomodOfe" class="modal-title">$' + precio + '</h6>' +
        '<h6 id="estadomodOfe" class="modal-title">Estado: ' + nameestado + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">' + namelugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' +
        '<form name="nombreform">' +
        '<br>Puntua la Oferta:' +
        '<p class="clasificacion">' +
        '<input id="radio1 ' + codcompra + '" type="radio" name="estrellas" class="radioBotones ' + codcompra + '" value="5"><label for="radio1 ' + codcompra + '">★</label>' +
        '<input id="radio2 ' + codcompra + '" type="radio" name="estrellas" class="radioBotones ' + codcompra + '" value="4"><label for="radio2 ' + codcompra + '">★</label>' +
        '<input id="radio3 ' + codcompra + '" type="radio" name="estrellas" class="radioBotones ' + codcompra + '" value="3"><label for="radio3 ' + codcompra + '">★</label>' +
        '<input id="radio4 ' + codcompra + '" type="radio" name="estrellas" class="radioBotones ' + codcompra + '" value="2"><label for="radio4 ' + codcompra + '">★</label>' +
        '<input id="radio5 ' + codcompra + '" type="radio" name="estrellas" class="radioBotones ' + codcompra + '" value="1"><label for="radio5 ' + codcompra + '">★</label></p></form>' +
        '</div></div></div></div></div></div></div></div>';

    $("#compras").append(ofertasC);
    $(".radioBotones").click(function() {
        console.log(codcompra)
        var radiovalue = $(this).val();
        if (radiovalue == 0) radiovalue = "ninguno";
        alert("Valor seleccionado: " + radiovalue)
        radio(radiovalue)
        insertarValoracion(codcompra, radiovalue)
    });
}

function obtenerValoracion(idOferta, radiovalue) {

    // save = await insertarValoracion(idOferta, radiovalue);
    if (save == undefined) {
        swal("Por favor, Intenta más tarde", {
            icon: "error"
        });
    } else {
        swal("Has punteado la oferta correctamente", {
            icon: "success"
        });
    }
}

//Mostrar los comentarios a ofertas para responder
function mostrarComentarios(codComentario, codOferta, descripcion, hora, idUsuario, respuesta) {
    //Codigo HTML
    if (respuesta == "" || respuesta == null) {
        comO = "";
        comO = '<div class="col-sm-4" id="Card' + codComentario + '">' + '<div class="card">' + '<div class="card-header" id="codOferta' + codComentario + '">Oferta Nº ' + codOferta + '</div>' + '<div class="card-body">' +
            '<h5 class="card-title" id="nombreComentario">' + descripcion + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="horaComentario"> Hora Comentario: ' + hora + '</h6>' +
            '<button type="button" id="vermasbot" class="card-link" data-toggle="modal" data-target="#myModal' + codComentario + '">Dar Respuesta</button>' + '<div class="modal" id="myModal' + codComentario + '">' + '<div class="modal-dialog">' +
            '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title"> Dar Respuesta </h4>' + '<button id="cerrarMod" type="button" class="close" data-dismiss="modal">&times;</button>' +
            '</div>' + '<div class="modal-body">  <h6> Comentario: </h6> <id="preciomodOfe" class="modal-title">' + descripcion + '<br> <br> <h6> Respuesta: </h6> <textarea class="form-control" id="respuestComentario ' + codComentario + '"></textarea>' +
            '<a  id="BotonEnviarRespuesta' + codComentario + '" type="button" class="btn">' + 'Enviar Respuesta' + '</a></div></div></div></div></div></div></div></div></div></div>';
        $("#comentarios").append(comO);
        botonEnviarRespuesta(codComentario);
    }
}

function botonEnviarRespuesta(codComentario) {
    $("#BotonEnviarRespuesta" + codComentario).click(async function() {
        if ($("#respuestComentario" + codComentario).val() != "") {
            rta = $("#respuestComentario").val();
            save = await crearRespuesta(codComentario, rta);
            if (!save) {
                swal("Por favor, Intenta más tarde", {
                    icon: "error"
                });
            } else {
                swal("Respuesta Almacenada correctamente", {
                    icon: "success"
                });
                $("#myModal" + codComentario).modal('hide');
                $("#Card" + codComentario).remove();
            }
        } else {
            swal("Error,Ingresa una respuesta", {
                icon: "error"
            });
        }

    });
}

//Mostrar todas las solicitudes a ofertas
function mostrarSolicitudes(codCompra, id, nombre, apellido, telefono, direccion, oferta, estado) {
    //Codigo HTML
    if (!estado) {
        solO = "";
        solO = '<tr id="filasol' + codCompra + '"><th scope="row" id="solicitud' + codCompra + '">' + id + '</th><td id="nomsolicitud' + id + '">' + nombre + ' ' + apellido + '</td><td id="telsolicitud">' + telefono +
            '</td><td id="dirsolicitud' + id + '">' + direccion + '</td><td id="ofolicitud">' + oferta + '</td><td><div class="custom-control custom-checkbox" id="check" style="width: 70%;">' +
            '<input type="checkbox" class="custom-control-input" id="customCheck' + codCompra + '"><label class="custom-control-label" for="customCheck' + codCompra + '"></label></td></tr>';
        //Inserscion al HTML
        $("#solicitudes").append(solO);
        checkbox(id, estado, codCompra);
    }
}
//Mostrar todas las  ofertas
function mostrarOfertas(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir) {
    var dibujarComment = "";


    for (const coment of comentarios) {
        dibujarComment += '<p class="lead_text-muted" id="letter">' + coment['descripcion'] + '</p>';
        if (coment['respuesta']) {
            dibujarComment += '<p class="lead_text-muted2" id="letter">' + coment['respuesta'] + '</p>'
        }

    }
    if (tipo == "Servicio") {
        lugar = "Lugar: " + lugar;
        cantidad = "";
        nameimagen = " ";
        // nameimagen = '<img id="imagenmodOfe" src=' + imagen + ' align="middle" width="300px">';
    } else {
        lugar = " ";
        cantidad = "Cantidad: " + cantidad;
        nameimagen = '<img id="imagenmodOfe" src=' + imagen + ' align="middle" width="300px">';
    }

    ofertasC = "";
    ofertasC = '<div class="col-sm-4" id="' + id + '">' + '<div class="card">' + '<div class="card-header" id="tipoOferta">' + tipo + '</div>' + '<div class="card-body">' +
        '<h5 class="card-title" id="nombreOferta">' + nombre + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="descripcionOferta">' + descripcion + '</h6>' + '<p class="card-text" id="precioOferta">' + precio + '</p>' +
        '<button type="button" id="vermasbot" class="card-link" data-toggle="modal" data-target="#myModal' + id + '">Ver más...</button>' + '<div class="modal" id="myModal' + id + '">' + '<div class="modal-dialog">' +
        '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title">' + nombre + '</h4>' + '<button id="cerrarMod" type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' + '<div class="modal-body">' + nameimagen + '<h6 id="preciomodOfe" class="modal-title">$' + precio + '</h6>' +
        '<h6 id="estadomodOfe" class="modal-title">' + cantidad + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">' + lugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' + '<button type="button" id="vermasbotComentar' + id + '" class="card-link" data-toggle="modal" data-target="#myComment" >' + 'Ver comentarios' + '</button>' +
        '<div class="modal-comment" id="myComment" style="display:none;">' + '<div class="form-group ">' + '<div>' + dibujarComment + '</div>' + '<textarea class="control " id="descripcionComent" placeholder="Comentario" rows="5 ">' + '</textarea>' + '<a  id="BotonEnviarComentario' + id + '" type="button" class="btn">' + 'Enviar Comentario' + '</a>' +
        '</div>' + '</div>' + '<a id="BotonComprar' + id + '" type="button" class="btn">Comprar</a>'
    for (var i = 0; i < recibir; i++) {

        ofertasC += '<label >⭐</label>'
    } +
    '</div></div></div></div></div></div></div></div>';
    $("#ofertas").append(ofertasC);
    botonCrearCompra(id, precio);
    pedirValoracion(id);
    botonEnviarComentario(id);

}

function pedirValoracion(id) {
    console.log(id)
    var recibir = consultarPromedioValoracion(id);
    console.log(recibir)
}

//Accciones del checkbox
function checkbox(id, estado, codCompra) {

    //Accion de boton al checkbox
    $("#customCheck" + codCompra).click(function() {
        accionesCheck(id, codCompra);
    });
}


function botonEnviarComentario(id) {
    $("#BotonEnviarComentario" + id).click(async function() {
        if ($("#descripcionComent").val() != "") {
            comment = $("#descripcionComent").val();

            save = await EnviarComentario(id, comment);
            if (save == undefined) {
                swal("Por favor, Intenta más tarde", {
                    icon: "error"
                });
            } else {
                swal("Comentario Ingresado correctamente", {
                    icon: "success"
                });
            }
        } else {
            swal("Error,Ingresa un Comentario", {
                icon: "error"
            });
        }

    });
}


function botonCrearCompra(idOferta, precio) {


    $("#BotonComprar" + idOferta).click(async function() {
        const USUARIO = JSON.parse(readCookie('token'));
        if (USUARIO['moneda'] > precio) {
            var save = await crearCompra(idOferta, precio);
            if (save) {
                $("#myModal" + idOferta).modal("hide");
                swal("Compra Realizada", {
                    icon: "success"
                });
            } else {
                swal("Error, tu compra no fue realizada", {
                    icon: "error"
                });
            }
        } else if ((USUARIO['moneda'] < precio)) {
            swal("Error", "No tienes suficiente saldo para adquirir este producto", "error");
        }

    });

}


function accionesCheck(id, codCompra) {
    //Acciones de la alerta
    swal({
            title: "¿Estas seguro de cambiar el estado de la solicitud?",
            text: "Una vez hecha la confirmación no podras revertirlo ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Tu solicitud ha sido realizada, ya podras Verificar tu saldo", {
                    icon: "success"
                });
                var result = actualizarSolicitud(codCompra);
                console.log(result.info)

            } else {
                $("#customCheck" + codCompra).prop("checked", false);
            }
        });
}

function mostrarTransacciones(concepto, estado, precio) {
    if (estado) {
        nameEstado = "Realizado"
    } else {
        nameEstado = "En Proceso"
    }
    if (concepto == 'compra' || concepto == 'Compra') {
        precio = '-' + precio;
    }
    fila = "";
    fila = '<tr><td data-lable="Concepto">' + concepto + '</td><td data-lable="Estado">' + nameEstado + '</td><td data-lable="Precio">' + precio + '</td></tr>';
    console.log(fila);
    $("#Transacciones").append(fila);

}

function mostrarHistorialOfertas(nombre, comprador, ingreso, estado) {
    if (estado) {
        fila = "";
        fila = '<tr><td data-lable="Nombre">' + nombre + '</td><td data-lable="Oferta">' + comprador + '</td><td data-lable="Ingreso">' + ingreso + '</td></tr>';
        $("#Ofertas").append(fila);
    }
}
//Mostrar todas las notificaciones
function mostrarNotificaciones(hora, concepto) {

    notificaciones1C = "";
    notificaciones1C = '<li class="mcd success">' + '<div class="notify_icon">' + '<span class="icon">' + '</span>' + '</div>' + '<div class="notify_data">' +
        '<div class="title">' + hora + '</div>' + '<div class="sub_title">' + concepto + '</div>' + '</div>' + '</li>';
    $("#NotificacionesCampana").append(notificaciones1C);
    $("#NotificacionesVentana").append(notificaciones1C);
}


//Mostrar alertas notificaciones
function mostrarAlertas(hora, concepto) {

    notificaciones2C = "";
    notificaciones2C = '<div class="toast" role="alert" aria-live="assertive" data-autohide="false" >' + '<div class="toast-header" >' + '<strong class="mr-auto">Nueva Notificación</strong>' +
        '<small class="text-muted">' + hora + '</small>' + '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' +
        '</div>' + '<div class="toast-body">' + concepto + '</div>' + '</div>' + '</div>' + '</div>';
    $("#Alertas").empty();
    $("#Alertas").append(notificaciones2C);
    $('.toast').toast('show');
}