from app.utils.conector import Conector, DBINFO


class Transaccion:

    def __init__(self, id=None, concepto=None, usuario=None, valor=None, estado=None, idCompra="null"):
        self.id = id
        self.concepto = concepto
        self.usuario = usuario
        self.valor = valor
        self.estado = estado
        self.idCompra = idCompra

    def agregar(self):
        sql = f"insert into Transaccion values(null,'{self.concepto}',{self.valor},{self.estado},'{self.usuario.id}', {self.idCompra});"
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
        res = []
        for fila in result:
            r = {}
            r['id'] = fila[0]
            r['concepto'] = fila[1]
            r['idUsuario'] = fila[2]
            r['precio'] = fila[3]
            r['estado'] = fila[4]
            res.append(r)
        conn.close()
        return res

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

    def consultarIdUsuario(self, oferta):
        sql = f"select Usuario.idUsuario from Oferta, Usuario where Oferta.codOferta={oferta} and Oferta.Usuario_idUsuario= Usuario.idUsuario"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        conn.close()
        return result[0][0]
