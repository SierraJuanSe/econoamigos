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

    //Verificar datos
    if (correo == "" || contrasenia == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (correo.includes('@')) {
        /*swal("Correcto", "¡Bienvenido!", "success")*/
        Inicio(correo, contrasenia); //Llamado a funcion guardar
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    }

});

//Funcion para Inciar Sesion
async function Inicio(correo, contrasenia) {
    //Recibe validacion de la funcion login ubicada en funciones.js
    var save = await login(correo, contrasenia);
}

//REGISTRO

//Registrar usuario Formulario
$("#Registrar").click(function() {

    //Recolectar Datos
    nombre = $("#nombreR").val();
    apellido = $("#apellidoR").val();
    correo = $("#correoR").val();
    contrasenia = $("#passR").val();
    //Verificar datos
    if (nombre == "" || apellido == "" || correo == "" || contrasenia == "") {
        swal("Error", "Por favor, Ingrese todos los datos", "error");
    } else if (!correo.includes('@')) {
        swal("Error", "Por favor, Ingrese un formato de correo válido", "error");
    } else {
        /*swal("Gracias", "¡Ya eres parte de esta familia!", "success")*/
        guardar(nombre, apellido, correo, contrasenia); //Llamado a funcion guardar
    }

});

//Funcion para Registrar Usuario
async function guardar(nombre, apellido, correo, contrasenia) {
    //Envia los datos a la funcion crearCuenta ubicada en funciones.js
    var save = await crearCuenta(nombre, apellido, correo, contrasenia)
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
