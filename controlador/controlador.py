#!/usr/bin/python3
import pymysql

#BASE PARA LAS SENTENCIAS EN EL MODELO
class controlador:
   def __init__(self, serverDB, usuarioDB, contraDB, base):
      self.serverDB = serverDB
      self.usuarioDB = usuarioDB
      self.contraDB = contraDB
      self.base = base

   def conectarBaseDeDatos(self):
      # Establece la conexion con la base de datos
      self.db = pymysql.connect(self.serverDB, self.usuarioDB, self.contraDB, self.base)
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
         estado = fila[4]
         usuario = fila [5]
         # Imprime cada fila
         print (f"ID: {id}, Nombre: {nombre}, Descripcion: {descripcion}\n"
                f"Estado: {estado}, Precio: {precio}, Usuario: {usuario}")
      self.db.close() #Cierra la conexión

   def insertarOferta(self, nombre, descripcion, precio, estado, usuario):
      self.conectarBaseDeDatos()
      # Define el query de inserción
      sql = f"insert into Oferta values(null,'{nombre}','{descripcion}',{precio},{estado},'{usuario}');"

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
         estado = fila[4]
         # Imprime cada fila
         print (f"ID: {id}, Concepto: {concepto}, Usuario: {usuario}, "
                f"Valor: {valor}, Estado: {estado}")
      self.db.close() #Cierra la conexión

   def insertarTransaccion(self, concepto, usuario, valor, estado):
      self.conectarBaseDeDatos()

      # Define el query de inserción
      sql = f"insert into Transaccion values(null,'{concepto}','{usuario}',{valor},{estado});"

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
         estado = fila[2]
         usuario = fila[3]
         transaccion = fila[4]
         oferta = fila[5]
         # Imprime cada fila
         print (f"ID: {id}, Precio: {precio}, Estado: {estado}"
                f" Usuario: {usuario}, Transaccion: {transaccion}, Oferta: {oferta}")
      self.db.close() #Cierra la conexión

   def insertarCompra(self, precio, estado, usuario, transaccion, oferta):
      self.conectarBaseDeDatos()

      # Define el query de inserción
      sql = f"insert into Compra values(null,{precio},{estado},'{usuario}',{transaccion},{oferta});"

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

   ### Actualizar los datos de un usuario ###
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

   ### Consultar todos los productos y servicios ###
   def consultarTodo_Producto_Servicio(self):
       self.conectarBaseDeDatos()

       sql = f"(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta,\n" \
             f"o.precioOferta,'-' as Lugar,p.cantidadProducto,p.imagenProducto as imagen from Oferta as o,Producto as p\n" \
             f"where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0)union\n" \
             f"(select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta,\n" \
             f"o.precioOferta,s.lugarServicio,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s\n" \
             f"where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1);"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- PRODUCTOS y SERVICIOS ----")
       for fila in resultado:
           print(fila)

       self.db.close()  # Cierra la conexión

   ### Consultar todos los productos ###
   def consultarTodo_Producto(self):
      self.conectarBaseDeDatos()

      sql = f"select *,'Producto' as tipo from Oferta as o,Producto as p\n " \
            f"where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0;"
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute(sql)
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- PRODUCTOS ----")
      for fila in resultado:
         print(fila)
      self.db.close() #Cierra la conexión

   ### Consultar todos los servicios ###
   def consultarTodo_Servicio(self):
      self.conectarBaseDeDatos()

      sql = f"select *,'Servicio' as tipo from Oferta as o,Servicio as s\n" \
            f"where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1;"
      # ejecuta el query SQL para extraer los usuarios
      self.cursor.execute(sql)
      # Recupera los registros de la ejecución
      resultado = self.cursor.fetchall()
      # Ordena el resultado de la ejecucion
      print("\n---- SERVICIOS ----")
      for fila in resultado:
         print(fila)
      self.db.close()  # Cierra la conexión

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
            print(fila)
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
            print(fila)
      except:
         print("Error consulta servicio por usuario")
      self.db.close() #Cierra la conexión

   ### Todas las compras de productos que el usuario ha realizado ###
   def consultarComprasProductoDeUsuario(self, usuario):
       self.conectarBaseDeDatos()
       sql = f"select *,'Producto' as tipo from Oferta as o,Producto as p,Compra as c\n" \
             f"where o.codOferta=p.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='{usuario}';"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- COMPRAS DE PRODUCTOS DEL USUARIO ----")
       for fila in resultado:
           print(fila)
       self.db.close()  # Cierra la conexión

   ### Todas las compras de productos que el usuario ha realizado ###
   def consultarComprasServicioDeUsuario(self, usuario):
       self.conectarBaseDeDatos()
       sql = f"select *,'Servicio' as tipo from Oferta as o,Servicio as s,Compra as c\n " \
             f"where o.codOferta=s.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='{usuario}';"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- COMPRAS DE SERVICIOS DEL USUARIO ----")
       for fila in resultado:
           print(fila)
       self.db.close()  # Cierra la conexión

   ### Consultar Quienes realizaron las compras de los servicios realizados por el usuario ###
   def consultarUsuariosDeServicios(self,usuario):
       self.conectarBaseDeDatos()
       sql = f"SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion," \
             f"Oferta.codOferta,Oferta.nombreOferta,Compra.estadoCompra " \
             f"FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = Oferta.codOferta and Oferta.Usuario_idUsuario='{usuario}') " \
             f"INNER JOIN Producto ON Compra.Oferta_codOferta = Producto.Oferta_codOferta " \
             f"INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- USUARIOS QUE COMPRARON EL SERVICIO ----")
       for fila in resultado:
           print(fila)
       self.db.close()  # Cierra la conexión

       ### Consultar Quienes realizaron las compras de los servicios realizados por el usuario ###

   def consultarUsuariosDeProductos(self, usuario):
       self.conectarBaseDeDatos()
       sql = f"SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario, " \
             f"Oferta.codOferta,Oferta.nombreOferta,Compra.estadoCompra " \
             f"FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = Oferta.codOferta and Oferta.Usuario_idUsuario='{usuario}') " \
             f"INNER JOIN Servicio ON Compra.Oferta_codOferta = Servicio.Oferta_codOferta " \
             f"INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- USUARIOS QUE COMPRARON EL PRODUCTO ----")
       for fila in resultado:
           print(fila)
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
       sql = f"UPDATE Producto SET cantidadProducto={cantidad}\n" \
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

   ### Cambiar el estado de la compra 2	(Aca ya se acualiza el saldo) ###
   def cambiarEstadoCompra(self, compra):
       self.conectarBaseDeDatos()
       # Define el query de inserción
       sql = f"Update Compra SET Compra.estadoCompra=True where Compra.codCompra={compra};\n " \
             f"Update Transaccion as t SET t.estadoTransaccion=True " \
             f"where t.codTransaccion=(select Compra.Transaccion_codTransaccion from Compra as c where  c.codCompra={compra});\n" \
             f"Update Transaccion as t SET t.estadoTransaccion=True \n" \
             f"where t.codTransaccion=(select Compra.Transaccion_codTransaccion from Compra as c where  c.codCompra={compra})+1;"

       # Es necesario en caso de que existan conflictos en la base
       try:
           # Ejecuta el query
           self.cursor.execute(sql)
           # Guarda los cambios en la base
           self.db.commit()
           print("Estado de Compra actualizado")
       except Exception as e:
           # Corrije la inserción en caso de error
           print(e)
           print("Error al actualizar estado de compra")
           self.db.rollback()
       self.db.close()  # Cierra la conexión

   ### Inactivar la oferta ###
   def inactivarOferta(self, oferta):
       self.conectarBaseDeDatos()
       # Define el query de inserción
       sql = f"Update Oferta SET Oferta.estadoOferta=false where Oferta.codOferta='{oferta}';"

       # Es necesario en caso de que existan conflictos en la base
       try:
          # Ejecuta el query
          self.cursor.execute(sql)
          # Guarda los cambios en la base
          self.db.commit()
          print("Oferta inactiva")
       except:
          # Corrije la inserción en caso de error
          print("Error al actualizar estado de oferta")
          self.db.rollback()
       self.db.close() #Cierra la conexión

   ### Activar la oferta ###
   def activarOferta(self, oferta):
       self.conectarBaseDeDatos()
       # Define el query de inserción
       sql = f"Update Oferta SET Oferta.estadoOferta=false where Oferta.codOferta='{oferta}';"

       # Es necesario en caso de que existan conflictos en la base
       try:
           # Ejecuta el query
           self.cursor.execute(sql)
           # Guarda los cambios en la base
           self.db.commit()
           print("Oferta activa")
       except:
           # Corrije la inserción en caso de error
           print("Error al actualizar estado de oferta")
           self.db.rollback()
       self.db.close()  # Cierra la conexión

   ### Consultar las Transacciones de un usuario ###
   def consultarTransaccionUsuario(self, usuario):
       self.conectarBaseDeDatos()
       sql = f"select*from Transaccion where Transaccion.Usuario_idUsuario='{usuario}'"
       # ejecuta el query SQL para extraer los usuarios
       self.cursor.execute(sql)
       # Recupera los registros de la ejecución
       resultado = self.cursor.fetchall()
       # Ordena el resultado de la ejecucion
       print("\n---- TRANSACCIONES DEL USUARIO----")
       for fila in resultado:
           print(fila)
       self.db.close()  # Cierra la conexión


