tipo = "";
$("#ButtonServicios").click(function() {
    tipo = 'Servicio';
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Servicio");
    $("#ofertaPadre").show();
    $("#adicionesServicio").show();
    $("#adicionesProducto").hide();
    $("#crearOferta").show();

});
$("#ButtonProductos").click(function() {
    tipo = 'Producto';
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Producto");
    $("#ofertaPadre").show();
    $("#adicionesServicio").hide();
    $("#adicionesProducto").show();
    $("#crearOferta").show();
});

$("#crearOferta").click(function() {
    nombre = $('#nameOferta').val();
    descripcion = $('#descripcionOferta').val();
    precio = ($('#precioOferta').val());

    if (tipo == 'Producto') {

        cantidad = ($('#stockProducto').val());
        imagen = $('#UrlImagenProducto').val();

        if (nombre == "" || descripcion == "" || precio == "" || cantidad == "" || imagen == "") {
            swal("Error", "Por favor, Ingrese todos los datos", "error");
        } else if (isNaN(precio)) {
            swal("Error", "Ingrese solo el precio del producto", "error");
        } else if (isNaN(cantidad)) {
            swal("Error", "Ingrese solo el número de la cantidad del producto", "error");
        } else {
            enviarProducto(nombre, descripcion, precio, imagen, cantidad)
        }

    } else {
        lugar = $('#direccionOferta').val();

        if (nombre == "" || descripcion == "" || precio == "" || lugar == "") {
            swal("Error", "Por favor, Ingrese todos los datos", "error");
        } else if (isNaN(precio)) {
            swal("Error", "Ingrese solo el precio del producto", "error");
        } else {
            enviarServicio(nombre, descripcion, precio, lugar)
        }

    }

});

async function enviarProducto(nombre, descripcion, precio, imagen, cantidad) {
    var save = await crearProducto(nombre, descripcion, precio, imagen, cantidad);
    if (save == 1) {
        swal("Producto creado exitosamente", "Ya podras recibir solicitudes de compra", "success").then((value) => {
            location.href = "oferta.html";
        });

    } else if (save == 0) {
        swal("Error", "Por favor, Intenta mas tarde", "error");
    }
}

async function enviarServicio(nombre, descripcion, precio, lugar) {
    var save = await crearServicio(nombre, descripcion, precio, lugar);
    if (save == 1) {
        swal("Servicio creado exitosamente", "Ya podras recibir solicitudes de compra", "success").then((value) => {
            location.href = "oferta.html";
        });
    } else if (save == 0) {
        swal("Error", "Por favor, Intenta mas tarde", "error");
    }
}