from app.utils.conector import Conector, DBINFO

class Oferta:

    def __init__(self,tipo="",nombre="",descripcion="",precio="",estado="",lugarServicio=None,
                 imagenProducto=None,cantidadProducto=None,idUsuario=""):
        self.tipo = tipo
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.estado = estado
        self.lugarServicio = lugarServicio
        self.imagenProducto = imagenProducto
        self.cantidadProducto = cantidadProducto
        self.idUsuario = idUsuario

    def agregarOferta(self):
        sql = ""
        if self.tipo == "Producto":
            sql = f"insert into Oferta values(null,'{self.tipo}','{self.nombre}','{self.descripcion}','{self.precio}'," \
                  f"true,null,'{self.imagenProducto}','{self.cantidadProducto}','{self.idUsuario}');"
        elif self.tipo == "Servicio":
            sql = f"insert into Oferta values(null,'{self.tipo}','{self.nombre}','{self.descripcion}','{self.precio}'," \
                  f"true,'{self.lugarServicio}',null,null,'{self.idUsuario}');"

        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def consultarOfertaEspecificaUsuario(self, codOferta):
        sql = f"select*from Oferta where codOferta='{codOferta}'"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, None)
        respuesta = []
        for fila in result:
            r1 = {}
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['estado'] = fila[5]
            r1['lugar'] = fila[6]
            r1['imagen'] = fila[7]
            r1['cantidad'] = fila[8]
            r1['idUsuario'] = fila[9]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def consultarOfertaEspecifica(self,busqueda):
        sql = f"select*from Oferta where (nombreOferta Like '%{busqueda}%' or descripcionOferta Like '%{busqueda}%') and " \
              f"Usuario_idUsuario != '{self.idUsuario}' " \
              f"and (cantidadProducto >0 or cantidadProducto is null);"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, None)
        respuesta = []
        for fila in result:
            r1 = {}
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['estado'] = fila[5]
            r1['lugar'] = fila[6]
            r1['imagen'] = fila[7]
            r1['cantidad'] = fila[8]
            r1['idUsuario'] = fila[9]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def consultarOfertaEspecificaUsuario(self, codOferta):
        sql = f"select*from Oferta where  codOferta='{codOferta}'"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, None)
        respuesta = []
        for fila in result:
            r1 = {}
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['estado'] = fila[5]
            r1['lugar'] = fila[6]
            r1['imagen'] = fila[7]
            r1['cantidad'] = fila[8]
            r1['idUsuario'] = fila[9]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def consultarTodaOferta(self):
        sql = f"select*from Oferta where (cantidadProducto >0 or cantidadProducto is null) and Usuario_idUsuario!={self.idUsuario};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, None)
        respuesta = []
        for fila in result:
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['estado'] = fila[5]
            r1['lugar'] = fila[6]
            r1['imagen'] = fila[7]
            r1['cantidad'] = fila[8]
            r1['idUsuario'] = fila[9]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def consultarMisOfertas(self):
        sql = f"select * from Oferta where (cantidadProducto >0 or cantidadProducto is null) and Usuario_idUsuario={self.idUsuario};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        respuesta = []
        for fila in result:
            r1 = {}
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['estado'] = fila[5]
            r1['lugar'] = fila[6]
            r1['imagen'] = fila[7]
            r1['cantidad'] = fila[8]
            r1['idUsuario'] = fila[9]
            respuesta.append(r1)
        conn.close()
        return respuesta
