const socketCustomer = io('http://127.0.0.1:5000', {
    autoConnect: false,
})
const socketVendor = io('http://127.0.0.1:5000', {
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
const URL = 'http://127.0.0.1:5000'

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
    fetch(URL + '/ingreso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorLogin),
    })
        .then((response) => response.json())
        .then((data) => {
            vendor = data.token
            socketVendor.connect()
            setConnectedVendor(true)
        })
}

const connectCustomer = () => {
    fetch(URL + '/ingreso', {
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
    fetch(URL + '/consultarMisOfertas', {
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
    vendor.sid = data.sid
    window.vendorsid = data.sid
    setCookie('vendorsid', vendorsid)
    socketVendor.emit('userInfo', vendor)
})

socketVendor.on('buyNotification', (data) => {
  console.log(data);
})

socketCustomer.on('buyNotification', (data) => {
  console.log(data);
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

function setCookie(name, token) {
    document.cookie =
        `${name}=` + encodeURIComponent(token) + '; max-age=3600; path=/'
}
