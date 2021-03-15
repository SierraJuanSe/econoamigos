#!/usr/bin/python3
import pymysql

def consultarUsuario():
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # ejecuta el query SQL para extraer los usuarios
   cursor.execute("SELECT * from Usuario")
   # Recupera los registros de la ejecución
   resultado = cursor.fetchall()
   # Ordena el resultado de la ejecucion
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
      # Imprime cada fila
      print (f"ID: {id}, Nombre: {nombre} {apellido}, Correo: {correo}, Contra: {contra},\n"
             f"Celular: {celular}, Ocupación: {ocupacion},\n"
             f"Fecha: {fecha}', Total Moneda:{moneda}")
   db.close() #Cierra la conexión

def insertarUsuario(id, nombre, apellido, correo, contra, celular, ocupacion, fecha, moneda):
   # Establece la conexion con la base de datos
   db = pymysql.connect("sql10.freemysqlhosting.net", "sql10399086", "SvQc25Xr7V", "sql10399086")
   # Genera el cursor para ejecutar sentencias
   cursor = db.cursor()

   # Define el query de inserción
   sql = f"insert into Usuario values('{id}','{nombre}','{apellido}','{correo}',sha('{contra}'),'{celular}','{ocupacion}'," \
         f"'{fecha}','{moneda}'); "

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

#insertarUsuario('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudiante','2001-01-1',10000)
consultarUsuario()



