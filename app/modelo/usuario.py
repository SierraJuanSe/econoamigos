from app.utils.conector import Conector, DBINFO


class Usuario:
    def __init__(self, id=None, nombre=None, apellido=None, email=None, password=None, codBarrio=None, codReferido=None):
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
        self.codReferido = codReferido


    def registro(self):
        if not self.existe_email():
            sql = f"insert into Usuario values('{self.id}','{self.nombre}','{self.apellido}','{self.email}',sha('{self.password}'),'{self.tel}','{self.fechaNac}','{self.moneda}','{self.direccion}','{self.estadoReferido}','{self.codBarrio}','{self.codReferido}'); "
            conn = Conector(DBINFO['host'], DBINFO['user'],
                            DBINFO['password'], DBINFO['database'])
            conn.connect()
            conn.execute_query(sql)
            conn.commit_change()
            conn.close()
            return True
        return False

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
            self.codBarrio = result[0][10]
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

    def existe_email(self):
        sql = 'select * from Usuario where `emailUsuario`=%s'
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, (self.email, ))
        conn.close()
        if result:
            return True
        return False

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
        sql3 = f"insert into Transaccion values(null,'Bono por Referir',10,True,@sql,null);"
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
        