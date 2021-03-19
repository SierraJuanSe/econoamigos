//Mostrar nombre del usuario
function mostrarNombre(nombre, apellido) {
    $("#nombreUser").empty();
    $("#nombreUser").append(nombre + ' ' + apellido)
}

//Mostrar saldo del usuario
function mostrarSaldo(saldo) {
    $("#saldoUser").empty();
    $("#saldoUser").append(' ' + saldo)
}

//Buscar ofertar compradas
function ofadquiridas(ofertas) {
    //Almecena los datos en JSON
    var obj = {}; //Envio de datos por AJAX con metodo POST
    $.ajax({
        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
}

//Mostrar todas las ofertas compradas 
function mostrarCompras(codcompra, nombre, descripcion, tipo, precio, estado, lugar, imagen) {
    if (tipo == "Producto") {
        namelugar = " ";
        nameimagen = '<img id="imagenmodOfe" src=' + imagen + ' align="middle" width="300px">';
    } else {
        namelugar = "Lugar: " + lugar;
        nameimagen = " ";
    }
    ofertasC = "";
    ofertasC = '<div class="col-sm-4" id="' + codcompra + '">' + '<div class="card">' + '<div class="card-header" id="tipoOferta">' + tipo + '</div>' + '<div class="card-body">' +
        '<h5 class="card-title" id="nombreOferta">' + nombre + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="precioOferta">' + precio + '</h6>' + '<p class="card-text" id="descOferta">' + descripcion + '</p>' +
        '<button type="button" id="vermasbot" class="card-link" data-toggle="modal" data-target="#myModal' + codcompra + '">Ver más...</button>' + '<div class="modal" id="myModal' + codcompra + '">' + '<div class="modal-dialog">' +
        '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title">' + nombre + '</h4>' + '<button id="cerrarMod" type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' + '<div class="modal-body">' + nameimagen + '<h6 id="preciomodOfe" class="modal-title">$' + precio + '</h6>' +
        '<h6 id="estadomodOfe" class="modal-title">Estado: ' + estado + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">' + namelugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' +
        '</div></div></div></div></div></div></div></div>';
    $("#compras").append(ofertasC);
}

//Buscar solicitudes 
function mostrarsolOfe(solOfertas) {
    //Almecena los datos en JSON
    var obj = {}; //Envio de datos por AJAX con metodo POST
    $.ajax({
        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
}

//Mostrar todas las solicitudes a ofertas
function mostrarSolicitudes(id, nombre, apellido, telefono, direccion, oferta) {
    solO = "";
    solO = '<tr><th scope="row" id="idsolicitud">' + id + '</th><td id="nomsolicitud">' + nombre + ' ' + apellido + '</td><td id="telsolicitud">' + telefono +
        '</td><td id="dirsolicitud">' + direccion + '</td><td id="ofolicitud">' + oferta + '</td><td><div class="custom-control custom-checkbox" id="check" style="width: 70%;">' +
        '<input type="checkbox" class="custom-control-input" id="customCheck' + id + '"><label class="custom-control-label" for="customCheck' + id + '"></label></td></tr>';
    $("#solicitudes").append(solO);
}


//Mostrar historial de Servicios
function historial(buscar) {
    var obj = {

    };
    $.ajax({
        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
}