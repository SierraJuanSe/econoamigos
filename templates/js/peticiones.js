// Iniciar Sesion
async function login(correo, contrasenia) {
    //Almacena los datos en JSON
    let data = {
        "emailUsuario": correo,
        "passwordUsuario": contrasenia
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/ingreso",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        console.log(result)
        window.token = JSON.stringify(result);
        setCookie(token);
        console.log(readCookie('token'))
         return result;
    } catch (error) {
        console.log(error)
        
    }


}


// Registrar Usuario
async function crearCuenta(cedula, nombre, apellido, correo, telefono, ocupacion, fecha, direccion, contrasenia) {
    //Almecena los datos en JSON
    let data = {
        "idUsuario": cedula,
        "nombreUsuario": nombre,
        "apellidoUsuario": apellido,
        "emailUsuario": correo,
        "passwordUsuario": contrasenia,
        "telefonoUsuario": telefono,
        "ocupacionUsuario": ocupacion,
        "fechaNacimiento": fecha,
        "direccion": direccion,
    };

    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/registro",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
          return result.info;
    } catch (error) {
        console.log(error)
        
    }
}


//HACER

//Consultar compras
async function consultarCompras() {
    var USUARIO=JSON.parse(readCookie('token'));
    let data={
        "idUsuario":USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertasCompradas",
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


//HACER

//Consultar solicitudes
async function consultarSolicitudes() {
    var USUARIO=JSON.parse(readCookie('token'));
    let data={
        "idUsuario":USUARIO['id']
    }
    console.log(JSON.stringify(data));
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertasVendidas",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
            traerSolicitudes(result.info);
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
async function actualizarSolicitud(codCompra){
    let data={
        "idCompra":codCompra
    }
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/actualizarEstadoCompra",
            data: JSON.stringify(data),
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        })
        if (result.status == 200) {
            console.log(result.info)
        } else {
            console.log(result.status)
            return 0;
        }
        return result.info;
    } catch (error) {
        console.log(error)
        return 0;
    }
    actualizarMonedaVista(20000);
    return true;
}

// Peticion para crear un servicio 
async function crearServicio(nombre,descripcion,precio,lugar){
    const USUARIO=JSON.parse(readCookie('token'));
    let data = {
        "nombre": nombre,
        "descripcion": descripcion,
        "precio":precio,
        "idUsuario":USUARIO['id'],
        "lugar":lugar
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarServicio",
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
async function crearProducto(nombre,descripcion,precio,imagen,cantidad){
    const USUARIO=JSON.parse(readCookie('token'));
    let data = {
        "nombre": nombre,
        "descripcion": descripcion,
        "precio":precio,
        "idUsuario":USUARIO['id'],
        "imagen":imagen,
        "cantidad":cantidad
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarProducto",
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
async function consultarOfertas(){
    const USUARIO=JSON.parse(readCookie('token'));
    let data={
        "id":USUARIO['id']
    }
    console.log(data.id)
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertas",
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
async function consultarOfertaEspecifica(busqueda){
    const USUARIO=JSON.parse(readCookie('token'));
    let data={

        "busqueda":busqueda,
        "id":USUARIO["id"]
    }
 
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarOfertaEspecifica",
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

//Crear compra
async function crearCompra(id,precio){
    const USUARIO=JSON.parse(readCookie('token'));
    console.log(id);
    console.log(precio);
    let data = {
        "idOferta": id,
        "precio":precio,
        "idUsuario":USUARIO['id']
        
    };
    console.log(data);
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/insertarCompra",
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
    return true;
}

//consulta datos para la configuración
async function consultarDatosConfiguracion(){
    const USUARIO=JSON.parse(readCookie('token'));
    let data={
        "id":USUARIO["id"]
    }
 
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/consultarUsuario",
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

//Modificar datos usuarios
async function ModificarDatosUsuario(nombre,apellido,telefono,ocupacion,direccion,password){
    const USUARIO=JSON.parse(readCookie('token'));
    let data = {
       "idUsuario":USUARIO['id'],
        "nombreUsuario": nombre,
        "apellidoUsuario": apellido,
        "passwordUsuario": password,
        "telefonoUsuario": telefono,
        "ocupacionUsuario": ocupacion,
        "direccionUsuario": direccion
        
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/actualizarUsuario",
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

//Recargar cuenta
async function Recargar(recarga){
    const USUARIO=JSON.parse(readCookie('token'));
    let data = {
       "idUsuario":USUARIO['id'],
        "valor": recarga
        
    };
    try {
        result = await $.ajax({
            url: "http://25.7.209.143:5000/recargar",
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

async function consultarTrasnsacciones() {
    let result = [{
        "concepto": "ingreso",
        "estado": true,
        "precio": 5000
    },
    {
        "concepto": "compra",
        "estado": false,
        "precio": 15000
    },
    {
        "concepto": "recarga",
        "estado": true,
        "precio": 2300
    }]
    traerTransacciones(result)
}

async function consultarOfertas() {
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
    }]
    traerOfertas(result)
}


function setCookie(token) {
    document.cookie = "token=" + encodeURIComponent(token) + "; max-age=3600; path=/";
}

function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function deleteCookie() {
    document.cookie = "token=; max-age=0; path=/";
}