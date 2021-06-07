$("#puntoNotificacion").hide();
let boton = document.getElementById("icono");
let enlaces = document.getElementById("enlaces");
let contador = 0;

$("#iniciarS").click(function() {
    deleteCookie();
    location.href = "index.html";
});

$("#crearC").click(function() {
    deleteCookie();
    location.href = "registro.html";
});

boton.addEventListener("click", function() {
    if (contador == 0) {
        enlaces.className = ('enlaces dos');
        contador = 1;
    } else {
        enlaces.classList.remove('dos');
        enlaces.className = ('enlaces uno');
        contador = 0;
    }
})

window.addEventListener('resize', function() {
    if (screen.width > 750) {
        contador = 0;
        enlaces.classList.remove('dos');
        enlaces.className = ('enlaces uno');

    }
})

window.addEventListener('click', function(e) {
    // console.log(e.target);
    if (contador == false) {
        let span = document.querySelector('.links-header');
        if (e.target == span) {
            contador = 0;
        }
    }
});


//Enviar datos
//Menu P
$("#Contactar").click(function() {

    //Recolectar Datos
    nombre = $("#nameC").val();
    telefono = $("#telC").val();
    correo = $("#emailC").val();
    comentario = $("#comentC").val();
    //Verificar datos
    if (nombre == "" || telefono == "" || correo == "" || comentario == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (isNaN(telefono)) {
        swal("Error", "Por favor, Ingrese un número de teléfono válido", "error");
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Correcto", "Gracias por contactarnos", "success")
    }

});
//Ofertas Compradas
$("#ContactoO2").click(function() {

    //Recolectar Datos
    nombre2 = $("#nameC2").val();
    telefono2 = $("#telC2").val();
    correo2 = $("#emailC2").val();
    comentario2 = $("#comentC2").val();
    //Verificar datos
    if (nombre2 == "" || telefono2 == "" || correo2 == "" || comentario2 == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (isNaN(telefono2)) {
        swal("Error", "Por favor, Ingrese un número de teléfono válido", "error");
    } else if (!correo2.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Correcto", "Gracias por contactarnos", "success")
    }

});

//Historial Transacciones
$("#Contact3").click(function() {

    //Recolectar Datos
    nombre3 = $("#nameC3").val();
    telefono3 = $("#telC3").val();
    correo3 = $("#emailC3").val();
    comentario3 = $("#comentC3").val();
    //Verificar datos
    if (nombre3 == "" || telefono3 == "" || correo3 == "" || comentario3 == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (isNaN(telefono3)) {
        swal("Error", "Por favor, Ingrese un número de teléfono válido", "error");
    } else if (!correo3.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Correcto", "Gracias por contactarnos", "success")
    }

});

//Historial Servicios
$("#ContactarC4").click(function() {

    //Recolectar Datos
    nombre4 = $("#nameC4").val();
    telefono4 = $("#telC4").val();
    correo4 = $("#emailC4").val();
    comentario4 = $("#comentC4").val();
    //Verificar datos
    if (nombre4 == "" || telefono4 == "" || correo4 == "" || comentario4 == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (isNaN(telefono4)) {
        swal("Error", "Por favor, Ingrese un número de teléfono válido", "error");
    } else if (!correo4.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        swal("Correcto", "Gracias por contactarnos", "success")
    }

});

//Consultar ofertas
$("#Compras").click(function() {
    consultarCompras()
});

//Funcion para realizar la busqueda de las ofertas compradas
function traerCompras(compras) {
    $("#compras").empty();
    console.log(compras)
    for (const compra of compras) {
        mostrarCompras(compra['codCompra'],compra['destinatario'],compra['nombreOferta'], compra['descripcion'], compra['tipo'], compra['precio'], compra['estado'], compra['lugar'], compra['imagen'], compra['codOferta']);

    }
}

//Consultar solicitudes
$("#Solicitar").click(function() {
    consultarSolicitudes()
});


//Buscar Oferta
$("#botonBuscar").click(function() {
    if ($("#barraBusqueda").val() == "") {
        swal("Error", "Por favor, Ingrese una palabra para realizar una búsqueda", "error");
    } else {
        consultarOfertaEspecifica($("#barraBusqueda").val())
    }
});

async function traerOfertaEspecifica(ofertas) {
    $("#ofertas").empty();
    for (const oferta of ofertas) {
        var puntuacion = await consultarPromedioValoracion(oferta['id']);
        var save = await ConsultarComentarios(oferta['id']);
        mostrarOfertas(oferta['id'], oferta['tipo'], oferta['nombre'], oferta['descripcion'], oferta['precio'], oferta['lugar'], oferta['cantidad'], oferta['imagen'], save, puntuacion);
    }
}

//Traer Ofertas
$("#BotonOfertas").click(function() {
    consultarOfertas()
});
async function traerOfertas(ofertas) {
    $("#ofertas").empty();
    for (const oferta of ofertas.ofertas) {
        var puntuacion = await consultarPromedioValoracion(oferta['id']);
        var save = await ConsultarComentarios(oferta['id']);
        mostrarOfertas(oferta['id'], oferta['tipo'], oferta['nombre'], oferta['descripcion'], oferta['precio'], oferta['lugar'], oferta['cantidad'], oferta['imagen'], save, puntuacion,ofertas.misofertas);
    }
}

//Consultar comentarios para responder
$("#VerComentarios").click(function() {
    ConsultarMisComentarios()
});

//Funcion para realizar la busqueda de las solicitudes a ofertas
async function traerComentarios(comentarios) {
    $("#comentarios").empty();
    if (comentarios.length == 0) {
        swal("No tienes comentarios nuevos", {
            icon: "error"
        });
    }
    for (const comentario of comentarios) {
        mostrarComentarios(comentario['codComentario'], comentario['codOferta'], comentario['descripcion'], comentario['hora'], comentario['idUsuario'], comentario['respuesta']);
    }
}


//Funcion para realizar la busqueda de las solicitudes a ofertas
async function traerSolicitudes(solicitudes) {
    console.log(solicitudes)
    $("#solicitudes").empty();
    var metodo="";
    for (const solicitud of solicitudes) {
        if (solicitud['nombreOfertaCambio']==null) {
            metodo="Economonedas";
        } else {
            metodo="Oferta";
        }
        mostrarSolicitudes(solicitud['codCompra'], solicitud['destinatario'], solicitud['nombreUsuario'], solicitud['apellidoUsuario'], solicitud['telefonoUsuario'], solicitud['direccion'], solicitud['nombreOferta'],metodo,solicitud['nombreOfertaCambio'], solicitud['EstadoCompra_codEstadoCompra'],solicitud['ofertaCambio'],solicitud['codOferta']);
    }
}


$("#cerrarSesion").click(function() {
    deleteCookie();
    location.href = "index.html";
});


//Traer Datos
$("#Consultar").click(function() {
    consultarDatosConfiguracion()
});
async function traerDatosUsuario(datos) {
    /*
    $("#nombreR").empty();
    $("#apellidoR").empty();
    $("#telefonoR").empty();
    $("#ocupacionR").empty();
    $("#direccionR").empty();
    $("#passR").empty();
    */
    $("#nombreR").val(datos["nombre"]);
    $("#apellidoR").val(datos["apellido"]);
    $("#telefonoR").val(datos["telefono"]);
    $("#barrios").val(datos["Barrio_codBarrio"]);
    $("#direccionR").val(datos["direccion"]);


}


//Modificar Datos
$("#GuardarCambios").click(async function() {
    nombre = $("#nombreR").val();
    apellido = $("#apellidoR").val();
    telefono = $("#telefonoR").val();
    barrio = $("#barrios").val();
    direccion = $("#direccionR").val();
    password = $("#passR").val();
    password2 = $("#passR2").val();
    if (nombre == "" || apellido == "" || telefono == "" || barrio == 0 || direccion == "") {
        swal("Error", "Selecciona el botón Consultar Datos para traer tu información", "error");
    } else if (password == "" || password2 == "") {
        swal("Error", "Por favor, Ingrese la contraseña y su validación", "error");
    } else if (password != password2) {
        swal("Error", "Las contraseñas no coinciden", "error");
    } else {

        save = await ModificarDatosUsuario(nombre, apellido, telefono, barrio, direccion, password);
        if (save) {
            
            swal("Se actualizaron los datos con éxito", {
                icon: "success"
            });
        } else {
            swal("No se pudo actualizar los datos", {
                icon: "error"
            });
        }
    }
});
async function ModificarDatosUsuario(datos) {
    /*
    $("#nombreR").empty();
    $("#apellidoR").empty();
    $("#telefonoR").empty();
    $("#ocupacionR").empty();
    $("#direccionR").empty();
    $("#passR").empty();
    */
    $("#nombreR").val(datos["nombre"]);
    $("#apellidoR").val(datos["apellido"]);
    $("#telefonoR").val(datos["telefono"]);
    $("#ocupacionR").val(datos["ocupacion"]);
    $("#direccionR").val(datos["direccion"]);


}


//Recargar Cuenta
$("#BotonRecargar").click(async function() {
    recarga = $("#recargaR").val();
    if (recarga == "") {
        swal("Error", "Por favor, Ingrese un valor para recargar", "error");
    } else {
        save = await Recargar(parseInt(recarga));
        if (save == undefined) {
            swal("Por favor, Intenta más tarde", {
                icon: "error"
            });
        } else {
            if (save.info) {
                const USUARIO = JSON.parse(readCookie('token'));
                USUARIO['moneda'] = result.moneda;
                window.token = JSON.stringify(USUARIO);
                setCookie(token);
                console.log(save.moneda);
                actualizarMonedaVista(save.moneda);

                swal("Se recargó el saldo con éxito", {
                    icon: "success"
                });
            } else {
                swal("Lo sentimos, No se pudo recargar", {
                    icon: "error"
                });
            }
        }
    }

});

//Transferir dinero
$("#BotonTransferir").click(async function() {
    cedula = $("#ccTrans").val();
    monto = $("#montoTrans").val();
    if (cedula == "" || monto == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (isNaN(cedula)) {
        swal("Error", "Ingrese solo el número de documento, sin puntos o letras", "error");
    } else if (isNaN(monto)) {
        swal("Error", "Por favor, Ingrese una cantidad válida", "error");
    } else {
        save = await insertarTransferencia(cedula, parseInt(monto));
        if (save == undefined) {
            swal("Por favor, Intenta más tarde", {
                icon: "error"
            });
        } else {
            if (save.info) {
                const USUARIO = JSON.parse(readCookie('token'));
                USUARIO['moneda'] = result.moneda;
                window.token = JSON.stringify(USUARIO);
                setCookie(token);
                console.log(save.moneda);
                actualizarMonedaVista(save.moneda);

                swal("Se realizo la transferecia con éxito, y se ha actualizado tu saldo", {
                    icon: "success"
                });
            } else {
                swal("Lo sentimos, No se pudo realizar la transferencia", {
                    icon: "error"
                });
            }
        }
    }

});

//JANIS
$("#consultarTransacciones").click(function() {
    consultarTrasnsacciones();
});

async function traerTransacciones(Transacciones) {
    $("#Transacciones").empty();
    titulos = "";
    titulos = '<tr><th>Concepto </th> <th>Estado</th><th>Precio</th></tr>';
    $("#Transacciones").append(titulos);

    for (const Transaccion of Transacciones) {
        mostrarTransacciones(Transaccion['concepto'], Transaccion['estado'], Transaccion['precio'].toString())
    }
}

$("#consultarHistorialOfertas").click(function() {
    swal("Recuerda que solo puedes ver en tu historial las ofertas que ya han sido aprobadas. Si tienes alguna en proceso puedes verla desde Solicitudes", {
        icon: "warning"
    });
    consultarSolicitudes();
});

async function traerHistorialOfertas(Ofertas) {

    $("#Ofertas").empty();
    titulos = "";
    titulos = '<tr><th>Codigo </th> <th>Oferta</th><th>Ingreso</th></tr>';
    $("#Ofertas").append(titulos);

    for (const Ofertones of Ofertas) {
        mostrarHistorialOfertas(Ofertones['codOferta'], Ofertones['nombreOferta'], Ofertones['precioCompra'].toString(), Ofertones['estadoCompra'])
    }
}
////////////////////// Notificaciones


var box = document.getElementById('box');
var down = false;


function toggleNotifi() {
    if (down) {
        box.style.height = '0px';
        box.style.opacity = 0;
        down = false;
    } else {
        box.style.height = '510px';
        box.style.opacity = 1;
        down = true;
    }
}

$(document).ready(function() {
    $(".profile .icon_wrap").click(function() {
        $(this).parent().toggleClass("active");
        $(".notifications").removeClass("active");
    });

    $(".notifications .icon_wrap").click(function() {
        $(this).parent().toggleClass("active");
        $(".profile").removeClass("active");
    });

    $(".show_all .link").click(function() {
        $(".notifications").removeClass("active");
        $(".popup").show();
    });

    $(".close").click(function() {
        $(".popup").hide();
    });
});


//Traer Notificaciones
$("#BotonCampana").click(function() {
    $("#puntoNotificacion").hide(); ///////////
    //consultarNotificaciones();  aaaaaaaaaaaaaaa
});
async function traerNotificaciones(notificaciones) {
    $("#BotonCampana").empty();
    for (const notificacion of notificaciones) {
        mostrarNotificaciones(notificacion['hora'], notificacion['concepto']);
    }
}


//Buscar Oferta Filtrada
$("#botonFiltrar").click(function() {
        consultarOfertaFiltrada()
});

async function traerOfertas(ofertas) {
    $("#ofertas").empty();
    for (const oferta of ofertas.ofertas) {
        mostrarOfertas(oferta['codOferta'], oferta['Tipo'], oferta['nombreOferta'], oferta['descripcionOferta'], oferta['precioOferta'], oferta['lugarServicio'], oferta['cantidadProducto'], oferta['imagenProducto'], oferta['comentarios'], oferta['puntuacion'],ofertas.misofertas);
    }
}

//TraerCodigoreferente mio
$("#BotonConsultarR").click(function() {
    consultarCodigoReferente()
});

async function TraerCodigoreferente(codigos) {
    $("#BotonConsultarR").empty();
    for (const codigo of codigos) {
        mostrarCodigo(codigo['codigo']);
    }
}

//Mandar codigo amigo
$("#BotonValidarR").click(async function() {
    var USUARIO = JSON.parse(readCookie('token'));
    codigo=$("#Validar").val();
    if(codigo==""){
        swal("No ha ingresado el código requerido", {
            icon: "error"
        });
    }else{
        if (USUARIO['estadoReferido']) {
            swal("No puedes Ingresar otro codigo de referido", {
                icon: "error"
            });
        }else{
        save = await enviarCodigoReferente(codigo);
            if (save) {
                swal("Se validó el código con éxito y se cargo a tu saldo", {
                    icon: "success"
                });

            } else {
                swal("No se pudo validar el código", {
                    icon: "error"
                });
            }

        }
    }
   
});

//Traer Ofertas Menu

async function traerOfertasMenu(ofertas) {
    $("#ofertas").empty();
    for (const oferta of ofertas.productos) {
        var save = await ConsultarComentarios(oferta['id']);
        mostrarOfertasMenu(oferta['id'], oferta['tipo'], oferta['nombre'], oferta['descripcion'], oferta['precio'], oferta['lugar'], oferta['cantidad'], oferta['imagen'], save, oferta['promedio'],ofertas.misOfertas);
    }
    for (const oferta of ofertas.servicios) {
        var save = await ConsultarComentarios(oferta['id']);
        mostrarOfertasMenu(oferta['id'], oferta['tipo'], oferta['nombre'], oferta['descripcion'], oferta['precio'], oferta['lugar'], oferta['cantidad'], oferta['imagen'], save, oferta['promedio'],ofertas.misOfertas);
    }
}

