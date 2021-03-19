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