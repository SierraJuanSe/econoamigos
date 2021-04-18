const socketCustomer = io('http://127.0.0.1:5000', {
    autoConnect: false,
})
const socketVendor = io('http://127.0.0.1:5000', {
    autoConnect: false,
})

const customerLogin = {
  "emailUsuario": "comprador@mail.com",
  "passwordUsuario": "compras123"
}
const vendorLogin = {
  "emailUsuario": "vendedor@mail.com",
  "passwordUsuario": "ventas123"
}
let customer = {
    emailUsuario: 'comprador@mail.com',
    passwordUsuario: 'compras123',
}
let vendor = {
    emailUsuario: 'vendedor@mail.com',
    passwordUsuario: 'ventas123',
}
const URL = 'http://127.0.0.1:5000'

/* acciones */ 

const setConnectedVendor = (connected) => {
    $('#connectVendor__btn').prop('disabled', connected)
    $('#disconnectVendor__btn').prop('disabled', !connected)
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


/* ESCUCHAS DEL WEB-SOCKET Vendedor*/
socketVendor.on('sid', (data) => {
    vendor.sid = data.sid
    window.vendorsid = data.sid
    setCookie('vendorsid', vendorsid)
    socketVendor.emit('userInfo', vendor)
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
    $('#connectVendor__btn').click(() => connectVendor())
    $('#connectCustomer__btn').click(() => connectCustomer())
    $('#disconnectVendor__btn').click(() => disconnectVendor())
    $('#disconnectCustomer__btn').click(() => disconnectCustomer())
})

function setCookie(name, token) {
    document.cookie =
        `${name}=` + encodeURIComponent(token) + '; max-age=3600; path=/'
}
