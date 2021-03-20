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


//Consultar compras
async function consultarCompras() {
    let result = [{
        "codcompra": "01",
        "nombre": "Telefono",
        "descripcion": "Telefono samsung",
        "tipo": "Producto",
        "precio": "15000",
        "estado": true,
        "lugar": null,
        "imagen": "https://www.semana.com/resizer/1JZsDLYxDxH5WfbE2YLj5Yc7f0M=/960x540/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/semana/O722PPTFNBH55IPOVUR3VFOSZE.jpg"
    }, {
        "codcompra": "02",
        "nombre": "Pasear Perros",
        "descripcion": "Pasear perros en el barrio Galpan cada finde semana del mes de mayo",
        "tipo": "Servicio",
        "precio": "200.000",
        "estado": false,
        "lugar": "Bogotá",
        "imagen": null
    }, {
        "codcompra": "02",
        "nombre": "Vestido",
        "descripcion": "Vestido azul con nubes ceñido al cuerpo. Original de shei",
        "tipo": "Producto",
        "precio": "20.000",
        "estado": false,
        "lugar": null,
        "imagen": "'https://www.semana.com/resizer/1JZsDLYxDxH5WfbE2YLj5Yc7f0M=/960x540/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/semana/O722PPTFNBH55IPOVUR3VFOSZE.jpg'"
    }];
    $.ajax({

        error: function(response) {
            console.log(JSON.stringify(response))
        }
    });
    traerCompras(result)
}


//Consultar solicitudes
async function consultarSolicitudes() {
    let result = [{
        "codCompra":"1",
        "id": "1010456987",
        "nombre": "Valeria",
        "apellido": "Carvajal",
        "telefono": "3123962641",
        "direccion": "Calle 71 94-33",
        "oferta": "telefono",
        "estado": false
    }, {
        "codCompra":"2",
        "id": "1056986987",
        "nombre": "Andres",
        "apellido": "Lopez",
        "telefono": "3123969514",
        "direccion": "Calle 41 94-35",
        "oferta": "Paseo perros",
        "estado": true
    }, {
        "codCompra":"3",
        "id": "1010448787",
        "nombre": "Felipe",
        "apellido": "Velasquez",
        "telefono": "3124562641",
        "direccion": "Calle 58 94-38",
        "oferta": "Vestido Azul",
        "estado": false
    }];
    // $.ajax({

    //     error: function(response) {
    //         console.log(JSON.stringify(response))
    //     }
    // });

    traerSolicitudes(result)
}

async function actualizarSolicitud(codCompra){
    console.log(codCompra)
    return true;
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