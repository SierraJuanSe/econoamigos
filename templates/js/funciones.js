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
        '<h6 id="estadomodOfe" class="modal-title">Estado: ' + nameestado + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">' + namelugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' + '<form>' +
        '<br>Puntua la Oferta: <p class="clasificacion"> <input id="radio1" type="radio" name="estrellas" value="5"> <label for="radio1">★</label><input id="radio2" type="radio" name="estrellas" value="4"><label for="radio2">★</label><input id="radio3" type="radio" name="estrellas" value="3"><label for="radio3">★</label><input id="radio4" type="radio" name="estrellas" value="2"><label for="radio4">★</label><input id="radio5" type="radio" name="estrellas" value="1"><label for="radio5">★</label></p></form>'
    '</div></div></div></div></div></div></div></div>';
    $("#compras").append(ofertasC);
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
function mostrarOfertas(id, tipo, nombre, descripcion, precio, lugar, cantidad, imagen) {
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
        '<h6 id="estadomodOfe" class="modal-title">' + cantidad + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">' + lugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' + '<a id="BotonComprar' + id + '" type="button" class="btn">Comprar</a>'
    '</div></div></div></div></div></div></div></div>';
    $("#ofertas").append(ofertasC);
    botonCrearCompra(id, precio);
}
//Accciones del checkbox
function checkbox(id, estado, codCompra) {

    //Accion de boton al checkbox
    $("#customCheck" + codCompra).click(function() {
        accionesCheck(id, codCompra);
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