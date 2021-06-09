const cache = {
  'compras': [],
  'ventas' : []
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const USUARIO = JSON.parse(readCookie('token'));
  const option = $('#select-reclamo-tipo').val()
  const publicationId = $('#select-reclamo-oferta').val()
  const desc = $('#textarea-reclamo').val()
  data = {
    userId: USUARIO['id'],
    option,
    publicationId,
    desc,
    images: []
  }
  let r = await submitReclamo(data)
  if(r){
    swal("Tu reclamacion ha sido enviada con exito", {
      icon: "success"
    });
  }else{
    swal("Error creando la reclamacion", {
      icon: "error"
    });
  } 
}

const handleChangeSelect = async (e) => {
  let option
  if(e.target.value === '1'){
    option = 'compras'
  }else if(e.target.value === '2'){
    option = 'ventas'
  }

  if(option){
    let options = cache[option]
    if(options.length <= 0){
      options = await getSelectOptions(option)
      cache[option] = options
    }
    drawOptions(options)
  }else{
    drawOptions([])
  }
}

const handleChangeFileInput = (e) => {
  const files = e.target.files
  const fileList = $('#foto-pre')
  fileList.empty()
  for(let i = 0; i < files.length; i++) {
    const img = document.createElement("img");
    const div = document.createElement("div")
    div.classList.add("col")
    div.appendChild(img)

    fileList.append(img)
    img.src = URL.createObjectURL(files[i]);
    img.height = 80;
    img.onload = function() {
      URL.revokeObjectURL(this.src);
    }
  }
};

const drawOptions = (options) => {
  const selectInpt = $('#select-reclamo-oferta')
  selectInpt.empty()
  selectInpt.append('<option selected value="-1">...</option>')
  options.forEach(element => {
    selectInpt.append(`<option value="${element.id}">${element.name}</option>`)
  });
}

const getSelectOptions = async (option) => {
  const USUARIO = JSON.parse(readCookie('token'));
  data = {
    userId: USUARIO['id'],
    option,
  }
  try {
    r = await $.ajax({
      url: url + "/getPubNames",
      data: JSON.stringify(data),
      type: "POST",
      dataType: 'json',
      contentType: "application/json; charset=utf-8"
  })

    return r.options
  }catch(e){
    console.error(e);
    return []
  }
}

const submitReclamo = async (data) => {
  try {
    r = await $.ajax({
      url: url + "/createReclamo",
      data: JSON.stringify(data),
      type: "POST",
      dataType: 'json',
      contentType: "application/json; charset=utf-8"
  })
    return r.status
  }catch(e){
    console.log(error);
    return false
  }
}

$(() => {
  $('#select-reclamo-tipo').change((e) => handleChangeSelect(e))
  $('#foto-reclamo').change((e) => handleChangeFileInput(e))
  $('#reclamos-form').submit((e) => handleSubmit(e))
})
