var url = "http://127.0.0.1:5000"
let numNotifications = 0

// Objeto socket que maneja la connection
const socket = io(url, {
    reconnectionAttempts: 10,
    autoConnect: false,
})

const socketChat = io(url+'/chat')
socketChat.connect()
if(socketChat.connected){
    console.log(socketChat.io);
}

// Iniciar Sesion
async function login(correo, contrasenia) {
    //Almacena los datos en JSON
    let data = {
        "emailUsuario": correo,
        "passwordUsuario": contrasenia
    };
    try {
        result = await $.ajax({
            url: url + "/ingreso",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if(result.info){
            window.token = JSON.stringify(result.token);
            setCookie(token);
        }
        console.log(result.responseJSON)

        return result.info;
    } catch (error) {
        console.log(error.responseJSON)
    }
}


// Registrar Usuario
async function crearCuenta(cedula, nombre, apellido, correo, telefono, barrio, fecha, direccion, contrasenia) {
    //Almecena los datos en JSON
    let data = {
        "idUsuario": cedula,
        "nombreUsuario": nombre,
        "apellidoUsuario": apellido,
        "emailUsuario": correo,
        "passwordUsuario": contrasenia,
        "telefonoUsuario": telefono,
        "codBarrio": barrio,
        "fechaNacimiento": fecha,
        "direccion": direccion,
    };
    console.log(data)

    try {
        result = await $.ajax({
            url: url + "/registro",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result.responseJSON)
        return result.info;
    } catch (error) {
        console.log(error.responseJSON)

    }
}


//HACER


//HACER
async function insertarComentario(id, comentario) {
    var USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idOferta": id,
        "comentario": comentario,
        "idUsuario": USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: url + "/insertarComentario",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            return result.info
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


//Consultar compras
async function consultarCompras() {
    var USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: url + "/consultarOfertasCompradas",
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

//ofertasInsertar
async function insertarValoracion(idOferta, radiovalue) {
    console.log(idOferta + radiovalue)
    let data = {
        "idOferta": idOferta,
        "valor": radiovalue
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: url + "/insertarValoracion",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            return true;
        } else {
            console.log(result.status)
            swal("Error", {
                icon: "error"
            });

        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}
async function consultarPromedioValoracion(id) {
    let data = {
        "idOferta": id
    }
    try {
        result = await $.ajax({
            url: url + "/consultarPromedioValoracion",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            return result.info;
        } else {
            console.log(result.status)
            swal("Error", {
                icon: "error"
            });

        }
    } catch (error) {
        console.log(error)
        return 0;
    }
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
            url: url + "/consultarOfertasVendidas",
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
async function actualizarSolicitud(codCompra,estado,ofertaCambio,codOferta) {
    var USUARIO = JSON.parse(readCookie('token'));

    let data = {
        "idCompra": codCompra,
        "idUsuario": USUARIO['id'],
        "estado":estado,
        "ofertaCambio":ofertaCambio,
        "codOferta":codOferta
    }
    try {
        result = await $.ajax({
            url: url + "/actualizarEstadoCompra",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            var estadoA=["","Creado","Confirmado","Enviado"];
            var btEstado=["","Confirmar","Enviar"]
            // $("#campoEstado"+codCompra).empty().append(estadoA[estado])
            // if(estado==3){
            //     $('#btest'+codCompra).empty().append("---")
            // }else{
            //     $("#cambiarEstado"+codCompra).html(btEstado[estado]);
            // }
            
            USUARIO['moneda'] = result.moneda;
            window.token = JSON.stringify(USUARIO);
            setCookie(token);
            actualizarMonedaVista(result.moneda);
            return 1;
        } else {
            // $("#customCheck" + codCompra).prop("checked", false);
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}


//Petición para insertar respuesta a comentario
async function crearRespuesta(idComentario, respuesta) {
    var USUARIO = JSON.parse(readCookie('token'));

    let data = {
        "idComentario": idComentario,
        "respuesta": respuesta
    }
    try {
        result = await $.ajax({
            url: url + "/insertarRespuesta",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.info) {
            console.log(result.info)
            return true
        } else {
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });
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
        "lugar": lugar,
        "tipo": "Servicio"
    };
    try {
        result = await $.ajax({
            url: url + "/insertarOferta",
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
        "cantidad": cantidad,
        "tipo": "Producto"
    };
    try {
        result = await $.ajax({
            url: url + "/insertarOferta",
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
            url: url + "/consultarOfertas",
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
            url: url + "/consultarOfertaEspecifica",
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
async function crearCompra(id, precio, metodoPago) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idOferta": id,
        "precio": precio,
        "idUsuario": USUARIO['id'],
        "ofertaCambio":metodoPago,
            //falta cikicar el metodo de pago
    };
    console.log(data);
    try {
        result = await $.ajax({
            url: url + "/insertarCompra",
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
            url: url + "/consultarUsuario",
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
async function ModificarDatosUsuario(nombre, apellido, telefono, barrio, direccion, password) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id'],
        "nombreUsuario": nombre,
        "apellidoUsuario": apellido,
        "passwordUsuario": password,
        "telefonoUsuario": telefono,
        "codBarrio": barrio,
        "direccionUsuario": direccion

    };
    console.log(data)
    try {
        result = await $.ajax({
            url: url + "/actualizarUsuario",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result.info);
        window.token = JSON.stringify(result.token);
        setCookie(token);
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
            url: url + "/recargar",
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
async function insertarTransferencia(cedula, monto) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idRemitente": USUARIO['id'],
        "valor": monto,
        "idReceptor": cedula
    };
    try {
        result = await $.ajax({
            url: url + "/insertarTransferencia",
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

//Peicion para conocer el historial de transacciones
async function consultarTrasnsacciones() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    try {
        result = await $.ajax({
            url: url + "/consultarTransaccion",
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

async function ConsultarComentarios(id) {
    let data = {
        "idOferta": id
    }
    try {
        result = await $.ajax({
            url: url + "/consultarComentarios",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            return result.info;
        } else {
            console.log(result.status)
            swal("Error", {
                icon: "error"
            });

        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}


async function ConsultarMisComentarios() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    try {
        result = await $.ajax({
            url: url + "/consultarMisComentarios",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerComentarios(result.info)
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

//consulta por nombre o descripcion
async function consultarOfertaFiltrada() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "id": USUARIO["id"],
        "codBarrio":USUARIO["codBarrio"]
    }
console.log(data);
    try {
        result = await $.ajax({
            url: url + "/consultarOfertasBarrio",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result)
            traerOfertas(result.info)
        } else {
            swal("No se han encontrado coincidencias con tu búsqueda", {
                icon: "error"
            });
            console.log(result.status)
        }
    } catch (error) {
        console.log(error)
    }


    return true;
}




//enviar el codigo de mi amiguis
async function enviarCodigoReferente(codigo) {
    var USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id'],
        "codReferido":codigo
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: url + "/referirUsuario",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
            USUARIO['moneda'] = result.moneda;
            USUARIO['estadoReferido']=true;
            window.token = JSON.stringify(USUARIO);
            setCookie(token);
            actualizarMonedaVista(result.moneda);

        console.log(result.info);
        return result.info;
    } catch (error) {
        console.log(error)
    }
    console.log(data);
}

async function rechazarSolicitud(codCompra) {
    var data={
        "idCompra":codCompra
    }
    try {
        result = await $.ajax({
            url: url + "/negarIntercambio",
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
}

async function consultarMensajes(cod) {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idCompra":cod
    }
    console.log(cod)
console.log(data);
    try {
        result = await $.ajax({
            url: url + "/consultarMensajes",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result)
            mostrarMensajes(result.info)
        } else {

            console.log(result.status)
        }
    } catch (error) {
        console.log(error)
    }


    return true;
}
//Peticion para consultar todas las ofertas(productos o servicios)
async function consultarOfertasMenu() {
    const USUARIO = JSON.parse(readCookie('token'));
    let data = {
        "idUsuario": USUARIO['id']
    }
    console.log(data.id)
    try {
        result = await $.ajax({
            url: url + "/consultarOfertasTop",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerOfertasMenu(result.info)
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

function setCookie(token) {
    document.cookie = "token=" + encodeURIComponent(token) + "; max-age=3600; path=/";
}

function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function deleteCookie() {
    document.cookie = "token=; max-age=0; path=/";
    socket.disconnect();
}

// El servidor envia un id unico confirmando su conexion
socket.on('sid', (data) => {
    console.log("sid");
    socket.emit('userInfo', JSON.parse(readCookie('token')))
})

// escucha si se ha creado una compra de alguna de sus ofertas publicadas
socket.on('buyNotification', (data) => {
    console.log(data.info.hora, "  ", data.info);
    let concepto = "Te han comprado " + data.info.nombre + " por $" + data.info.precio;
    console.log(concepto);
    mostrarNotificaciones(data.info.hora, concepto);
    mostrarAlertas(data.info.hora, concepto);
    
    // aca se llama a la funcion que dibuja la notificacion
})
