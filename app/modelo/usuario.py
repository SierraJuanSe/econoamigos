from hashlib import md5
from app.utils.connection import Connection


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

    def registro(self):
        query = "insert into Usuario values('%s',%s,%s,%s,sha(%s),%s,%s,%s,%s,%s,%s); "
        data = (self.id, self.nombre, self.apellido, self.email, self.password, self.tel, self.fechaNac, self.moneda, self.direccion, self.estadoReferido, self.codBarrio)
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
        query = "insert into Referido values(%s, %s, %s)"
        c = Connection()
        cs = c.getCursor()
        try:
            r = cs.execute(query, (self.codReferido, 100, self.id))
            if r: c.commit()
            c.close()
            return r
        except Exception as e:
            print(e)
            c.close()
            return 0
            
    def existsCodeRef(self, code):
        query = "SELECT * from Referido WHERE codReferido=%s"
        c = Connection()
        cs = c.getCursor("DictCursor")
        cs.execute(query, (code, ))
        c.close()
        return cs.fetchone()

    def ingreso(self):
        query = "SELECT idUsuario, nombreUsuario as nombre, apellidoUsuario as apellido, emailUsuario,\
            telefonoUsuario as telefono, fechaNacUsuario, totalMonedaUsuario, direccion, estadoReferido,\
            Barrio_codBarrio, codReferido from Usuario INNER JOIN Referido on Usuario.idUsuario=Referido.Usuario_idUsuario WHERE emailUsuario=%s AND contraseñaUsuario=sha(%s)"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.email, self.password))
        if r:
            rr = cs.fetchone()
            self.id = rr['idUsuario']
            self.nombre = rr['nombre']
            self.apellido = rr['apellido']
            self.email = rr['emailUsuario']
            self.tel = rr['telefono']
            self.fechaNac = rr['fechaNacUsuario']
            self.moneda = rr['totalMonedaUsuario']
            self.direccion = rr['direccion']
            self.estadoReferido = rr['estadoReferido']
            self.codBarrio = rr['Barrio_codBarrio']
            self.codReferido = rr['codReferido']
            return r
        c.close()
        return False

    def actualizar(self):
        query = "UPDATE Usuario set nombreUsuario=%s, apellidoUsuario=%s, contraseñaUsuario=sha(%s),\
            telefonoUsuario=%s, direccion=%s, Barrio_codBarrio=%s WHERE idUsuario=%s"
        c = Connection()
        cs = c.getCursor()
        try:
            r = cs.execute(query, (self.nombre,self.apellido,self.password, self.tel, self.direccion, self.codBarrio, self.id))
            if r: c.commit()
            c.close()
            return r
        except Exception as e:
            c.close()
            print(e)
            return 0

    def get(self):
        query = "SELECT idUsuario, nombreUsuario as nombre, apellidoUsuario as apellido, emailUsuario,\
            telefonoUsuario as telefono, fechaNacUsuario, totalMonedaUsuario, direccion, estadoReferido,\
            Barrio_codBarrio, codReferido from Usuario INNER JOIN Referido on Usuario.idUsuario=Referido.Usuario_idUsuario WHERE Usuario.idUsuario=%s"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.id, ))
        if r:
            rr = cs.fetchone()
            self.id = rr['idUsuario']
            self.nombre = rr['nombre']
            self.apellido = rr['apellido']
            self.email = rr['emailUsuario']
            self.tel = rr['telefono']
            self.fechaNac = rr['fechaNacUsuario']
            self.moneda = rr['totalMonedaUsuario']
            self.direccion = rr['direccion']
            self.estadoReferido = rr['estadoReferido']
            self.codBarrio = rr['Barrio_codBarrio']
            self.codReferido = rr['codReferido']
            return rr, self.moneda
        return r, 0

    def consultar_codReferido(self):
        query = "SELECT Referido_codReferido as codReferido from Referido WHERE Usuario_idUsuario=%s"
        c = Connection()
        cs = c.getCursor("DictCursor")
        r = cs.execute(query, (self.id, ))
        return cs.fetchone()

    def referirUsuario(self, codref):
        query1 = "insert into Transaccion values(%s,%s,%s,%s,%s,%s);"
        query2 = "update Usuario set estadoReferido=True where idUsuario=%s;"
        c = Connection()
        cs = c.getCursor()
        try:
            cs.execute(query1, (None,'Referido',codref['valorReferido'],True, self.id, None))
            cs.execute(query1, (None,'Bono por Referir',10,True, codref['Usuario_idUsuario'], None))
            cs.execute(query2, (self.id, ))
            c.commit()
            cs.close()
            c.close()
            return True
        except:
            return False
    
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
            elif 'direccionUsuario' in form_data: self.direccion = form_data['direccionUsuario']
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
        self.codReferido = self.nombre.strip()+md5(self.email.encode()).hexdigest()[:10]

    @staticmethod
    def queryAll():
        query = "SELECT * from Usuario INNER JOIN Referido on Usuario.idUsuario=Referido. Usuario_idUsuario"
        cc = Connection().getCursor("DictCursor")
        r = cc.execute(query)
        cc.close()
        if r:
            return cc.fetchall()