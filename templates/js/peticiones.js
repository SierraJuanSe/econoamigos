// Iniciar Sesion
async function login(correo, contrasenia) {
    //Almacena los datos en JSON
    let data = {
        "emailUsuario": correo,
        "passwordUsuario": contrasenia
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/ingreso",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result)
        window.token = JSON.stringify(result.token);
        setCookie(token);
        console.log(readCookie('token'))
        return result.info;
    } catch (error) {
        console.log(error)
    }
}


// Registrar Usuario
async function crearCuenta(cedula, nombre, apellido, correo, telefono, ocupacion, fecha, direccion, contrasenia) {
    //Almecena los datos en JSON
    let data = {
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

    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/registro",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        return result.info;
    } catch (error) {
        console.log(error)

    }
}


//HACER
async function ConsultarComentarios(idProducto) {
    var prueba= [{
            "codComentario": 1,
            "codOferta": 1,
            "descripcion": "1111111111111111111111111111",
            "hora": "19:12:34",
            "idUsuario": "333",
            "respuesta": "buenaas1"     
},{
            "codComentario": 2,
            "codOferta": 2,
            "descripcion": "2222222222222222222222222",
            "hora": "19:12:34",
            "idUsuario": "333",
            "respuesta": "buenaas2"
        
},{
            "codComentario": 3,
            "codOferta": 3,
            "descripcion": "3333333333333333333333",
            "hora": "19:12:34",
            "idUsuario": "333",
            "respuesta": "buenaas3"
        
}]
    return prueba;


}

//HACER
async function EnviarComentario(idProducto,comentario) {
    console.log("wiiiiiiiiiiiiiiiiiiiiiii")
    var USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idOferta": idProducto,
        "comentario":comentario,
        "idUsuario": USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarComentario",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == true) {
            console.log(result.info)
           
        } else {
            console.log(result.status)
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });

        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}


//Consultar compras
async function consultarCompras() {
    var USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertasCompradas",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerCompras(result.info)
        } else {
            console.log(result.status)
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });

        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}


//HACER

//Consultar solicitudes
async function consultarSolicitudes() {
    var USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertasVendidas",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerSolicitudes(result.info);
            traerHistorialOfertas(result.info);
        } else {
            console.log(result.status)
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });
        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}


//Peticion para actualizar la solicitud de una compra
async function actualizarSolicitud(codCompra) {
    var USUARIO = JSON.parse(readCookie('token'));

    let data = {
        "idCompra": codCompra,
        "idUsuario": USUARIO['id']
    }
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/actualizarEstadoCompra",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            $("#filasol" + codCompra).remove();
            USUARIO['moneda'] = result.moneda;
            window.token = JSON.stringify(USUARIO);
            setCookie(token);
            actualizarMonedaVista(result.moneda);
        } else {
            $("#customCheck" + codCompra).prop("checked", false);
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

// Peticion para crear un servicio 
async function crearServicio(nombre, descripcion, precio, lugar) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "nombre": nombre,
        "descripcion": descripcion,
        "precio": precio,
        "idUsuario": USUARIO['id'],
        "lugar": lugar
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarServicio",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        return result.info;
    } catch (error) {
        console.log(error)
    }
    console.log(data);
    return true;
}

//Peticion para crear un producto
async function crearProducto(nombre, descripcion, precio, imagen, cantidad) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "nombre": nombre,
        "descripcion": descripcion,
        "precio": precio,
        "idUsuario": USUARIO['id'],
        "imagen": imagen,
        "cantidad": cantidad
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarProducto",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        return result.info;
    } catch (error) {
        console.log(error)

    }
    console.log(data);
    return true;
}

//Peticion para consultar todas las ofertas(productos o servicios)
async function consultarOfertas() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "id": USUARIO['id']
    }
    console.log(data.id)
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertas",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerOfertas(result.info)
        } else {
            console.log(result.status)
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });
        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}


//Peticion para consultar una oferta mediante una busqueda de un input
//consulta por nombre o descripcion
async function consultarOfertaEspecifica(busqueda) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {

        "busqueda": busqueda,
        "id": USUARIO["id"]
    }

    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertaEspecifica",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerOfertaEspecifica(result.info)
        } else {
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });
            console.log(result.status)
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}

//Petición para crear compra
async function crearCompra(id, precio) {
    const USUARIO = JSON.parse(readCookie('token'));
    console.log(id);
    console.log(precio);
    let data = {
        "idOferta": id,
        "precio": precio,
        "idUsuario": USUARIO['id']

    };
    console.log(data);
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarCompra",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result.info);
        return result.info;
    } catch (error) {
        console.log(error)
    }
    console.log(data);

}

//Consulta datos para la configuración
async function consultarDatosConfiguracion() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "id": USUARIO["id"]
    }

    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarUsuario",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerDatosUsuario(result.info)
        } else {
            swal("Error, Intentalo más tarde", {
                icon: "error"
            });
            console.log(result.status)
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}

//Peticón para modificar datos usuarios
async function ModificarDatosUsuario(nombre, apellido, telefono, ocupacion, direccion, password) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id'],
        "nombreUsuario": nombre,
        "apellidoUsuario": apellido,
        "passwordUsuario": password,
        "telefonoUsuario": telefono,
        "ocupacionUsuario": ocupacion,
        "direccionUsuario": direccion

    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/actualizarUsuario",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result.info);
        return result.info;
    } catch (error) {
        console.log(error)
    }
    console.log(data);

}

//Petición para recargar cuenta
async function Recargar(recarga) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id'],
        "valor": recarga

    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/recargar",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result.info);
        return result;
    } catch (error) {
        console.log(error)
    }
    console.log(data);
}

//Petición para transferir Dinero
async function Transferir(cedula, monto) {
const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id'],
        "valor": monto,
        "idReceptor": cedula
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/transferir",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result.info);
        return result;
    } catch (error) {
        console.log(error)
    }
    console.log(data);
}

//Peicion para conocer el hstorial de transacciones
async function consultarTrasnsacciones() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarTransaccion",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            if ((result.info).length == 0) {
                swal("No se han encontrado coincidencias con tu búsqueda", {
                    icon: "error"
                });
            } else {
                console.log(result.info)
                traerTransacciones(result.info)
            }
        } else {
            console.log(result.status)
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });
        }
    } catch (error) {
        console.log(error)
        return 0;
    }

}

async function consultarHistorialOfertas() {
    let result = [{
            "nombre": "paseo",
            "oferta": "AA311",
            "ingreso": 5000
        },
        {
            "nombre": "niñera",
            "oferta": "ADD01",
            "ingreso": 20000
        },
        {
            "nombre": "medicamentos",
            "oferta": "BBU103",
            "ingreso": 1500
        }
    ]
    traerHistorialOfertas(result)
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