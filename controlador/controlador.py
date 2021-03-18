#!/usr/bin/python3
import pymysql

class controlador:
   def __init__(self, serverDB, usuarioDB, contraDB, base):
      self.serverDB = serverDB
      self.usuarioDB = usuarioDB
      self.contraDB = contraDB
      self.base = base

   def conectarBaseDeDatos(self):
      # Establece la conexion con la base de datos
      self.db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
      # Genera el cursor para ejecutar sentencias
      self.cursor = self.db.cursor()

   '''
   USUARIO
   '''

   def consultarUsuario(self):
      self.conectarBaseDeDatos()
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Usuario;")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
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
                f"Fecha: {fecha}, Total Moneda:{moneda}, Dirección: {direccion}")
      self.db.close() #Cierra la conexión

   def insertarUsuario(self, id, nombre, apellido, correo, contra, celular, ocupacion, fecha, moneda, direccion):
      self.conectarBaseDeDatos()
      # Define el query de inserción
      sql = f"insert into Usuario values('{id}','{nombre}','{apellido}','{correo}',sha('{contra}'),'{celular}','{ocupacion}'," \
            f"'{fecha}','{moneda}','{direccion}'); "

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("Error al insertar usuario")
         self.db.rollback()
      self.db.close() #Cierra la conexión

   '''
   OFERTA
   '''

   def consultarOferta(self):
      self.conectarBaseDeDatos()
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Oferta;")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
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
      self.db.close() #Cierra la conexión

   def insertarOferta(self, nombre, descripcion, precio, usuario):
      self.conectarBaseDeDatos()
      # Define el query de inserción
      sql = f"insert into Oferta values(null,'{nombre}','{descripcion}',{precio},'{usuario}');"

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("Error al insertar oferta")
         self.db.rollback()
      self.db.close() #Cierra la conexión

   '''
   PRODUCTO
   '''

   def consultarProducto(self):
      self.conectarBaseDeDatos()
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Producto")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- PRODUCTOS ----")
      for fila in resultado:
         imagen = fila[0]
         cantidad = fila[1]
         oferta = fila[2]
         # Imprime cada fila
         print (f"Imagen: {imagen}, Cantidad: {cantidad}, Oferta: {oferta}")
      self.db.close() #Cierra la conexión

   def insertarProducto(self, imagen, cantidad, oferta):
      self.conectarBaseDeDatos()
      # Define el query de inserción
      sql = f"insert into Producto values('{imagen}',{cantidad},{oferta});"

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("Error al insertar producto")
         self.db.rollback()
      self.db.close() #Cierra la conexión

   '''
   SERVICIO
   '''

   def consultarServicio(self):
      self.conectarBaseDeDatos()
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Servicio")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- SERVICIOS ----")
      for fila in resultado:
         lugar = fila[0]
         oferta = fila[1]
         # Imprime cada fila
         print (f"Lugar: {lugar}, Oferta: {oferta}")
      self.db.close() #Cierra la conexión

   def insertarServicio(self, lugar, oferta):
      self.conectarBaseDeDatos()

      # Define el query de inserción
      sql = f"insert into Servicio values('{lugar}',{oferta});"

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("Error al insertar servicio")
         self.db.rollback()
         self.db.close() #Cierra la conexión

   '''
      TRANSACCIÓN
   '''

   def consultarTransaccion(self):
      self.conectarBaseDeDatos()
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Transaccion")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- TRANSACCIONES ----")
      for fila in resultado:
         id = fila[0]
         concepto = fila[1]
         usuario = fila[2]
         valor = fila[3]
         # Imprime cada fila
         print (f"ID: {id}, Concepto: {concepto}, Usuario: {usuario}, Valor: {valor}")
      self.db.close() #Cierra la conexión

   def insertarTransaccion(self, concepto, usuario, valor):
      self.conectarBaseDeDatos()

      # Define el query de inserción
      sql = f"insert into Transaccion values(null,'{concepto}','{usuario}',{valor});"

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("Error al insertar transaccion")
         self.db.rollback()
      self.db.close() #Cierra la conexión

   '''
      COMPRA
   '''

   def consultarCompra(self):
      self.conectarBaseDeDatos()

      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Compra")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
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
      self.db.close() #Cierra la conexión

   def insertarCompra(self, precio, usuario, transaccion, oferta):
      self.conectarBaseDeDatos()

      # Define el query de inserción
      sql = f"insert into Compra values(null,{precio},'{usuario}',{transaccion},{oferta});"

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("Error al insertar compra")
         self.db.rollback()
      self.db.close() #Cierra la conexión

   '''
      RECARGA
   '''

   def consultarRecarga(self):
      self.conectarBaseDeDatos()

      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Recarga")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- RECARGAS ----")
      for fila in resultado:
         transaccion = fila[0]
         valor = fila[1]
         # Imprime cada fila
         print (f"Transaccion: {transaccion}, Valor: {valor}")
      self.db.close() #Cierra la conexión

   def insertarRecarga(self,transaccion, valor):
      self.conectarBaseDeDatos()

      # Define el query de inserción
      sql = f"insert into Recarga values({transaccion},{valor});"

      # Es necesario en caso de que existan conflictos en la base
      try:
         # Ejecuta el query
         self.cursor.execute(sql)
         # Guarda los cambios en la base
         self.db.commit()
      except:
         # Corrije la inserción en caso de error
         print("error")
         self.db.rollback()
      self.db.close() #Cierra la conexión

