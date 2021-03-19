const inputs = document.querySelectorAll(".input");


function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}


inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});
//LOGIN

//Iniciar Sesión Formulario
$("#Ingresar").click(function() {

    //Recolectar Datos
    correo = $("#correoL").val();
    contrasenia = $("#passL").val();

    //Verificar datos
    if (correo == "" || contrasenia == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (correo.includes('@')) {
        envioLogin(correo, contrasenia); //Llamado a funcion guardar
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    }

});

//Funcion para Inciar Sesion
async function envioLogin(correo, contrasenia) {
    //Recibe validacion de la funcion login ubicada en peticiones.js
    var save = await login(correo, contrasenia);
    if (save) {
        location.href = "menu.html";
        console.log(save)
    } else {
        swal("Error", "El correo que intentas ingresar no esta registrado", "error");
    }

}

//REGISTRO

//Registrar usuario Formulario
$("#Registrar").click(function() {

    //Recolectar Datos
    cedula = $("#idR").val();
    nombre = $("#nombreR").val();
    apellido = $("#apellidoR").val();
    correo = $("#correoR").val();
    telefono = $("#telefonoR").val();
    ocupacion = $("#ocupacionR").val();
    formatofecha = $("#fechaR").val().split("-");
    fecha = formatofecha[0] + '-' + formatofecha[1] + '-' + formatofecha[2];
    direccion = $("#direccionR").val();
    contrasenia = $("#passR").val();
    //Verificar datos
    if (cedula == "" || nombre == "" || apellido == "" || correo == "" || telefono == "" || ocupacion == "" || fecha == "" || direccion == "" || contrasenia == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        enviarcreacionCuenta(cedula, nombre, apellido, correo, telefono, ocupacion, fecha, direccion, contrasenia); //Llamado a funcion guardar
    }

});

//Funcion para Registrar Usuario
async function enviarcreacionCuenta(cedula, nombre, apellido, correo, telefono, ocupacion, fecha, direccion, contrasenia) {
    //Envia los datos a la funcion crearCuenta ubicada en peticiones.js
    var save = await crearCuenta(cedula, nombre, apellido, correo, telefono, ocupacion, fecha, direccion, contrasenia)
    if (save == 1) {
        swal("Gracias", "¡Ya eres parte de esta familia!", "success").then((value) => {
            location.href = "index.html";
        });

    } else if (save == 0) {
        swal("Error", "Por favor, Intenta mas tarde", "error");
    } else {
        swal("Error", "Lo sentimos, el correo que intentas ingresar ya esta registrado", "error");
    }
}


//HISTORIAL
$("#Solicitar").click(function() {

    //Recolectar Datos
    buscar = $("#ver").val();
    //Verificar datos

    //Verificar datos
    if (buscar == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else {
        busqueda(buscar);
    }

});

//Funcion para realizar la busqueda de historial
async function busqueda(buscar) {
    //Recibe validacion de la funcion historial ubicada en funciones.js
    var save = await historial(buscar);
}