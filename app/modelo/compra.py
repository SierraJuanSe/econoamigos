
from app.utils.conector import Conector, DBINFO


class Compra:
    def __init__(self, id=None, precio=None, estado=None, usuario=None, cod_oferta=None):
        self.id = id
        self.precio = precio
        self.estado = estado
        self.usuario = usuario
        self.cod_oferta = cod_oferta

    def agregar(self):
        sql = f"insert into Compra values(null,{self.precio},{self.estado},{self.cod_oferta},'{self.usuario.id}');"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        cursor = conn.get_cursor()
        y = cursor.execute(sql)
        if y:
            self.id = cursor.lastrowid
            conn.commit_change()
            return True
        conn.close()

    def consultar_ofertas_compradas(self):
        sql = f"select *, Compra.codCompra from Oferta,Compra where Oferta.codOferta=Compra.Oferta_codOferta and Compra.Usuario_idUsuario='{self.usuario.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'], DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        res = []
        for fila in result:
            r = {}
            r['codOferta'] = fila[0]
            r['tipo'] = fila[1]
            r['nombreOferta'] = fila[2]
            r['descripcion'] = fila[3]
            r['precio'] = fila[4]
            r['estado'] = fila[5]
            r['lugar'] = fila[6]
            r['imagen'] = fila[7]
            r['codCompra'] = fila[-1]
            res.append(r)
        conn.close()
        return res

    def consultar_ofertas_vendidas(self):
        # Consultar Quienes realizaron las compras de los Productos realizados por el usuario
        sql = f"SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion, " \
              f"Oferta.codOferta,Oferta.nombreOferta,Compra.estadoCompra, Oferta.precioOferta " \
              f"FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = Oferta.codOferta and Oferta.Usuario_idUsuario='{self.usuario.id}') " \
              f"INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        res = []
        conn.connect()
        result = conn.execute_query(sql)
        try:
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
                 r['precio'] = fila[9]
                 res.append(r)

        except:
            pass
        conn.close()
        return res

    def actualizar_estado(self):
        sql = f"Update Compra SET Compra.estadoCompra=True where Compra.codCompra={self.id};"
        sql2 = f"Update Transaccion as t SET t.estadoTransaccion=True where t.Compra_codCompra={self.id};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.execute_query(sql2)
        conn.commit_change()
        conn.close()
        return True
