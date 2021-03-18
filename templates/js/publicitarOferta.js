let boton = document.getElementById("icono");
let enlaces = document.getElementById("enlaces");
let contador = 0;
$("#div-file").hide();
$("#stock").hide();
$("#TextoProducto").hide();
$("#TextoServicio").show();

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
    console.log(e.target);
    if (contador == false) {
        let span = document.querySelector('.links-header');
        if (e.target == span) {
            contador = 0;
        }
    }
});


//Enviar datos
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

$("#ButtonServicios").click(function() {
    alert("entre Servicio");
        $("#div-file").hide();
        $("#stock").hide();
        $("#TextoProducto").hide();
        $("#TextoServicio").show();

});
$("#ButtonProductos").click(function() {
    alert("entre Producto");
        $("#div-file").show();
        $("#stock").show();
        $("#TextoProducto").show();
        $("#TextoServicio").hide();


});