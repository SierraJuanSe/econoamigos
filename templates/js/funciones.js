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

function mostrarCompras(codcompra, dest, nombre, descripcion, tipo, precio, estado, lugar, imagen, codOferta) {
    $("#estados").hide();
    ofertasC = "";
    ofertasC = '<div class="col-sm-4" id="' + codcompra + '">' + '<div class="card">' + '<div class="card-header" id="tipoOferta">' + tipo + '</div>' + '<div class="card-body">' +
        '<h5 class="card-title" id="nombreOferta">' + nombre + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="precioOferta">' + precio + '</h6>' + '<p class="card-text" id="descOferta">' + descripcion + '</p>' +
        '<div class="container"><div class="row"><div class="col">' + '<button id="vermasbot' + codcompra + '" type="button" class="card-link" ><img src="img/more.svg" style="width:50%; borderline: none;"></button>' +
        '</div> <div class="col"><button type="button" id="verchat' + codcompra + '" class="card-link" ><img src="img/chat.svg" style="width:50%; align: center;"></button></div><div class="col"><button type="button" id="verReclamo' + codcompra + '" class="card-link" ><img src="img/reclamos.svg" style="width:50%; align: center;"></button></div></div>';



    $("#compras").append(ofertasC);
    botonVerEstados(codcompra, dest, nombre, descripcion, tipo, precio, estado, lugar, imagen, codOferta);
    var temp = drawChat(codcompra, nombre);
    $('#chatContainer').append(temp);
    abrirChat(codcompra, nombre);

    abrirReclamo(codcompra, nombre);
    sendMessage(codcompra,dest);
    socketChat.emit('join', {room: 'room'+codcompra})

}

function botonRegresar(codcompra) {
    $("#BotonRegresar" + codcompra).click(async function() {
        $("#devolverC" + codcompra).hide();
        $("#compras").show();
        $("#estados").hide();
    });
}

