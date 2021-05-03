from app.utils.conector import Conector, DBINFO
from app.utils.conection import Connection


class Usuario:
    def __init__(self, id=None, nombre=None, apellido=None, email=None, password=None, codBarrio=None):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.email = email
        self.password = password
        self.tel = None
        self.fechaNac = None
        self.moneda = 0
        self.direccion = None
        self.estadoReferido = False
        self.codBarrio = codBarrio
        self.codReferido = None

    def registro(self):
        query = f"insert into Usuario values('{self.id}','{self.nombre}','{self.apellido}','{self.email}',sha('{self.password}'),'{self.tel}','{self.fechaNac}','{self.moneda}','{self.direccion}','{self.estadoReferido}','{self.codBarrio}','{self.codReferido}'); "
        c = Connection()
        cs = c.getCursor()
        r = cs.execute(query)
        if r:
            c.commit()
        c.close()
        return r
        
    def existsUser(self):
        query = "SELECT * from Usuario WHERE emailUsuario=%s OR idUsuario=%s"
        cc = Connection().getCursor("DictCursor")
        r = cc.execute(query, (self.email, self.id))
        cc.close()
        if r:
            return cc.fetchone()

    def registroCodigo(self):
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        sql = f"insert into Referido values('{self.codReferido}',1000);"
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()

    def ingreso(self):
        sql = f"select * from Usuario as u where u.emailUsuario='{self.email}' && u.contraseñaUsuario=sha('{self.password}');"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        conn.close()
        if result:
            self.id = result[0][0]
            self.nombre = result[0][1]
            self.apellido = result[0][2]
            self.tel = result[0][5]
            self.fechaNac = result[0][6]
            self.moneda = result[0][7]
            self.direccion = result[0][8]
            self.estadoReferido = result[0][9]
            self.codBarrio = result[0][10]
            self.codReferido = result[0][11]
            return True
        return False

    def actualizar(self):
        sql = f"update Usuario as u set u.nombreUsuario='{self.nombre}',u.apellidousuario='{self.apellido}'," \
              f"u.contraseñaUsuario=sha('{self.password}'),u.telefonoUsuario='{self.tel}'," \
              f"u.direccion='{self.direccion}',u.Barrio_codBarrio='{self.codBarrio}' " \
              f"where u.idUsuario='{self.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        try:
            conn.connect()
            conn.execute_query(sql)
            conn.commit_change()
            conn.close()
            return True
        except:
            return False

    def consultar(self):
        sql = f"select * from Usuario as u where u.idUsuario='{self.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        r = {}
        print(result)
        try:
            if result:
                r['nombre'] = result[0][1]
                r['apellido'] = result[0][2]
                r['telefono'] = result[0][5]
                r['direccion'] = result[0][8]
                r['barrio'] = result[0][10]
                r['codigo'] = result[0][11]
        except:
            pass
        conn.close()
        return r, result[0][7]

    def crear_codReferido(self):
        sql = f"insert into Referido values('{self.codReferido}','200'); "
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def consultar_codReferido(self):
        sql = f"select * from Usuario as u where u.idUsuario='{self.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        r = {}
        try:
            if result:
                r['codigo'] = result[0][11]
        except:
            pass
        conn.close()
        return r

    def referirUsuario(self):
        sql = f"SET @sql = (Select idUsuario from Usuario where Referido_codReferido='{self.codReferido}');"
        sql2 = f"insert into Transaccion values(null,'Referido',(select valorReferido from Referido where codReferido='{self.codReferido}'),True,'{self.id}',null);"
        sql3 = f"insert into Transaccion values(null,'Bono por Referir',1000,True,@sql,null);"
        sql4 = f"update Usuario set estadoReferido=True where idUsuario='{self.id}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.execute_query(sql2)
        conn.execute_query(sql3)
        conn.execute_query(sql4)
        conn.commit_change()
        conn.close()
        return True
    
    def from_dict(self, form_data):
        try:
            self.id = int(form_data['idUsuario'])
            self.nombre = form_data['nombreUsuario']
            self.apellido = form_data['apellidoUsuario']
            self.email = form_data['emailUsuario']
            self.password = form_data['passwordUsuario']
            self.codBarrio = form_data['codBarrio']
            self.tel = int(form_data['telefonoUsuario'])
            self.ocupacion = form_data['ocupacionUsuario']
            self.fecha_Nacimiento = form_data['fechaNacimiento']
            self.direccion = form_data['direccion']
            return 1, "OK"
        except ValueError:
            return 0, "VALUE_ERROR"
    
    @staticmethod
    def queryAll():
        query = "SELECT * from Usuario"
        cc = Connection().getCursor("DictCursor")
        r = cc.execute(query)
        cc.close()
        if r:
            return cc.fetchall()
