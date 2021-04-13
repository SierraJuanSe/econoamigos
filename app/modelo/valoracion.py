from app.utils.conector import Conector, DBINFO

class Valoracion:

    def __init__(self,valor="",Oferta_codOferta=""):
        self.valor = valor
        self.Oferta_codOferta = Oferta_codOferta

    def agregarValoracion(self):
        sql = f"insert into Valoracion values('{None}','{self.valor}','{self.Oferta_codOferta}');"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def consultarPromedio(self):
        sql = f"select avg(valor) from Valoracion where Oferta_codOferta='{self.Oferta_codOferta}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        conn.close()
        return result