function botonVerEstados(codcompra, dest, nombre, descripcion, tipo, precio, estado, lugar, imagen, codOferta) {
    $("#vermasbot" + codcompra).click(async function() {
        if (tipo == "Producto") {
            namelugar = "";
            nameimagen = "";
            nameimagen = '<img id="imagenmodOfe" src=' + imagen + ' align="middle" width="300px"> <br><br>';
        } else {
            namelugar = "Lugar: " + lugar;
            nameimagen = " ";
        }
        if (estado == "Procesada") {
            nameestado = '<li class = "activar step0" > </li>' +
                '<li class = "step0" > </li>' +
                '<li class = "step0" > </li>' +
                '<li class = "step0" > </li>';
        } else if (estado == "Confirmada") {
            nameestado = '<li class = "activar step0" > </li>' +
                '<li class = "activar step0" > </li>' +
                '<li class = "step0" > </li>' +
                '<li class = "step0" > </li>';
        } else if (estado == "Camino") {
            nameestado = '<li class = "activar step0" > </li>' +
                '<li class = "activar step0" > </li>' +
                '<li class = "activar step0" > </li>' +
                '<li class = "step0" > </li>';
        } else if (estado == "Entregada") {
            nameestado = '<li class = "activar step0" > </li>' +
                '<li class = "activar step0" > </li>' +
                '<li class = "activar step0" > </li>' +
                '<li class = "activar step0" > </li>';
        }

        ofertasC = "";
        ofertasC = '<div id = "devolverC' + codcompra + '" >' + '<button id = "BotonRegresar' + codcompra + '" type = "button" class = "btn-return">' + '<img src = "https://img.icons8.com/ios/452/return.png" width = "50"> </button>' +
            '<center>' + '<h2 id = "nombremodOfe"  class = "title" >' + nombre + '</h2>' + '</center > <div class = "columnas" >' +
            '<div class = "cajita" >' + nameimagen + namelugar + '<br><br><h6 id = "preciomodOfe" class = "cars0" > Precio: $ ' + precio + ' </h6> </div >' +
            '<div class = "cajita" > <h6 id = "descmodOfe" class = "cars0" > Descripción: ' + descripcion + '</h6> <form name = "nombreform" >' +
            '<br> Puntua la Oferta:' +
            '<p class = "clasificacion">' + '<input id = "radio1 ' + codcompra + '" type = "radio" name = "estrellas" class = "radioBotones ' + codcompra + '"  value = "5"> <label for = "radio1 ' + codcompra + '" > ★ </label>' +
            '<input id = "radio2 ' + codcompra + '" type = "radio"  name = "estrellas" class = "radioBotones ' + codcompra + '" value = "4"> <label for = "radio2 ' + codcompra + '" > ★ </label>' +
            '<input id = "radio3 ' + codcompra + '" type = "radio"  name = "estrellas"  class = "radioBotones ' + codcompra + '" value = "3"> <label for = "radio3 ' + codcompra + '" > ★ </label>' +
            '<input id = "radio4 ' + codcompra + '" type = "radio"  name = "estrellas"  class = "radioBotones ' + codcompra + '" value = "2"> <label for = "radio4 ' + codcompra + '" > ★ </label>' +
            '<input id = "radio5 ' + codcompra + '" type = "radio"  name = "estrellas"  class = "radioBotones ' + codcompra + '" value = "1"> <label for = "radio5 ' + codcompra + '" > ★ </label></p>' +
            '</form></div></div>' +
            '<div class = "container px-1 px-md-40 py-5 mx-auto"> <div class = "tracking" ><div class = "row d-flex justify-content-between px-3 top" >' +
            '<div class = "name" > <h5> Código de tu compra: </h5> <div class = "lead text" >' + codcompra + '</div> </div> </div>' +
            '<div class = "row d-flex justify-content-center"> <div class = "col-12" > <ul id = "progressbar"  class = "text-center" >' + nameestado +
            '</ul> <div> </div >' +
            '<div class = "row justify-content-between top" > <div class = "row d-flex icon-content" > <img class = "icon" src = "https://image.flaticon.com/icons/png/512/114/114903.png" >' +
            '<div class = "d-flex flex-column" >  <p class = "font-weight-bold"> Orden <br> Procesada </p> </div > </div>' +
            '<div class = "row d-flex icon-content"> <img class = "icon" src = "https://static.thenounproject.com/png/543983-200.png" >' +
            '<div class = "d-flex flex-column" > <p class = "font-weight-bold" > Orden <br> Confirmada </p> </div > </div>' +
            '<div class = "row d-flex icon-content" > <img class = "icon" src = "https://img.icons8.com/ios/452/truck.png" >' +
            '<div class = "d-flex flex-column" > <p class = "font-weight-bold" > Orden <br> En Camino </p> </div > </div>' +
            '<div class = "row d-flex icon-content" > <img class = "icon" src = "https://cdn.icon-icons.com/icons2/936/PNG/512/home_icon-icons.com_73532.png" >' +
            '<div class = "d-flex flex-column" > <p class = "font-weight-bold" > Orden <br> Entregada </p> </div > </div> </div></div></div></div></br>';


        $("#compras").hide();
        $("#estados").show();
        $("#estados").append(ofertasC);
        enviarValoracion(codOferta);
        botonRegresar(codcompra);

    });
    $("#estados").empty();
}

async function abrirChat(codcompra, nombre) {
    $("#verchat" + codcompra).click(async function() {
        var pet = await consultarMensajes(codcompra)
        $('#chat' + codcompra).show()
    });
}

async function abrirReclamo(codcompra, nombre) {
    $("#verReclamo" + codcompra).click(async function() {
        location.href = "reclamos.html";
    });
}




