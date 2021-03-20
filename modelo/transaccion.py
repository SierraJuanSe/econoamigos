from utils.conector import Conector, DBINFO


class Transaccion:

    def __init__(self, id, concepto, usuario, valor, estado):
        self.id = id
        self.concepto = concepto
        self.usuario = usuario
        self.estado = estado

    def agregar(self):
        sql = f"insert into Transaccion values(null,'{self.concepto}','{self.usuario.id}',{self.valor}, {self.estado});"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def transacciones_usuario(self):
        sql = f"select * from Transaccion where Transaccion.Usuario_idUsuario='{self.usuario.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)

        conn.close()
        return result

    def actualizar_estado(self, compra):
        sql =  f"Update Transaccion as t SET t.estadoTransaccion=True where t.codTransaccion=(select c.Transaccion_codTransaccion from Compra as c where  c.codCompra={compra.id});"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        sql =  f"Update Transaccion as t SET t.estadoTransaccion=True where t.codTransaccion=(select c.Transaccion_codTransaccion from Compra as c where  c.codCompra={compra.id})+1;"
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True
