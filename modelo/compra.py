from utils.conector import Conector, DBINFO

class Compra:
    def __init__(self, id=None, precio=None, estado=None, usuario=None, cod_transaccion=None, cod_oferta=None):
        self.id = id
        self.precio = precio
        self.estado = estado
        self.usuario = usuario
        self.cod_transaccion = cod_transaccion
        self.cod_oferta = cod_oferta

    
    def agregar(self):
        sql = f"insert into Compra values(null,f{self.precio},{self.estado},'{self.usuario.id}',{self.cod_transaccion},{self.cod_oferta});"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    
    def consultar_productos_comprados(self):
        sql = f"select *,'Producto' as tipo from Oferta as o,Producto as p,Compra as c where o.codOferta=p.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='{self.usuario.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        res = []
        for fila in result:
            r = {}
            r['id'] = fila[0]
            r['precio'] = fila[1]
            r['estado'] = fila[2]
            r['idUsuario'] = fila[3]
            r['codTransacion'] = fila[4]
            r['codOferta'] = fila[5]
            res.append(r)
        conn.close()
        return res

    def consultar_servicios_comprados(self):
        sql = f"select *,'Servicio' as tipo from Oferta as o,Servicio as s,Compra as c where o.codOferta=s.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='{self.usuario.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        conn.close()
        return result
        # res = []
        # for fila in result:
        #     r = {}
        #     r['id'] = fila[0]
        #     r['precio'] = fila[1]
        #     r['estado'] = fila[2]
        #     r['idUsuario'] = fila[3]
        #     r['codTransacion'] = fila[4]
        #     r['codOferta'] = fila[5]
        #     res.append(r)
        # conn.close()
        # return res

    def consulta_productos_venidios(self):
        # Consultar Quienes realizaron las compras de los Productos realizados por el usuario
        sql = "SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion, \
            oferta.codOferta,oferta.nombreOferta,Compra.estadoCompra \
            FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario='{}') \
            INNER JOIN Producto ON Compra.Oferta_codOferta = Producto.Oferta_codOferta \
            INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
        sql = sql.format(self.usuario.id)
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        conn.close()
        return result

    def consulta_servicios_vendidos(self):
        # Consultar Quienes realizaron las compras los servicios realizados por el usuario 978676
        sql = "SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario, \
            oferta.codOferta,oferta.nombreOferta,Compra.estadoCompra \
            FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario='{}') \
            INNER JOIN Servicio ON Compra.Oferta_codOferta = Servicio.Oferta_codOferta \
            INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
        sql = sql.format(self.usuario.id)
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        conn.close()
        return result

    def actualizar_estado(self):
        sql = f"Update Compra SET Compra.estadoCompra=True where Compra.codCompra={self.id};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.close()
        return True
