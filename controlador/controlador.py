#!/usr/bin/python3
import pymysql

'''
   USUARIO
'''

def consultarUsuario():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Usuario;")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
   print("\n---- USUARIO ----")
   for fila in resultado:
      id = fila[0]
      nombre = fila[1]
      apellido = fila[2]
      correo = fila [3]
      contra = fila [4]
      celular = fila[5]
      ocupacion = fila[6]
      fecha = fila[7]
      moneda = fila[8]
      direccion = fila[9]
      # Imprime cada fila
      print (f"ID: {id}, Nombre: {nombre} {apellido}, Correo: {correo}, Contra: {contra},\n"
             f"Celular: {celular}, Ocupación: {ocupacion},\n"
             f"Fecha: {fecha}', Total Moneda:{moneda}, Dirección: {direccion}")
   db.close() #Cierra la conexión

def insertarUsuario(id, nombre, apellido, correo, contra, celular, ocupacion, fecha, moneda, direccion):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Usuario values('{id}','{nombre}','{apellido}','{correo}',sha('{contra}'),'{celular}','{ocupacion}'," \
         f"'{fecha}','{moneda}','{direccion}'); "

   # Es necesario por si hay conflictos en la base
   try:
      # Ejecuta el query
      cursor.execute(sql)
      # Guarda los cambios en la base
      db.commit()
   except:
      # Corrije la inserción en caso de error
      print("error")
      db.rollback()
   db.close() #Cierra la conexión

'''
   OFERTA
'''

def consultarOferta():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Oferta;")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
   print("\n---- OFERTAS ----")
   for fila in resultado:
      id = fila[0]
      nombre = fila[1]
      descripcion = fila[2]
      precio = fila [3]
      usuario = fila [4]
      # Imprime cada fila
      print (f"ID: {id}, Nombre: {nombre}, Descripcion: {descripcion}\n"
             f"Precio: {precio}, Usuario: {usuario}")
   db.close() #Cierra la conexión

def insertarOferta(nombre, descripcion, precio, usuario):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Oferta values(null,'{nombre}','{descripcion}',{precio},'{usuario}');"

   # Es necesario por si hay conflictos en la base
   try:
      # Ejecuta el query
      cursor.execute(sql)
      # Guarda los cambios en la base
      db.commit()
   except:
      # Corrije la inserción en caso de error
      print("error")
      db.rollback()
   db.close() #Cierra la conexión

'''
   PRODUCTO
'''

def consultarProducto():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Producto")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
   print("\n---- PRODUCTOS ----")
   for fila in resultado:
      imagen = fila[0]
      cantidad = fila[1]
      oferta = fila[2]
      # Imprime cada fila
      print (f"Imagen: {imagen}, Cantidad: {cantidad}, Oferta: {oferta}")
   db.close() #Cierra la conexión

def insertarProducto(imagen, cantidad, oferta):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Producto values('{imagen}',{cantidad},{oferta});"

   # Es necesario por si hay conflictos en la base
   try:
      # Ejecuta el query
      cursor.execute(sql)
      # Guarda los cambios en la base
      db.commit()
   except:
      # Corrije la inserción en caso de error
      print("error")
      db.rollback()
   db.close() #Cierra la conexión


'''
   SERVICIO
'''

def consultarServicio():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Servicio")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
   print("\n---- SERVICIOS ----")
   for fila in resultado:
      lugar = fila[0]
      oferta = fila[1]
      # Imprime cada fila
      print (f"Lugar: {lugar}, Oferta: {oferta}")
   db.close() #Cierra la conexión

def insertarServicio(lugar, oferta):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Servicio values('{lugar}',{oferta});"

   # Es necesario por si hay conflictos en la base
   try:
      # Ejecuta el query
      cursor.execute(sql)
      # Guarda los cambios en la base
      db.commit()
   except:
      # Corrije la inserción en caso de error
      print("error")
      db.rollback()
   db.close() #Cierra la conexión


'''
   TRANSACCIÓN
'''

def consultarTransaccion():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Transaccion")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
   print("\n---- TRANSACCIONES ----")
   for fila in resultado:
      id = fila[0]
      concepto = fila[1]
      usuario = fila[2]
      valor = fila[3]
      # Imprime cada fila
      print (f"ID: {id}, Concepto: {concepto}, Usuario: {usuario}, Valor: {valor}")
   db.close() #Cierra la conexión

def insertarTransaccion(concepto, usuario, valor):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Transaccion values(null,'{concepto}','{usuario}',{valor});"

   # Es necesario por si hay conflictos en la base
   try:
      # Ejecuta el query
      cursor.execute(sql)
      # Guarda los cambios en la base
      db.commit()
   except:
      # Corrije la inserción en caso de error
      print("error")
      db.rollback()
   db.close() #Cierra la conexión

'''
   COMPRA
'''

def consultarCompra():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Compra")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
   print("\n---- COMPRAS ----")
   for fila in resultado:
      id = fila[0]
      precio = fila[1]
      usuario = fila[2]
      transaccion = fila[3]
      oferta = fila[4]
      # Imprime cada fila
      print (f"ID: {id}, Precio: {precio}, Usuario: {usuario}, Transaccion: {transaccion}, Oferta: {oferta}")
   db.close() #Cierra la conexión

def insertarCompra(precio, usuario, transaccion, oferta):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Compra values(null,{precio},'{usuario}',{transaccion},{oferta});"

   # Es necesario por si hay conflictos en la base
   try:
      # Ejecuta el query
      cursor.execute(sql)
      # Guarda los cambios en la base
      db.commit()
   except:
      # Corrije la inserción en caso de error
      print("error")
      db.rollback()
   db.close() #Cierra la conexión

### PRUEBAS ###

# USUARIO
#insertarUsuario('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudiante','2001-01-1',10000,'Cll 434,Villa de Leyva')
#consultarUsuario()

# OFERTA
#insertarOferta("celular iphone 6","Es un celular bonito",1200000,'1002549404');
#consultarOferta()

# PRODUCTO
#insertarProducto('https://www.google.es/url?sa=dsds',3,1)
#consultarProducto()

# SERVICIO
#insertarServicio('Sector del norte de Bogotá',1)
#consultarServicio()

# TRANSACCIÓN
#insertarTransaccion('Compra', '1002549404', 200000)
#consultarTransaccion()

# COMRPA
#insertarCompra(200000,'1002549404',1,1)
#consultarCompra()

# Recarga