control = controlador(serverDB="jovenesdcberna.co",usuarioDB="devOcean",contraDB="devOceanEconoamigos",base="econoamigos")
####################
## PREUBAS QUERYS ##
####################
#control.verificarUsuario("felipe@gmail.com")
#control.verificarLogin("felipe@gmail.com",12345)
#control.actualizarUsuario("1002549404","Luis","Velasquez","qwerty","3249874577","Eléctrico","Calle 23")
#control.consultarTodo_Producto_Servicio()
#control.consultarTodo_Producto()
#control.consultarTodo_Servicio()
#control.consultarProductosDeUsuario("1002549404");
#control.consultarServiciosDeUsuario("1002549404")
#control.consultarComprasProductoDeUsuario("1002549404")
#control.consultarComprasServicioDeUsuario("1002549404")
#control.consultarUsuariosDeServicios("1002549404")
#control.consultarUsuariosDeProductos("1002549404")
#control.actualizarSaldo("1002549404",2000)
#control.actualizarCantidadProducto(1, 70)
#control.cambiarEstadoCompra(1)
#control.inactivarOferta(1)
#control.activarOferta(1)
#control.consultarTransaccionUsuario("1002549404")

###########################
## PRUEBAS GENERALES     ##
## INSERCION / CONSULTAR ##
###########################

# USUARIO
#control.insertarUsuario('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudiante','2001-01-1',10000,'Cll 434,Villa de Leyva')
#control.consultarUsuario()

# OFERTA
#control.insertarOferta("celular iphone 6","Es un celular bonito",1200000,True,'1002549404');
#control.consultarOferta()

# PRODUCTO
#control.insertarProducto('https://www.google.es/url?sa=dsds',3,1)
#control.consultarProducto()

# SERVICIO
#control.insertarServicio('Sector del norte de Bogotá',1)
#control.consultarServicio()

# TRANSACCIÓN
#control.insertarTransaccion('Recarga', '1002549404', 200000, False)
#control.consultarTransaccion()

# COMRPA
#control.insertarCompra(200000,False,'1002549404',1,1)
#control.consultarCompra()

