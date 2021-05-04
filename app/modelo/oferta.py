from app.utils.conector import Conector, DBINFO
from app.utils.connection import Connection

class Oferta:

    def __init__(self,id=None,tipo=None,nombre=None,descripcion=None,precio=None,estado=None,lugarServicio=None,
                 imagenProducto=None,cantidadProducto=None,idUsuario=None,codBarrio=None):
        self.id = id
        self.tipo = tipo
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.estado = estado
        self.lugarServicio = lugarServicio
        self.imagenProducto = imagenProducto
        self.cantidadProducto = cantidadProducto
        self.idUsuario = idUsuario
        self.codBarrio = codBarrio

    def agregarOferta(self):
        query = "insert into Oferta values(null,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        r = None
        data = ()
        if self.tipo == "Producto":
            data = (self.tipo, self.nombre, self.descripcion, self.precio, True, None, self.imagenProducto, self.cantidadProducto, self.idUsuario)
        elif self.tipo == "Servicio":
            data = (self.tipo, self.nombre, self.descripcion, self.precio, True, self.lugarServicio, None, None, self.idUsuario)

        c = Connection()
        r = c.getCursor().execute(query, data)
        if r: c.commit()
        c.close()
        return r
    
    @staticmethod
    def consultarOferta(codOferta):
        query = "SELECT * FROM Oferta WHERE codOferta=%s"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (codOferta, ))
        if r:
            o = Oferta()
            rr = cs.fetchone()
            o.id = rr['codOferta']
            o.tipo = rr['Tipo']
            o.nombre = rr['nombreOferta']
            o.descripcion = rr['descripcionOferta']
            o.precio = rr['precioOferta']
            o.estado = rr['estadoOferta']
            o.lugarServicio = rr['lugarServicio']
            o.imagenProducto = rr['imagenProducto']
            o.cantidadProducto = rr['cantidadProducto']
            o.idUsuario =  rr['Usuario_idUsuario']
            return o


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

    def consultarTodaOferta(self):
        sql = f"select*from Oferta where (cantidadProducto >0 or cantidadProducto is null) and Usuario_idUsuario!={self.idUsuario};"
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
            r1['idUsuario'] = fila[5]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def consultarMisOfertas(self):
        query = "select * from Oferta where (cantidadProducto >0 or cantidadProducto is null) and Usuario_idUsuario=%s"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.idUsuario,))
        return cs.fetchall()
    
    def consultarOfertasMiBarrio(self):
        sql = f"SELECT * FROM Oferta as o INNER JOIN Usuario as u ON u.idUsuario=o.Usuario_idUsuario where u.Barrio_CodBarrio={self.codBarrio} and Usuario_idUsuario!={self.idUsuario};"
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
            r1['idUsuario'] = fila[5]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def to_dict(self):
        return {
            "id": self.id,
            "tipo": self.tipo,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "estado": self.estado,
            "lugar": self.lugarServicio,
            "imagen": self.imagenProducto,
            "cantidad": self.cantidadProducto,
            "idUsuario": self.idUsuario
        }

    @staticmethod
    def queryAll():
        query = "SELECT * from Oferta"
        cc = Connection().getCursor("DictCursor")
        r = cc.execute(query)
        cc.close()
        if r:
            return cc.fetchall()