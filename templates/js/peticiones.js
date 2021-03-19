// Iniciar Sesion
async function login(correo, contrasenia) {
    //Almacena los datos en JSON
    let obj = {
        "emailUsuario": correo,
        "passwordUsuario": contrasenia
    };

    console.log(obj) //Envio de datos por AJAX 
    $.ajax({

        error: function(response) {
            console.log(JSON.stringify(response))
        }

    });
    let result = {
        "cedula": "1000257419",
        "nombre": "Val",
        "apellido": "Carvajal",
        "saldo": "15000"
    }
    window.token = result["cedula"];
    console.log(window.token);
    setCookie(token);
    console.log(token);
    console.log(readCookie("token"))
    return result;

}


// Registrar Usuario
async function crearCuenta(cedula, nombre, apellido, correo, telefono, ocupacion, fecha, direccion, contrasenia) {
    //Almecena los datos en JSON
    let obj = {
        "idUsuario": cedula,
        "nombreUsuario": nombre,
        "apellidoUsuario": apellido,
        "emailUsuario": correo,
        "passwordUsuario": contrasenia,
        "telefonoUsuario": telefono,
        "ocupacionUsuario": ocupacion,
        "fechaNacimiento": fecha,
        "direccion": direccion,

    };
    console.log(obj)
        //Envio de datos por AJAX con metodo POST
    $.ajax({

        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
    return 1;
}



function setCookie(token) {
    document.cookie = "token=" + encodeURIComponent(token) + "; max-age=3600; path=/";
}

function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function deleteCookie() {
    document.cookie = "token=; max-age=0; path=/";
}