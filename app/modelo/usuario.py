from hashlib import md5
import random
from app.utils.conector import Conector, DBINFO
from app.utils.connection import Connection, TYPE_CURSOR


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
        query = "insert into Usuario values('%s',%s,%s,%s,sha(%s),%s,%s,%s,%s,%s,%s,%s); "
        data = (self.id, self.nombre, self.apellido, self.email, self.password, self.tel, self.fechaNac, self.moneda, self.direccion, self.estadoReferido, self.codBarrio, self.codReferido)
        c = Connection()
        cs = c.getCursor()
        r = cs.execute(query, data)
        if r: c.commit()
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
        query = "insert into Referido values(%s, 1000)"
        c = Connection()
        cs = c.getCursor()
        try:
            r = cs.execute(query, (self.codReferido,))
            if r: c.commit()
            c.close()
            return r
        except:
            c.close()
            return 0
            
    def existsCodeRef(self):
        query = "SELECT * from Referido WHERE codReferido=%s"
        c = Connection()
        cs = c.getCursor()
        cs.execute(query)
        c.close()
        return cs.fetchone()

    def ingreso(self):
        query = "SELECT * from Usuario WHERE emailUsuario=%s AND contraseñaUsuario=sha(%s)"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.email, self.password))
        if r:
            rr = cs.fetchone()
            self.id = rr['idUsuario']
            self.nombre = rr['nombreUsuario']
            self.apellido = rr['apellidoUsuario']
            self.email = rr['emailUsuario']
            self.tel = rr['telefonoUsuario']
            self.fechaNac = rr['fechaNacUsuario']
            self.moneda = rr['totalMonedaUsuario']
            self.direccion = rr['direccion']
            self.estadoReferido = rr['estadoReferido']
            self.codBarrio = rr['Barrio_codBarrio']
            self.codReferido = rr['Referido_codReferido']
            return r
        c.close()
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

    def get(self):
        query = "SELECT * from Usuario WHERE idUsuario=%s"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.id, ))
        if r:
            rr = cs.fetchone()
            self.id = rr['idUsuario']
            self.nombre = rr['nombreUsuario']
            self.apellido = rr['apellidoUsuario']
            self.email = rr['emailUsuario']
            self.tel = rr['telefonoUsuario']
            self.fechaNac = rr['fechaNacUsuario']
            self.moneda = rr['totalMonedaUsuario']
            self.direccion = rr['direccion']
            self.estadoReferido = rr['estadoReferido']
            self.codBarrio = rr['Barrio_codBarrio']
            self.codReferido = rr['Referido_codReferido']
            del rr["contraseñaUsuario"]
            return rr, self.moneda
        return r, 0

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
            if 'idUsuario' in form_data: self.id = int(form_data['idUsuario'])
            if 'nombreUsuario' in form_data: self.nombre = form_data['nombreUsuario']
            if 'apellidoUsuario' in form_data: self.apellido = form_data['apellidoUsuario']
            if 'emailUsuario' in form_data: self.email = form_data['emailUsuario']
            if 'passwordUsuario' in form_data: self.password = form_data['passwordUsuario']
            if 'codBarrio' in form_data: self.codBarrio = form_data['codBarrio']
            if 'telefonoUsuario' in form_data: self.tel = int(form_data['telefonoUsuario'])
            if 'ocupacionUsuario' in form_data: self.ocupacion = form_data['ocupacionUsuario']
            if 'fechaNacimiento' in form_data: self.fechaNac = form_data['fechaNacimiento']
            if 'direccion' in form_data: self.direccion = form_data['direccion']
            return 1, "OK"
        except ValueError:
            return 0, "VALUE_ERROR"
    
    def create_token(self):
        return {
            'id': self.id, 
            'nombre': self.nombre, 
            'apellido': self.apellido, 
            'telefono': self.tel,
            'codBarrio': self.codBarrio,
            'fecha_Nacimiento': self.fechaNac, 
            'moneda': self.moneda,
            'direccion': self.direccion, 
            'estadoReferido': self.estadoReferido, 
            'codReferido': self.codReferido
        }
    
    def create_codeRef(self):
        self.codReferido = self.nombre+md5(self.email.encode()).hexdigest()[:10]

    @staticmethod
    def queryAll():
        query = "SELECT * from Usuario"
        cc = Connection().getCursor("DictCursor")
        r = cc.execute(query)
        cc.close()
        if r:
            return cc.fetchall()
