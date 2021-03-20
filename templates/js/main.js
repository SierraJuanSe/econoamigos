let boton = document.getElementById("icono");
let enlaces = document.getElementById("enlaces");
let contador = 0;

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
    for (const compra of compras) {
        mostrarCompras(compra['codcompra'], compra['nombre'], compra['descripcion'], compra['tipo'], compra['precio'], compra['estado'], compra['lugar'], compra['imagen']);

    }
}

//Consultar solicitudes
$("#Solicitar").click(function() {
    consultarSolicitudes()
});

//Funcion para realizar la busqueda de las solicitudes a ofertas
function traerSolicitudes(solicitudes) {
    $("#solicitudes").empty();
    for (const solicitud of solicitudes) {
        mostrarSolicitudes(solicitud['codCompra'],solicitud['id'], solicitud['nombre'], solicitud['apellido'], solicitud['telefono'], solicitud['direccion'], solicitud['oferta'], solicitud['estado']);
    }
}


$("#cerrarSesion").click(function() {
    deleteCookie();
    location.href = "index.html";
});