#####################################################
   '''
      QUERYS ESPECIFICOS
   '''
#####################################################
   #Verificar si un usuario existe
   def verificarUsuario(self, correo):
       self.conectarBaseDeDatos()
       sql = f"SELECT EXISTS(\nSELECT Usuario.idUsuario FROM Usuario \n" \
             f"WHERE Usuario.emailUsuario='{correo}') as 'Result';"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       if resultado[0][0] == 1:  # Si no arroja nada la consulta se envia el error
           print(f"Usuario encontrado con el correo {correo}")
       else:
           print("Error, usuario no encontrado")
       self.db.close()  # Cierra la conexión

   ### Consultar a usuarios y verificar el login ###
   def verificarLogin(self, correo,contra):
      self.conectarBaseDeDatos()
      sql = f"select * from Usuario as u where u.emailUsuario='{correo}' && u.contraseñaUsuario=sha('{contra}');"
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute(sql)
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- VERIFICACION DE LOGIN ----")
      if len(resultado) != 0:  # Si no arroja nada la consulta se envia el error
          print("BIENVENIDO", resultado[0][1], resultado[0][2])
      else:
          print("Error en el login\nVerifique los datos ingresados")

      self.db.close()  # Cierra la conexión

   def actualizarUsuario(self, id, nombre, apellido, contra, celular, ocupacion, direccion):
       self.conectarBaseDeDatos()
       # Define el query de inserción
       sql = f"update Usuario as u set u.nombreUsuario='{nombre}',u.apellidousuario='{apellido}',\n" \
             f"u.contraseñaUsuario=sha('{contra}'),u.telefonoUsuario='{celular}',\n" \
             f"u.ocupacionUsuario='{ocupacion}',u.direccion='{direccion}'\n" \
             f"where u.idUsuario='{id}';"

       # Es necesario en caso de que existan conflictos en la base
       try:
           # Ejecuta el query
           self.cursor.execute(sql)
           # Guarda los cambios en la base
           self.db.commit()
           print("Datos del usuario actualizados")
       except:
           # Corrije la inserción en caso de error
           print("Error al actualizar los datos del usuario",id)
           self.db.rollback()
       self.db.close()  # Cierra la conexión

   ### Consultar todos los productos ###
   def consultarTodo_Producto(self):
      self.conectarBaseDeDatos()

      sql = f"select *,Producto as tipo from Oferta as o,Producto as p\n" \
            f"where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0;"
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute("SELECT * from Producto")
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- PRODUCTOS ----")
      for fila in resultado:
         imagen = fila[0]
         cantidad = fila[1]
         oferta = fila[2]
         # Imprime cada fila
         print (f"Imagen: {imagen}, Cantidad: {cantidad}, Oferta: {oferta}")
      self.db.close() #Cierra la conexión

   ###   Consultar Todas los Productos que un Usuario ha creado ###
   def consultarProductosDeUsuario(self, usuario):
      self.conectarBaseDeDatos()
      sql = f"select * from Oferta as o,Producto as p " \
            f" where o.codOferta=p.Oferta_codOferta && o.Usuario_idUsuario='{usuario}';"
      try:
         # ejecuta el query SQL para extraer los usuarios
         self.cursor.execute(sql)
         # Recupera los registros de la ejecución
         resultado = self.cursor.fetchall()
         # Ordena el resultado de la ejecucion
         print("\n---- PRODUCTOS CREADOS POR EL USUARIO ----")
         for fila in resultado:
            imagen = fila[0]
            cantidad = fila[1]
            oferta = fila[2]
            # Imprime cada fila
            print (f"Imagen: {imagen}, Cantidad: {cantidad}, Oferta: {oferta}")
      except:
         print("Error consulta producto por usuario")
      self.db.close() #Cierra la conexión

   ### Consultar todos los servicios que un usuario ha creado###
   def consultarServiciosDeUsuario(self, usuario):
      self.conectarBaseDeDatos()
      sql = f"select * from Oferta as o,Servicio as s\n" \
            f"where o.codOferta=s.Oferta_codOferta && o.Usuario_idUsuario='{usuario}';"
      try:
         # ejecuta el query SQL para extraer los usuarios
         self.cursor.execute(sql)
         # Recupera los registros de la ejecución
         resultado = self.cursor.fetchall()
         # Ordena el resultado de la ejecucion
         print("\n---- SERVICIOS CREADOS POR EL USUARIO ----")
         for fila in resultado:
            lugar = fila[0]
            oferta = fila[1]
            # Imprime cada fila
            print (f"Lugar: {lugar}, Oferta: {oferta}")
      except:
         print("Error consulta servicio por usuario")
      self.db.close() #Cierra la conexión

   ### Todas las compras que el usuario ha realizado ###
   def consultarComprasDeUsuario(self, usuario):
       self.conectarBaseDeDatos()
       sql = f"Select * from Compra as c where c.Usuario_idUsuario='{usuario}';"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- COMPRAS DEL USUARIO ----")
       for fila in resultado:
           id = fila[0]
           precio = fila[1]
           usuario = fila[2]
           transaccion = fila[3]
           oferta = fila[4]
           # Imprime cada fila
           print(f"ID: {id}, Precio: {precio}, Usuario: {usuario}, Transaccion: {transaccion}, Oferta: {oferta}")
       self.db.close()  # Cierra la conexión



   ### Actualizar el saldo por una compra ##
   def actualizarSaldo(self, usuario, cantidad):
       self.conectarBaseDeDatos()
       # Define el query de inserción
       sql = f"UPDATE Usuario SET totalMonedaUsuario=totalMonedaUsuario-{cantidad}\n" \
             f"WHERE idUsuario='{usuario}';"

       # Es necesario en caso de que existan conflictos en la base
       try:
           # Ejecuta el query
           self.cursor.execute(sql)
           # Guarda los cambios en la base
           self.db.commit()
           print("Saldo actualizado")
       except:
           # Corrije la inserción en caso de error
           print("error")
           self.db.rollback()
       self.db.close()  # Cierra la conexión

   ### Actualiza el atributo cantidad en la entidad producto ###
   def actualizarCantidadProducto(self, oferta, cantidad):
       self.conectarBaseDeDatos()
       # Define el query de inserción
       sql = f"UPDATE Producto SET cantidadProducto=cantidadProducto-{cantidad}\n" \
             f"WHERE Oferta_codOferta={oferta};" \

       # Es necesario en caso de que existan conflictos en la base
       try:
          # Ejecuta el query
          self.cursor.execute(sql)
          # Guarda los cambios en la base
          self.db.commit()
          print("Cantidad actualizada")
       except:
          # Corrije la inserción en caso de error
          print("Error al actualizar cantidad en Producto")
          self.db.rollback()
       self.db.close() #Cierra la conexión



