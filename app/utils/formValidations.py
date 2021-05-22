def validateRegisterForm(form_data):
  fields = [
    'idUsuario', 'nombreUsuario', 'apellidoUsuario', 
    'emailUsuario', 'passwordUsuario', 'codBarrio', 
    'telefonoUsuario', 'fechaNacimiento', 'direccion']
  for field in fields:
    if not field in form_data:
      return 0, "MISSING_FIELD"

  return 1, "OK"

def validateLoginForm(form_data):
  fields = ['emailUsuario', 'passwordUsuario']
  for field in fields:
    if not field in form_data:
      return 0, "MISSING_FIELD"
  return 1, "OK"

def validate_getpublications(form_data):
  fields = ['id']
  for field in fields:
    if not field in form_data:
      return 0, "MISSING_FIELD"
  return 1, "OK"

def create_response(response, info, message, status_code):
  response[0]["info"] = info; response[0]["message"] = message 
  response[0]["status"] = status_code; response[1] = status_code
  return response

