$("#UrlImagen").hide();
$("#stock").hide();
$("#TextoProducto").hide();
$("#TextoServicio").show();
$( "#ContactarButton" ).empty();
$( "#ContactarButton" ).append("Seleccione");


$("#ButtonServicios").click(function() {
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Servicio");
    $("#UrlImagen").hide();
    $("#stock").hide();
    $("#TextoProducto").hide();
    $("#TextoServicio").show();

});
$("#ButtonProductos").click(function() {
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Producto");
    $("#UrlImagen").show();
    $("#stock").show();
    $("#TextoProducto").show();
    $("#TextoServicio").hide();


});