control = controlador(serverDB="",usuarioDB="",contraDB="",base="")

####################
## PREUBAS QUERYS ##
####################
#control.verificarUsuario("felipe@gmail.com")
#control.verificarLogin("felipe@gmail.com",12345)
#control.consultarTodo_Producto()
#control.consultarProductosDeUsuario("1002549404");
#control.consultarServiciosDeUsuario("1002549404")
#control.consultarComprasDeUsuario("1002549404")
#control.actualizarSaldo("1002549404",2000)
#control.actualizarCantidadProducto(1, 1)
#control.actualizarUsuario("1002549404","Luis","Velasquez","qwerty","3249874577","Eléctrico","Calle 23")

###########################
## PRUEBAS GENERALES     ##
## INSERCION / CONSULTAR ##
###########################

# USUARIO
#control.insertarUsuario('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudiante','2001-01-1',10000,'Cll 434,Villa de Leyva')
#control.consultarUsuario()

# OFERTA
#control.insertarOferta("celular iphone 6","Es un celular bonito",1200000,'1002549404');
#control.consultarOferta()

# PRODUCTO
#control.insertarProducto('https://www.google.es/url?sa=dsds',3,1)
#control.consultarProducto()

# SERVICIO
#control.insertarServicio('Sector del norte de Bogotá',1)
#control.consultarServicio()

# TRANSACCIÓN
#control.insertarTransaccion('Compra', '1002549404', 200000)
#control.consultarTransaccion()

# COMRPA
#control.insertarCompra(200000,'1002549404',1,1)
#control.consultarCompra()

# Recarga
#control.insertarRecarga(1,5000)
#control.consultarRecarga()