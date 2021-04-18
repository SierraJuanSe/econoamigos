from app.utils.conector import Conector, DBINFO


class Usuario:
    def __init__(self, id=None, nombre=None, apellido=None, email=None, password=None):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.email = email
        self.password = password
        self.tel = None
        self.ocupacion = None
        self.fechaNac = None
        self.moneda = 0
        self.direccion = None

    def registro(self):
        if not self.existe_email():
            sql = f"insert into Usuario values('{self.id}','{self.nombre}','{self.apellido}','{self.email}',sha('{self.password}'),'{self.tel}','{self.ocupacion}', '{self.fechaNac}','{self.moneda}','{self.direccion}'); "
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
            self.ocupacion = result[0][6]
            self.fechaNac = result[0][7]
            self.moneda = result[0][8]
            self.direccion = result[0][9]
            return True
        return False

    def actualizar(self):
        sql = f"update Usuario as u set u.nombreUsuario='{self.nombre}',u.apellidousuario='{self.apellido}'," \
              f"u.contraseñaUsuario=sha('{self.password}'),u.telefonoUsuario='{self.tel}'," \
              f"u.ocupacionUsuario='{self.ocupacion}',u.direccion='{self.direccion}' " \
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
                r['ocupacion'] = result[0][6]
                r['direccion'] = result[0][9]
        except:
            pass
        conn.close()
        return r, result[0][8]

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
