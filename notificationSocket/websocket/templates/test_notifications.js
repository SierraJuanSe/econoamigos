const URLSocket = 'http://127.0.0.1:5000'
let numNotifications = 0

const socketCustomer = io(URLSocket, {
    autoConnect: false,
})
const socketVendor = io(URLSocket, {
    autoConnect: false,
})

const customerLogin = {
    emailUsuario: 'comprador@mail.com',
    passwordUsuario: 'compras123',
}
const vendorLogin = {
    emailUsuario: 'vendedor@mail.com',
    passwordUsuario: 'ventas123',
}
let customer = {
    emailUsuario: 'comprador@mail.com',
    passwordUsuario: 'compras123',
}
let vendor = {
    emailUsuario: 'vendedor@mail.com',
    passwordUsuario: 'ventas123',
}

let products = []


/* acciones */

const setConnectedVendor = (connected) => {
    $('#connectVendor__btn').prop('disabled', connected)
    $('#disconnectVendor__btn').prop('disabled', !connected)
    $('#product__container').toggle()
}

const setConnectedCostumer = (connected) => {
    $('#connectCustomer__btn').prop('disabled', connected)
    $('#disconnectCustomer__btn').prop('disabled', !connected)
}

const connectVendor = () => {
    fetch(URLSocket + '/ingreso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorLogin),
    })
        .then((response) => response.json())
        .then((data) => {
            window.token = JSON.stringify(data.token);
            setCookie(token);
            console.log(JSON.parse(readCookie('token')))
            // vendor = data.token
            socketVendor.connect()
            setConnectedVendor(true)
        })
}

const connectCustomer = () => {
    fetch(URLSocket + '/ingreso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerLogin),
    })
        .then((response) => response.json())
        .then((data) => {
            customer = data.token
            socketCustomer.connect()
            setConnectedCostumer(true)
        })
}

const disconnectVendor = () => {
    socketVendor.disconnect()
    setConnectedVendor(false)
}

const disconnectCustomer = () => {
    socketCustomer.disconnect()
    setConnectedCostumer(false)
}

const getProducts = () => {
    fetch(URLSocket + '/consultarMisOfertas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id":vendor.id}),
    })
        .then((response) => response.json())
        .then((data) => {
            products = data.info
            d = data.info.map(item => {
              return `<tr>
                <td>${item.nombre}</td>
                <td>${item.descripcion}</td>
                <td><input 
                  class='buy_btn' 
                  type="button" 
                  value=${item.id}
                  onclick='buyProduct(${item.id})'></td></tr>`
            })
            $('#product_table').append(d)
        })
}

const buyProduct = (value) => {
  if(socketCustomer.connected){
    p = products.filter(item => item.id === value)[0]
    data = {
      "idUsuario": customer.id,
      "precio": p.precio,
      "idOferta": p.id
    }
    fetch(URL + '/insertarCompra', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log("compra", data)
      })
  }
}

/* ESCUCHAS DEL WEB-SOCKET Vendedor*/
socketVendor.on('sid', (data) => {
    socketVendor.emit('userInfo', JSON.parse(readCookie('token')))
})

socketCustomer.on('buyNotification', (data) => {
  console.log("costumer", data);
})

socketVendor.on('buyNotification', (data) => {
  numNotifications += 1;
  info = `<p>Te hicieron una compra de: ${data.info.nombre} por $${data.info.precio}</p>`
  $('#notification_list').append(info)
  console.log("vendor:", data);
})

/* ESCUCHAS DEL WEB-SOCKET comprador*/
socketCustomer.on('sid', (data) => {
    customer.sid = data.sid
    window.customersid = data.sid
    setCookie('custumersid', customersid)
    socketCustomer.emit('userInfo', customer)
})

$(() => {
    $('form').on('submit', (e) => {
        e.preventDefault()
    })
    $('#product__container').hide()
    $('#connectVendor__btn').click(() => connectVendor())
    $('#connectCustomer__btn').click(() => connectCustomer())
    $('#disconnectVendor__btn').click(() => disconnectVendor())
    $('#disconnectCustomer__btn').click(() => disconnectCustomer())
    $('#getProducts__btn').click(() => getProducts())
    $('.buy_btn').click((e) => buyProduct(e))
})

function setCookie(token) {
    document.cookie = "token=" + encodeURIComponent(token) + "; max-age=3600; path=/";
}

function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
