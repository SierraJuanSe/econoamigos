import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\utils")
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\modelo")

from oferta import Oferta
from conector import Conector, DBINFO

class Producto(Oferta):

    def __init__(self,nombre,descripcion,precio,estado,idUsuario,imagen,cantidad):
        super().__init__(nombre,descripcion,precio,estado,idUsuario)
        self.imagen = imagen
        self.cantidad = cantidad

    def agregar(self):
        self.estado = True
        self.imagen = 'imagen'
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
        conn.close()
        return result, result2
