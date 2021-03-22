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
         return true;
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
            return 0;
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
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
}

//HACER

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
        } else {
            console.log(result.status)
            return 0;
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
    let data={
        "busqueda":busqueda
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
        } else {
            console.log(result.status)
            return 0;
        }
    } catch (error) {
        console.log(error)
        return 0;
    }


    return true;
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