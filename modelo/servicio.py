import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\utils")
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\modelo")


from modelo.oferta import Oferta
from utils.conector import Conector, DBINFO

class Servicio(Oferta):

    def __init__(self,nombre=None,descripcion=None,precio=None,estado=None,idUsuario=None,lugar=None):
        super().__init__(nombre,descripcion,precio,estado,idUsuario)
        self.lugar = lugar #Zona de cobertura

    def agregar(self):
        self.estado = True
        sql = f"insert into Oferta values('{None}','{self.nombre}','{self.descripcion}','{self.precio}','{self.estado}','{self.idUsuario}');"
        sql2 = f"insert into Servicio values('{self.lugar}',LAST_INSERT_ID());"        
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
        sql2 = f"select * from Servicio where Oferta_codOferta='{cod}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        result2 = conn.execute_query(sql2)
        r1 = {}
        print(result)
        print(result2)
        for fila in result:
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['idUsuario'] = fila[5]

        for fila in result2:
            r1['lugar'] = fila[0]
        else:
            r1 = {}
        conn.close()
        return r1