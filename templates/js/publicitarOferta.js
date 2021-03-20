$("#UrlImagen").hide();
$("#stock").hide();
$("#TextoProducto").hide();
$("#TextoServicio").show();
$("#Direccion").show();
$( "#ContactarButton" ).empty();
$( "#ContactarButton" ).append("Seleccione");


$("#ButtonServicios").click(function() {
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Servicio");
    $("#UrlImagen").hide();
    $("#stock").hide();
    $("#TextoProducto").hide();
    $("#TextoServicio").show();
    $("#Direccion").show();

});
$("#ButtonProductos").click(function() {
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Producto");
    $("#UrlImagen").show();
    $("#stock").show();
    $("#TextoProducto").show();
    $("#Direccion").hide();
    $("#TextoServicio").hide();
    $("#hiden").show();


});