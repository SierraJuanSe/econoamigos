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
        sql = f"insert into Compra values(null,{self.precio},{self.estado},'{self.usuario.id}',(SELECT MAX(codTransaccion) from Transaccion)-1,{self.cod_oferta});"
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
            r['codCompra'] = fila[8]
            r['nombreOferta'] = fila[1]
            r['descripcion'] = fila[2]
            r['tipo'] = "Producto"
            r['precio'] = fila[3]
            r['estado'] = fila[11]
            r['lugar'] =  ""
            r['imagen'] = fila[6]
            res.append(r)
        conn.close()
        return res

    def consultar_servicios_comprados(self):
        sql = f"select *,'Servicio' as tipo from Oferta as o,Servicio as s,Compra as c where o.codOferta=s.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='{self.usuario.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        res = []
        for fila in result:
            r = {}
            r['codCompra'] = fila[8]
            r['nombreOferta'] = fila[1]
            r['descripcion'] = fila[2]
            r['tipo'] = "Servicio"
            r['precio'] = fila[3]
            r['estado'] = fila[10]
            r['lugar'] = fila[6]
            r['imagen'] = ""
            res.append(r)
        conn.close()
        return res

    def consulta_productos_vendidos(self):
        # Consultar Quienes realizaron las compras de los Productos realizados por el usuario
        sql = "SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion, Oferta.codOferta,Oferta.nombreOferta,Compra.estadoCompra FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = Oferta.codOferta and Oferta.Usuario_idUsuario='{}') INNER JOIN Producto ON Compra.Oferta_codOferta = Producto.Oferta_codOferta INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
        sql = sql.format(self.usuario.id)
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        res = []
        try:
            conn.connect()
            result = conn.execute_query(sql)
            for fila in result:
                 r = {}
                 r['codCompra'] = fila[0]
                 r['id'] = fila[1]
                 r['nombre'] = fila[2]
                 r['apellido'] = fila[3]
                 r['telefono'] = fila[4]
                 r['direccion'] = fila[5]
                 r['oferta'] = fila[7]
                 r['estado'] = fila[8]
                 res.append(r)
        except:
            pass
        conn.close()
        return res

    def consulta_servicios_vendidos(self):
        # Consultar Quienes realizaron las compras los servicios realizados por el usuario 978676
        sql = "SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario, Usuario.direccion, Oferta.codOferta,Oferta.nombreOferta,Compra.estadoCompra FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = Oferta.codOferta and Oferta.Usuario_idUsuario='{}') INNER JOIN Servicio ON Compra.Oferta_codOferta = Servicio.Oferta_codOferta INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
        sql = sql.format(self.usuario.id)
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        res = []
        for fila in result:
            r = {}
            r['codCompra'] = fila[0]
            r['id'] = fila[1]
            r['nombre'] = fila[2]
            r['apellido'] = fila[3]
            r['telefono'] = fila[4]
            r['direccion'] = fila[5]
            r['oferta'] = fila[7]
            r['estado'] = fila[8]
            res.append(r)
        conn.close()
        return res

    def actualizar_estado(self):
        print(self.id)
        sql = f"Update Compra SET Compra.estadoCompra=True where Compra.codCompra={self.id};"
        sql2 = f"Update Transaccion as t SET t.estadoTransaccion=True where t.codTransaccion=(select c.Transaccion_codTransaccion from Compra as c where  c.codCompra={self.id});"
        sql3 = f"Update Transaccion as t SET t.estadoTransaccion=True where t.codTransaccion=(select c.Transaccion_codTransaccion from Compra as c where  c.codCompra={self.id})+1;"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.execute_query(sql2)
        conn.commit_change()
        conn.execute_query(sql3)
        conn.commit_change()
        conn.close()
        return True