function mostrarMensajes(mensajes) {
    for (const mensaje of mensajes) {
        //Aqui se va a llmar a la cookie para validar la posición
        var USUARIO = JSON.parse(readCookie('token'));

        if (mensaje['destinatario'] != USUARIO['id']) {
            drawMsgOut(mensaje)
        } else {
            drawRecivedMsg(mensaje)
        }
    }
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
                '<button type="button" class="btn" id="customCheck' + codCompra + '">Aceptar</button>' +
                '</div></div></div></div>';

        }
        solO = "";
        solO = '<tr id="filasol' + codCompra + '"><td id="nomsolicitud' + id + '">' + nombre + ' ' + apellido + '</td><td id="telsolicitud">' + telefono +
            '</td><td id="dirsolicitud' + id + '">' + direccion + '</td><td id="ofolicitud">' + oferta + '</td><td id="metodopagosolicitud"><div class="row"><div class="col">' + metodopago + '</div><div class="col-md-auto">' + feli + '</div></div></td>' +
            '<td><div style="align: center;"><button type="button" id="verchat' + codCompra + '" class="card-link" ><img src="img/chat.svg" style="width:90%; align: center;"></button></div></td><td>' +
            '<a>Confirmado</a></td><td><button type="button" class="btn-link">Actualizar Progreso</button></td></tr>';
        //Inserscion al HTML
        $("#solicitudes").append(solO);
        var temp = drawChat(codCompra, oferta);
        $('#chatContainer').append(temp);
        abrirChat(codCompra, oferta);
        sendMessage(codCompra, id);
        accionesBtnRechazar(codCompra);
        checkbox(id, estado, codCompra);
        socketChat.emit('join', { room: 'room' + codCompra })
            // mensajetemp = [{
            //     codMensaje: 1,
            //     destinatario: "1000257419", ///JSON.parse(USUARIO['id']), //Ajustar
            //     Usuario_idUsuario: "1010029624",
            //     desMensaje: "Te amo",
            //     Compra_codCompra: "003",
            //     time: "21:35"
            // }, {
            //     codMensaje: 2,
            //     destinatario: "1010029624",
            //     Usuario_idUsuario: "1000257419",
            //     desMensaje: "Yo más",
            //     Compra_codCompra: "003",
            //     time: "21:37"
            // }, {
            //     codMensaje: 3,
            //     destinatario: "1000257419",
            //     Usuario_idUsuario: "1010029624",
            //     desMensaje: "Que haces?",
            //     Compra_codCompra: "003",
            //     time: "21:40"
            // }, {
            //     codMensaje: 4,
            //     destinatario: "1010029624",
            //     Usuario_idUsuario: "1000257419",
            //     desMensaje: "Extrañarte",
            //     Compra_codCompra: "003",
            //     time: "21:43"
            // }]
            // mostrarMensajes(mensajetemp)
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

    $("#regresar").hide();
    ofertasC = "";
    ofertasC = '<div class="col-sm-4" id="' + id + '">' + '<div class="card">' + '<div class="card-header" id="tipoOferta">' + tipo + '</div>' + '<div class="card-body">' +
        '<h5 class="card-title" id="nombreOferta">' + nombre + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="descripcionOferta">' + descripcion + '</h6>' + '<p class="card-text" id="precioOferta">' + precio + '</p>' +
        '<button id="BotonVerDetalles' + id + '" type="button" class="card-link" >Ver detalles</button>'

    $("#ofertas").append(ofertasC);
    botonVerDetalles(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir, OfertasOfrecidas);
}


function seleccionPago(id) {
    $("#escogerMetodoPago" + id).click(async function() {
        var e = document.getElementById("cars" + id);
        var e2 = document.getElementById("cars2" + id);
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
            $('.MetodosDepago2' + id).modal('hide');
        }
        if (value == "oferta") {
            $('.MetodosDepago2' + id).modal('show');
            if (value2 != "seleccion") {
                console.log(value2)
            }
        }
    });
}

function botonVolver(id) {
    $("#BotonVolver" + id).click(async function() {
        $("#salirO" + id).hide();
        $("#salirOC" + id).hide();
        $("#ofertas").show();
        $("#regresar").hide();
    });

    /*  $("#BotonVolver" + id).click(function () {
          consultarOfertas()
      });
      //Trear Ofertas descripcion 
      async function traerOfertas(ofertas) {
          $("#ofertas").empty();
          for (const oferta of ofertas.ofertas) {
              var puntuacion = await consultarPromedioValoracion(oferta['id']);
              var save = await ConsultarComentarios(oferta['id']);
              mostrarOfertas(oferta['id'], oferta['tipo'], oferta['nombre'], oferta['descripcion'], oferta['precio'], oferta['lugar'], oferta['cantidad'], oferta['imagen'], save, puntuacion, ofertas.misofertas);
          }
      }*/
}

