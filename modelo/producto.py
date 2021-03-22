from modelo.oferta import Oferta
from utils.conector import Conector, DBINFO

class Producto(Oferta):

    def __init__(self,nombre=None,descripcion=None,precio=None,estado=None,idUsuario=None,imagen=None,cantidad=None):
        Oferta.__init__(self,nombre,descripcion,precio,estado,idUsuario)
        self.imagen = imagen
        self.cantidad = cantidad

    def agregar(self):
        sql = f"insert into Oferta values('{None}','{self.nombre}','{self.descripcion}','{self.precio}','{self.estado}','{self.idUsuario}');"
        sql2 = f"insert into Producto values('{self.imagen}','{self.cantidad}',LAST_INSERT_ID());"        
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.execute_query(sql2)
        conn.commit_change()
        conn.close()
        return True

    def ocultar(self):
        pass

    def modificar(self):
        pass

    def consultaIndividual(self,cod):
        sql = f"select * from Oferta where codOferta='{cod}';"
        sql2 = f"select * from Producto where Oferta_codOferta='{cod}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        result2 = conn.execute_query(sql2)
        r1 = {}
        for fila in result:
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['idUsuario'] = fila[5]

        for fila in result2:
            r1['imagen'] = fila[0]
            r1['cantidad'] = fila[1]
        else:
            r1 = {}
        conn.close()
        return r1
