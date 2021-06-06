
from app.utils.conector import Conector, DBINFO
from app.utils.connection import Connection


class Compra:

    def __init__(self, id=None, ofertaCambio=None, precio=None,fechaEnvio=None,cod_oferta=None,usuario=None,estado=None):
        self.id = id
        self.ofertaCambio = ofertaCambio
        self.precio = precio
        self.fechaEnvio = fechaEnvio
        self.cod_oferta = cod_oferta
        self.usuario = usuario
        self.estado = estado
    

    def agregar(self):
        query = "insert into Compra values(null,%s,%s,null,%s,%s,%s);"
        c = Connection()
        cs = c.getCursor()
        r = cs.execute(query, (self.ofertaCambio, self.precio, None, self.cod_oferta, self.usuario.id, 1))
        if r:
            self.id = cs.lastrowid
            c.commit()
        c.close()
        return r

    def consultar_compras_realizadas_a_un_usuario(self):
        query ="SELECT Compra.codCompra,Compra.ofertacambio,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion,\
        oferta.codOferta,oferta.nombreOferta,EstadoCompra_codEstadoCompra, compra.fechaEnvio\
        FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario={%s})\
        INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.usuario.id, ))
        rr = cs.fetchall()
        c.close()
        return rr

    def consultar_ofertas_compradas(self):
        sql = """select codOferta, Tipo as tipo, nombreOferta, descripcionOferta as descripcion, precioOferta as precio, precioOferta as precio, 
        lugarServicio as lugar, imagenProducto as imagen, cantidadProducto as cantidad, Oferta.Usuario_idUsuario as destinatario, Compra.codCompra as codCompra
        from Oferta,Compra where Oferta.codOferta=Compra.Oferta_codOferta and Compra.Usuario_idUsuario=%s;"""
        cc = Connection().getCursor("DictCursor")
        cc.execute(sql, (self.usuario.id, ))
        cc.close()
        return cc.fetchall()

    def consultar_ofertas_vendidas(self):
        # Consultar Quienes realizaron las compras de los Productos realizados por el usuario
        query = "SELECT Compra.codCompra,(select nombreOferta FROM Oferta where codOferta=Compra.ofertaCambio) as nombreOfertaCambio,\
            Usuario.idUsuario as destinatario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion,\
            Oferta.codOferta,Oferta.nombreOferta,Compra.estadoCompra,Compra.precioCompra\
            FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = Oferta.codOferta and \
            Oferta.Usuario_idUsuario=%s) INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario)" 
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.usuario.id, ))
        rr = cs.fetchall()
        c.close()
        return rr
        
    #
    # Cabiar estados cuando se compra por economonedas
    #

    def vendedor_confirmado_eco(self):
        sql = f"Update Compra SET EstadoCompra_codEstadoCompra=2 where Compra.codCompra={self.id};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True


    #
    # Cabiar estados cuando se compra por intercambio
    #

    def vendedor_confirmado_int(self):

        sql = f"Update Compra SET EstadoCompra_codEstadoCompra=2 where Compra.codCompra={self.id};"
        sql2 = f"select Usuario_idUsuario from Oferta where codOferta={self.ofertaCambio};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()

        cs = conn.getCursor("DictCursor")
        r = cs.execute(sql2)
        if r:
            rr = cs.fetchone()
            self.usuario = rr['Usuario_idUsuario']

        sql3 = f"insert into Compra values(null,{self.ofertaCambio},null,null,{self.cod_oferta},{self.usuario},2);"
        conn.execute_query(sql3)
        conn.commit_change()
        conn.close()
        return True

    #
    # Cabiar estados cuando se compra (tanto para ecomonedas como para intercambio)
    #

    def vendedor_enviado(self):
        sql = f"Update Compra SET EstadoCompra_codEstadoCompra=3,fechaEnvio=now() where Compra.codCompra={self.id};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def comprador_recibido(self):
        sql = f"Update Compra SET EstadoCompra_codEstadoCompra=4 where Compra.codCompra={self.id};"
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

    ###############################################


    def no_aceptar_intercambio(self):
        sql = f"Delete from Compra where codCompra={self.id};"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    @staticmethod
    def queryAll():
        query = "SELECT * from Compra"
        cc = Connection().getCursor("DictCursor")
        r = cc.execute(query)
        cc.close()
        if r:
            return cc.fetchall()