function botonVerDetalles(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir, OfertasOfrecidas) {

    $("#BotonVerDetalles" + id).click(async function() {
        var dibujarComment = "";
        var dibujarPunt = "";
        var dibujarofertasPago = "";

        for (var i = 0; i < recibir; i++) {
            dibujarPunt += '<label >⭐</label>'
        }
        if (recibir == 0 || recibir == null) {
            dibujarPunt += '<label >☆☆☆☆☆</label>'
        }
        for (const coment of comentarios) {
            dibujarComment += '<p class="lead_text-muted" id="letter">' + coment['descripcionComentario'] + '</p>';
            if (coment['respuesta'] != "") {
                dibujarComment += '<p class="lead_text-muted2" id="letter">' + coment['respuestaComentario'] + '</p>'

            }
            console.log("#myComment" + id);
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

        detalles = "";
        detalles =
            '<div id="salirO' + id + '"><div  class="contenedores">' +
            '<center><h3 id="nombremodOfe" class="title">' + nombre + '</h3></center>' +
            '<div class="caja">' + nameimagen +
            '<br><br><h6 id="preciomodOfe" class="cars0">Precio: $' + precio + '</h6>' +
            '<h6 id="estadomodOfe" class="cars0">' + cantidad + '</h6>' +
            '<h6 id="lugarmodOfer" class="cars0">' + lugar + '</h6>' +
            '<h6 id="descmodOfe" class="cars0">Descripción: ' + descripcion + '</h6>' +
            '<h6 class="cars0">Puntuación: ' + dibujarPunt + '</h6>' +
            '</div>' +
            '<div class="caja">' +
            '<form class="MetodosDepago1">' +
            '<br><br><label class="cars0">' + 'Seleccione el metodo de pago' + '</label><br>' +
            '<select class="cars" name="cars" id="cars' + id + '"  onchange="seleccionPago(' + id + ')">' +
            '<option value="seleccion" >' + 'Seleccione' + '</option>' +
            '<option value="economonedas" id="ButonEconomonedas" >' + 'Economonedas' + '</option>' +
            '<option value="oferta">' + 'Por productos o servicios ofrecidos' + '</option>' +
            '</select>' +
            '</form>' +
            '<form class="MetodosDepago2' + id + '" id="metodoPago2id' + id + '" >' +
            '<label class="cars0">' + 'Seleccione el servicio o producto por el cual desea pagar' + '</label>' +
            '<select class="cars2" name="cars2" id="cars2' + id + '">' +
            '<option value="seleccion" >' + 'Seleccione' + '</option>' + dibujarofertasPago +

            '</select>' +
            '</form>' +
            '<button id="BotonComprar' + id + '" type="button" class="btn">Comprar</button>' +
            '<button id="BotonVolver' + id + '" type="button" class="btn">Regresar</button>' + '<br><br>' +
            '</div>' +
            '</div>' + '</div>' +
            '<div id="salirOC' + id + '"><div class="contenedors">' +
            '<h6>Comentarios:' + '</h6>' +
            '<div class="form-group ">' +
            '<div id=comentariosN' + id + '>' + dibujarComment + '</div>' +
            '<textarea class="control " id="descripcionComent' + id + '" placeholder="Comentario" rows="5 ">' + '</textarea>' +
            '<a  id="BotonEnviarComentario' + id + '" type="button" class="btn">' + 'Enviar Comentario' + '</a>' +
            '</div>' + '</div>' + '</div>'
        '</div></div></div></div></div></div></div></div>';

        $("#ofertas").hide();
        $("#regresar").show();
        $("#regresar").append(detalles);
        $('.MetodosDepago2' + id).hide();
        botonVolver(id);
        botonCrearCompra(id, precio);
        botonEnviarComentario(id);
        cerrarModal(id);
    });
    $("#regresar").empty();

}

function seleccionPago(id) {
    console.log(id)
    var e = document.getElementById("cars" + id);
    console.log(e)
    var e2 = document.getElementById("cars2" + id);
    var value = e.options[e.selectedIndex].value;
    var value2 = e2.options[e2.selectedIndex].value;

    console.log(value)

    if (value == "seleccion") {
        swal("Por favor, seleccione una opcion de pago", {
            icon: "error"
        });
        $('.MetodosDepago2' + id).hide();
    }
    if (value == "economonedas") {
        $('.MetodosDepago2' + id).hide();
    }
    if (value == "oferta") {
        $('.MetodosDepago2' + id).show();
        if (value2 != "seleccion") {
            console.log(value2)
        }


    }


}

function cerrarModal(id) {
    $('#cerrarMod' + id).click(async function() {
        $('#myComment' + id).modal('hide');
        $('.MetodosDepago2' + id).modal('hide');

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
            console.log(id)
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
        var e = document.getElementById("cars" + idOferta);
        var e2 = document.getElementById("cars2" + idOferta);
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
                    $("#myModal" + idOferta).hide();
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
            $('.MetodosDepago2' + idOferta).hide();
        }
        if (value == "oferta") {
            console.log(value2)
            $('.MetodosDepago2' + idOferta).show();
            if (value2 != "seleccion") {
                const USUARIO = JSON.parse(readCookie('token'));
                if (USUARIO['moneda'] > precio) {
                    var save = await crearCompra(idOferta, null, value2);
                    if (save) {
                        $("#myModal" + idOferta).hide();
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

if (window.location.href.includes('confRecarga.html')) {
    console.log("Si");
    $('#BotonConsultarR').empty()
    var USUARIO = JSON.parse(readCookie('token'));
    if (USUARIO != null && USUARIO != "") {
        referido = USUARIO["codReferido"]
        const mostrarcodigo = (codigo) => {
            $("#micodreferido").append(codigo);
        }
        mostrarcodigo(referido);
    } else {
        swal("No se pudo validar el código", {
            icon: "error"
        });
    }

}
//Mostrar alertas limite Tiempo
function mostrarAlertasTiempo(hora, concepto) {
    $("#puntoNotificacion").show(); /////////////////////aaaaaaaaaaaaa
    notificaciones2C = "";
    notificaciones2C = '<div class="toast" role="alert" aria-live="assertive" data-autohide="false" >' + '<div class="toast-header" >' + ' <img src="https://img1.freepng.es/20180319/lqe/kisspng-computer-icons-weather-warning-iconfinder-clip-art-alert-icon-free-icons-5ab048d5a03131.1176779315215024216562.jpg" class="rounded mr-2" width="20" height="20">' + '<strong class="mr-auto">Tiempo Excedido</strong>' +
        '<small class="text-muted">' + hora + '</small>' + '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' +
        '</div>' + '<div class="toast-body">' + concepto + '</div>' + '</div>' + '</div>' + '</div>';
    $("#Alertas").empty();
    $("#Alertas").append(notificaciones2C);
    $('.toast').toast('show');
}
function mostrarOfertasMenu(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir, OfertasOfrecidas) {
    if (tipo == "Producto") {
        ofertasC = "";
        ofertasC = '<div class="col-sm-4" id="' + id + '"><div class="caja"><div class="box"><div class="slide-img"><img id="imagenmodOfe" src="' + imagen + '" alt="1"><div class="overlay"> <button type="button" id="BotonComprarProd' + id + '" class="buy-btn">Comprar</button>' +
            '</div></div><div class="detail-box"><div class="type"><a>' + nombre + '</a><div class="des">' + descripcion + '</div></div><div class="price">' + precio + '</div></div></div></div></div>';
        $("#top-productos").append(ofertasC);
    } else if (tipo == "Servicio") {
        ofertasC = "";
        ofertasC = '<div class="col-sm-4" id="' + id + '"><div class="caja"><div class="box"><div class="slide-name"><br><div class="service-name"><div class="des">' + descripcion + '</div></div><div class="overlay"> <button type="button" id="BotonComprarProd' + id + '" class="buy-btn">Comprar</button>' +
            '</div></div><div class="detail-box"><div class="type"><a>' + nombre + '</a></div><div class="price">' + precio + '</div></div></div></div></div>';
        $("#top-servicios").append(ofertasC);
    }
    BotonComprarMenu(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir, OfertasOfrecidas);
}
function  BotonComprarMenu(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen, comentarios, recibir, OfertasOfrecidas) {
   
    $("#BotonComprarProd" + id).click(async function() {
        $("#regresar").empty();
        var dibujarComment = "";
        var dibujarPunt = "";
        var dibujarofertasPago = "";

        for (var i = 0; i < recibir; i++) {
            dibujarPunt += '<label >⭐</label>'
        }
        if (recibir == 0 || recibir == null) {
            dibujarPunt += '<label >☆☆☆☆☆</label>'
        }
        for (const coment of comentarios) {
            dibujarComment += '<p class="lead_text-muted" id="letter">' + coment['descripcionComentario'] + '</p>';
            if (coment['respuesta'] != "") {
                dibujarComment += '<p class="lead_text-muted2" id="letter">' + coment['respuestaComentario'] + '</p>'

            }
            console.log("#myComment" + id);
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

        detalles = "";
        detalles =
            '<div id="salirO'+id+'"><div  class="contenedores">' +
        '<center><h3 id="nombremodOfe" class="title">' + nombre + '</h3></center>'+
            '<div class="caja">'+ nameimagen +
            '<br><br><h6 id="preciomodOfe" class="cars0">Precio: $' + precio + '</h6>' +
            '<h6 id="estadomodOfe" class="cars0">' + cantidad + '</h6>' + 
            '<h6 id="lugarmodOfer" class="cars0">' + lugar + '</h6>' + 
            '<h6 id="descmodOfe" class="cars0">Descripción: ' + descripcion + '</h6>' + 
            '<h6 class="cars0">Puntuación: ' + dibujarPunt + '</h6>' + 
            '</div>'+
            '<div class="caja">'+
            '<form class="MetodosDepago1">' +
            '<br><br><label class="cars0">' + 'Seleccione el metodo de pago' + '</label><br>' + 
            '<select class="cars" name="cars" id="cars' + id + '"  onchange="seleccionPago('+id+')">' + 
            '<option value="seleccion" >' + 'Seleccione' + '</option>' + 
            '<option value="economonedas" id="ButonEconomonedas" >' + 'Economonedas' + '</option>' +
            '<option value="oferta">' + 'Por productos o servicios ofrecidos' + '</option>' + 
            '</select>' +
            '</form>' + 
            '<form class="MetodosDepago2' + id + '" id="metodoPago2id' + id + '" >' +
            '<label class="cars0">' + 'Seleccione el servicio o producto por el cual desea pagar' + '</label>' + 
            '<select class="cars2" name="cars2" id="cars2' + id + '">' + 
            '<option value="seleccion" >' + 'Seleccione' + '</option>' + dibujarofertasPago + 
            
            '</select>' + 
            '</form>' +
            '<button id="BotonComprar' + id + '" type="button" class="btn">Comprar</button>' +
            '<button id="BotonVolver' + id + '" type="button" class="btn">Regresar</button>'+'<br><br>'+
            '</div>' + 
            '</div>' + '</div>'+
            '<div id="salirOC'+id+'"><div class="contenedors">'+
            '<h6>Comentarios:'+'</h6>' +
            '<div class="form-group ">' + 
            '<div id=comentariosN' + id + '>' + dibujarComment + '</div>' + 
            '<textarea class="control " id="descripcionComent' + id + '" placeholder="Comentario" rows="5 ">' + '</textarea>' + 
            '<a  id="BotonEnviarComentario' + id + '" type="button" class="btn">' + 'Enviar Comentario' + '</a>' +
            '</div>' + '</div>'+ '</div>'
            '</div></div></div></div></div></div></div></div>';
        
        $("#top-productos").hide();
        $("#ofertas").hide();
        $("#top-servicios").hide();
        $("#sub1").hide();
        $("#sub2").hide();
        $("#sub0").hide();
        $("#sub3").hide();
        $("#regresar").show();
        $("#regresar").append(detalles);
        $('.MetodosDepago2'+id).hide();
        botonVolverMenu(id);
        botonCrearCompra(id, precio);
        botonEnviarComentario(id);
        cerrarModal(id);    
        });
        $("#regresar").empty();

}
function botonVolverMenu(id) {
    $("#BotonVolver" + id).click(async function() {
        $("#salirO"+id).hide();
    $("#salirOC"+id).hide();
        $("#top-productos").show();
        $("#ofertas").show();
        $("#top-servicios").show();
        $("#sub1").show();
        $("#sub2").show();
        $("#sub0").show();
        $("#sub3").show();
        $("#regresar").hide();
    });
    
  /*  $("#BotonVolver" + id).click(function () {
        consultarOfertas()
    });
    //Trear Ofertas descripcion 
    async function traerOfertas(ofertas) {
        $("#ofertas").empty();
        for (const oferta of ofertas.ofertas) {
            var puntuacion = await consultarPromedioValoracion(oferta['id']);
            var save = await ConsultarComentarios(oferta['id']);
            mostrarOfertas(oferta['id'], oferta['tipo'], oferta['nombre'], oferta['descripcion'], oferta['precio'], oferta['lugar'], oferta['cantidad'], oferta['imagen'], save, puntuacion, ofertas.misofertas);
        }
    }*/

}