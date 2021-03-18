// Inciar Sesion
function login(correo, contrasenia) {
    //Almacena los datos en JSON
    var obj = {
        // "email": correo,
        // "password": contrasenia
    }; //Envio de datos por AJAX 
    $.ajax({
        /* method: 'POST',
        url: url + '/ControladorLogin.py', //Ruta Especificada 
        dataType: 'json', //Tipo de dato
	data: obj,
    	success: function(rta) {
	console.log(rta)
            response=JSON.parse(rta);
            if(response.tipo==="OK"){
               vista2(1)
            }
            else{
                vista2(2)
		//Envio de False
            }
        },*/
        error: function(response) {
            console.log(JSON.stringify(response))
        }

    });
}

// Registrar Usuario
function crearCuenta(cedula, nombre, apellido, telefono, ocupacion, fecha, direccion, contrasenia) {
    //Almecena los datos en JSON
    var obj = {
        /*"email": correo,
        "fname": nombre,
        "lname": apellido,
        "password": contrasenia,
        "rol": 'Operario'*/
    }; //Envio de datos por AJAX con metodo POST
    $.ajax({
        /*
                method: 'POST',
                url: url + '/ControladorRegistro.py',
                dataType: 'json',
        	data: obj,
                success: function(rta) {
                    console.log(rta)
                    response=JSON.parse(rta);
                    console.log(response)
                    if(response.tipo==="OK"){ //Autenticacion de tipo
                        vista1(1)
                    }else{
                       vista1(2)
                    }
              },*/
        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
}

function historial(buscar) {
    var obj = {

    };
    $.ajax({
        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
}