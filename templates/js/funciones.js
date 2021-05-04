//Mostrar nombre del usuario
if (readCookie('token')) {
    socket.connect();
    mostrarNombre();
    mostrarSaldo();
}

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

function mostrarCompras(codcompra, nombre, descripcion, tipo, precio, estado, lugar, imagen, codOferta) {
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
        '<button type="button" id="vermasbot' + codcompra + '" class="card-link" data-toggle="modal" data-target="#myModal' + codcompra + '">Ver más...</button>' + '<div class="modal" id="myModal' + codcompra + '">' + '<div class="modal-dialog">' +
        '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title">' + nombre + '</h4>' + '<button id="cerrarMod' + codcompra + '" type="button" class="close" data-dismiss="modal">&times;</button>' +
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
    enviarValoracion(codOferta)
}

function enviarValoracion(codOferta) {
    $(".radioBotones").click(async function() {
        var radiovalue = $(this).val();
        if (radiovalue == 0) radiovalue = "ninguno";
        var save = await insertarValoracion(codOferta, radiovalue)
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
            '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title"> Dar Respuesta </h4>' + '<button id="cerrarMod' + codComentario + '" type="button" class="close" data-dismiss="modal">&times;</button>' +
            '</div>' + '<div class="modal-body">  <h6> Comentario: </h6> <id="preciomodOfe" class="modal-title">' + descripcion + '<br> <br> <h6> Respuesta: </h6> <textarea class="form-control" id="respuestComentario' + codComentario + '"></textarea>' +
            '<a  id="BotonEnviarRespuesta' + codComentario + '" type="button" class="btn">' + 'Enviar Respuesta' + '</a></div></div></div></div></div></div></div></div></div></div>';
        $("#comentarios").append(comO);
        botonEnviarRespuesta(codComentario);
    }
}

function botonEnviarRespuesta(codComentario) {
    $("#BotonEnviarRespuesta" + codComentario).click(async function() {
        if ($("#respuestComentario" + codComentario).val() != "") {
            rta = $("#respuestComentario" + codComentario).val();
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
function mostrarSolicitudes(codCompra, id, nombre, apellido, telefono, direccion, oferta, metodopago, pago, estado) {
    //Codigo HTML
    var feli = "";
    if (!estado) {
        if (metodopago == "Oferta") {
            feli = '<button type="button" class="card-link" data-toggle="modal" data-target="#exampleModal' + codCompra + '">Ver más</button>' +
                '<div class="modal fade" id="exampleModal' + codCompra + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title" id="exampleModalLabel">Solicitud de Intercambio de Oferta </h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">&times;</button>' +
                '</div>' +
                '<div class="modal-body">Oferta: ' + pago + '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn" id="rechazarOferta' + codCompra + '">Rechazar</button>' +
                '</div></div></div></div>';

        }
        solO = "";
        solO = '<tr id="filasol' + codCompra + '"><th scope="row" id="solicitud' + codCompra + '">' + id + '</th><td id="nomsolicitud' + id + '">' + nombre + ' ' + apellido + '</td><td id="telsolicitud">' + telefono +
            '</td><td id="dirsolicitud' + id + '">' + direccion + '</td><td id="ofolicitud">' + oferta + '</td><td id="metodopagosolicitud"><div class="row"><div class="col">' + metodopago + '</div><div class="col-md-auto">' + feli + '</div></div></td><td><div class="custom-control custom-checkbox" id="check" style="width: 70%;">' +
            '<input type="checkbox" class="custom-control-input" id="customCheck' + codCompra + '"><label class="custom-control-label" for="customCheck' + codCompra + '"></label></td></tr>';
        //Inserscion al HTML
        $("#solicitudes").append(solO);
        accionesBtnRechazar(codCompra);
        checkbox(id, estado, codCompra);
    }
}

function accionesBtnRechazar(codCompra) {
    $("#rechazarOferta" + codCompra).click(async function() {
        swal({
                title: "¿Estás seguro de rechazar este intercambio?",
                text: "Una vez hecha la confirmación no podrás revertirlo ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    var result = rechazarSolicitud(codCompra);
                    console.log(result)
                    if (result) {
                        $('#exampleModal' + codCompra).modal('hide');
                        $('#filasol'+codCompra).remove()
                    }

                } else {
                    swal("Error,Intenta más tarde", {
                        icon: "error"
                    });
                }
            });


    });
}

//Mostrar todas las  ofertas
function mostrarOfertas(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir, OfertasOfrecidas) {
    var dibujarComment = "";
    var dibujarPunt = "";
    var dibujarofertasPago = "";

    for (var i = 0; i < recibir; i++) {
        dibujarPunt += '<label >⭐</label>'
    }
    if (recibir == 0) {
        dibujarPunt += '<label >☆☆☆☆☆</label>'
    }
    for (const coment of comentarios) {
        dibujarComment += '<p class="lead_text-muted" id="letter">' + coment['descripcion'] + '</p>';
        if (coment['respuesta']) {
            dibujarComment += '<p class="lead_text-muted2" id="letter">' + coment['respuesta'] + '</p>'
        }
    }
    console.log(OfertasOfrecidas)
    for (const ofert of OfertasOfrecidas) {
        dibujarofertasPago += '<option value="' + ofert['codOferta'] + '" id="ButonEconomonedas">' + ofert['nombreOferta'] + '</option>';
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
        '<h6 id="estadomodOfe" class="modal-title">' + cantidad + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">' + lugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' + '<form class="MetodosDepago1">' +
        '<label class="cars">' + 'Seleccione el metodo de pago' + '</label>' + '<select name="cars" id="cars'+id+'">' + '<option value="seleccion" >' + 'Seleccione' + '</option>' + '<option value="economonedas" id="ButonEconomonedas">' + 'Economonedas' + '</option>' +
        '<option value="oferta">' + 'Por productos o servicios ofrecidos' + '</option>' + '</select>' + '<a id="escogerMetodoPago'+id+'" type="button" class="MetodoPago" >Click metodo pago</a>' + '</form>' + '<form class="MetodosDepago2" id="metodoPago2id" style="display:none;" >' +
        '<label class="cars2">' + 'Seleccione el servicio o producto por el cual desea pagar' + '</label>' + '<select name="cars2" id="cars2'+id+'">' + '<option value="seleccion" >' + 'Seleccione' + '</option>' + dibujarofertasPago + '</select>' + '</form>' +
        '<button type="button" id="vermasbotComentar' + id + '" class="card-link" data-toggle="modal" data-target="#myComment' + id + '" >' + 'Ver comentarios' + '</button>' +
        '<div class="modal-body" id="myComment' + id + '" style="display:none;">' + '<div class="form-group ">' + '<div id=comentariosN' + id + '>' + dibujarComment + '</div>' + '<textarea class="control " id="descripcionComent' + id + '" placeholder="Comentario" rows="5 ">' + '</textarea>' + '<a  id="BotonEnviarComentario' + id + '" type="button" class="btn">' + 'Enviar Comentario' + '</a>' +
        '</div>' + '</div>' + '<a id="BotonComprar' + id + '" type="button" class="btn">Comprar</a>' + dibujarPunt +
        '</div></div></div></div></div></div></div></div>';

    $("#ofertas").append(ofertasC);
    botonCrearCompra(id, precio);
    botonEnviarComentario(id);
    cerrarModal(id);
    seleccionPago(id);


}

function seleccionPago(id) {
    $("#escogerMetodoPago"+id).click(async function() {
        var e = document.getElementById("cars"+id);
        var e2 = document.getElementById("cars2"+id);
        var value2 = e2.options[e2.selectedIndex].value;
        var value = e.options[e.selectedIndex].value;
        console.log(value)

        if (value == "seleccion") {
            swal("Por favor, seleccione una opcion de pago", {
                icon: "error"
            });
        }
        if (value == "economonedas") {
            swal("Se selecciono correctamente", {
                icon: "success"
            });
            $('.MetodosDepago2').modal('hide');
        }
        if (value == "oferta") {
            $('.MetodosDepago2').modal('show');
            if (value2 != "seleccion") {
                console.log(value2)
            }


        }

    });

}


function cerrarModal(id) {
    $("#cerrarMod").click(async function() {
        $('#myComment' + id).modal('hide');
        $('.MetodosDepago2').modal('hide');

    });

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
        if ($("#descripcionComent" + id).val() != "") {
            commentN = $("#descripcionComent" + id).val();

            save = await insertarComentario(id, commentN);
            if (!save) {
                swal("Por favor, Intenta más tarde", {
                    icon: "error"
                });
            } else if (save) {
                swal("Comentario Ingresado correctamente", {
                    icon: "success"
                });
                comentarioNuevo = '<p class="lead_text-muted" id="letter">' + commentN + '</p>';
                $('#comentariosN' + id).append(comentarioNuevo)
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
        var e = document.getElementById("cars"+idOferta);
        var e2 = document.getElementById("cars2"+idOferta);
        var value2 = e2.options[e2.selectedIndex].value;
        var value = e.options[e.selectedIndex].value;
        console.log(value2)
        if (value == "seleccion") {
            swal("Por favor, seleccione una opcion de pago", {
                icon: "error"
            });
        }
        if (value == "economonedas") {

            swal("Se selecciono correctamente", {
                icon: "success"
            });
            const USUARIO = JSON.parse(readCookie('token'));
            if (USUARIO['moneda'] > precio) {

              console.log(value);
                var save = await crearCompra(idOferta, precio, null);
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
            $('.MetodosDepago2').modal('hide');
        }
        if (value == "oferta") {
            console.log(value2)
            $('.MetodosDepago2').modal('show');
            if (value2 != "seleccion") {
                const USUARIO = JSON.parse(readCookie('token'));
                if (USUARIO['moneda'] > precio) {
                    var save = await crearCompra(idOferta, null, value2);
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

                console.log(value2)
            }
            if (value2 == "seleccion") {
                swal("Por favor, seleccione la oferta con la que desea pagar", {
                    icon: "error"
                });
            }
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
    $("#puntoNotificacion").show(); //////////aaaaaaaaaaaaaaaaaaaaaaaa
    notificaciones1C = "";
    notificaciones1C = '<li class="mcd success">' + '<div class="notify_icon">' + '<span class="icon">' + '</span>' + '</div>' + '<div class="notify_data">' +
        '<div class="title">' + hora + '</div>' + '<div class="sub_title">' + concepto + '</div>' + '</div>' + '</li>';
    $("#NotificacionesCampana").append(notificaciones1C);
    $("#NotificacionesVentana").append(notificaciones1C);
}


//Mostrar alertas notificaciones
function mostrarAlertas(hora, concepto) {
    $("#puntoNotificacion").show(); /////////////////////aaaaaaaaaaaaa
    notificaciones2C = "";
    notificaciones2C = '<div class="toast" role="alert" aria-live="assertive" data-autohide="false" >' + '<div class="toast-header" >' + '<strong class="mr-auto">Nueva Notificación</strong>' +
        '<small class="text-muted">' + hora + '</small>' + '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' +
        '</div>' + '<div class="toast-body">' + concepto + '</div>' + '</div>' + '</div>' + '</div>';
    $("#Alertas").append(notificaciones2C);
    $('.toast').toast('show');
}