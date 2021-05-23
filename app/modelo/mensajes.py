from app.utils.conector import Conector, DBINFO

class Mensaje:
    def __init__(self, id =None, mensaje=None, receptor=None, emisor=None, compra=None, hora=None):
        self.id = id
        self.mensaje = mensaje
        self.receptor = receptor
        self.emisor = emisor
        self.compra = compra
        self.hora = hora

    def insertarMensaje(self):
        sql = f"insert Into Mensaje values(null,'{self.mensaje}','{self.receptor.id}','{self.emisor.id}',{self.compra.id},'{self.hora}');"
        print(sql)
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def consultarMensaje(self):
        sql = f"select*from Mensaje where Compra_codCompra={self.compra.id};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        r = []
        for fila in result:
            r1 = {}
            r1['codMensaje'] = fila[0]
            r1['desMensaje'] = fila[1]
            r1['destinatario'] = fila[2]
            r1['Usuario_idUsuario'] = fila[3]
            r1['Compra_codCompra'] = fila[4]
            r1['time'] = fila[5]
            r.append(r1)
        conn.close()
        return r