$("#ButtonServicios").click(function() {
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Servicio");
    $("#div-file").hide();
    $("#stock").hide();
    $("#TextoProducto").hide();
    $("#TextoServicio").show();

});
$("#ButtonProductos").click(function() {
    $("#ContactarButton").empty();
    $("#ContactarButton").append("Producto");
    $("#div-file").show();
    $("#stock").show();
    $("#TextoProducto").show();
    $("#TextoServicio").hide();


});