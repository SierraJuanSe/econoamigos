// Inciar Sesion
function login(correo, contrasenia) {
    //Almacena los datos en JSON
    var obj = {

    }; //Envio de datos por AJAX 
    $.ajax({

        error: function(response) {
            console.log(JSON.stringify(response))
        }

    });
}


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


// Registrar Usuario
function crearCuenta(cedula, nombre, apellido, telefono, ocupacion, fecha, direccion, contrasenia) {
    //Almecena los datos en JSON
    var obj = {}; //Envio de datos por AJAX con metodo POST
    $.ajax({
        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
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
function mostrarCompras(nombre, descripcion, tipo, precio, estado, lugar, imagen) {
    ofertasC = "";
    ofertasC = '<div class="col-sm-4">' + '<div class="card">' + '<div class="card-header" id="tipoOferta">' + tipo + '</div>' + '<div class="card-body">' +
        '<h5 class="card-title" id="nombreOferta">' + nombre + '</h5>' + '<h6 class="card-subtitle mb-2 text-muted" id="precioOferta">' + precio + '</h6>' + '<p class="card-text" id="descOferta">' + descripcion + '</p>' +
        '<button type="button" id="vermasbot" class="card-link" data-toggle="modal" data-target="#myModal">Ver más...</button>' + '<div class="modal" id="myModal">' + '<div class="modal-dialog">' +
        '<div class="modal-content">' + '<div class="modal-header">' + '<h4 id="nombremodOfe" class="modal-title">' + nombre + '</h4>' + '<button id="cerrarMod" type="button" class="close" data-dismiss="modal">&times;</button>' +
        '</div>' + '<div class="modal-body">' + '<img id="imagenmodOfe" src="' + imagen + '" align="middle">' + '<h6 id="preciomodOfe" class="modal-title">$' + precio + '</h6>' +
        '<h6 id="estadomodOfe" class="modal-title">Estado:' + estado + '</h6>' + '<h6 id="lugarmodOfer" class="modal-title">Lugar:' + lugar + '</h6>' + '<h6 id="descmodOfe" class="modal-title">' + descripcion + '</h6>' +
        '</div></div></div></div></div></div></div></div>';
    $("#compras").append(ofertasC);
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