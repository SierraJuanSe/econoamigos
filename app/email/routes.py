from app.email import bp
from app.email.purchase_email import send_sale_notification_email, send_purchase_notification_email
from app.modelo.usuario import Usuario
from app.modelo.oferta import Oferta

@bp.route('/mail')
def mail():
  return "Mail"


@bp.route('/mail/sales/<email>/<int:id>/<name>', methods=['GET'])
def mail_sale(email, id, name):
  user = Usuario(email=email, nombre=name)
  products = {
    1: Oferta(tipo='producto',  nombre='lavadora', descripcion='una lavadora', precio=1, imagenProducto="https://www.tiendamabe.com.co/medias/mabe-lavadora-19kg-blanca-LMA79114SBAB0-derecha.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMDQwMjR8aW1hZ2UvanBlZ3xpbWFnZXMvaDUzL2hlNy84ODc0OTkyMjcxMzkwLmpwZ3wzOTRmOTA3MDc2ZGU0ZjM1NjA0YWU5MzU5ZGQzODJjNTVmMzE0Y2U4NmUwNmNhNWExMWE2NTZkOTZmOTFhNjY2"), 
    2: Oferta(tipo='producto',  nombre='reloj', descripcion='una reloj', precio=1, imagenProducto="https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/8/4/8401017259030-3.jpg"), 
    3: Oferta(tipo='producto',  nombre='celular', descripcion='una celular', precio=1, imagenProducto="https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/8/8/8806090070280_1.jpg"), 
    4: Oferta(tipo='servicio',  nombre='pinto casa a domicilio', descripcion='me llevo la casa', precio=1), 
    5: Oferta(tipo='servicio',  nombre='doctor a domicilio', descripcion='doctor buenisimo', precio=1), 
  }
  t = send_sale_notification_email(user, products[id])
  return t


@bp.route('/mail/sales/<email>/<int:id>/<name>', methods=['GET'])
def mail_sale(email, id, name):
  user = Usuario(email=email, nombre=name)
  products = {
    1: Oferta(tipo='producto',  nombre='lavadora', descripcion='una lavadora', precio=1, imagenProducto="https://www.tiendamabe.com.co/medias/mabe-lavadora-19kg-blanca-LMA79114SBAB0-derecha.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMDQwMjR8aW1hZ2UvanBlZ3xpbWFnZXMvaDUzL2hlNy84ODc0OTkyMjcxMzkwLmpwZ3wzOTRmOTA3MDc2ZGU0ZjM1NjA0YWU5MzU5ZGQzODJjNTVmMzE0Y2U4NmUwNmNhNWExMWE2NTZkOTZmOTFhNjY2"), 
    2: Oferta(tipo='producto',  nombre='reloj', descripcion='una reloj', precio=1, imagenProducto="https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/8/4/8401017259030-3.jpg"), 
    3: Oferta(tipo='producto',  nombre='celular', descripcion='una celular', precio=1, imagenProducto="https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/8/8/8806090070280_1.jpg"), 
    4: Oferta(tipo='servicio',  nombre='pinto casa a domicilio', descripcion='me llevo la casa', precio=1), 
    5: Oferta(tipo='servicio',  nombre='doctor a domicilio', descripcion='doctor buenisimo', precio=1), 
  }
  t = send_purchase_notification_email(user, products[id])
  return t
