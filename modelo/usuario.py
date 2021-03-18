class Usuario:
    def __init__(self, id=None, nombres=None, apellidos=None, email=None,
                contrasena=None, celular=None, fechaNacimiento=None, ocupacion=None,
                totalMoneda=None):
        self.id = id
        self.nombres = nombres
        self.apellidos = apellidos
        self.email = email
        self.contrasena = contrasena
        self.celular = celular
        self.fechaNacimiento = fechaNacimiento
        self.totalMoneda = self.totalMoneda
        self.ofertas = []
        self.compras = []
        self.transacciones = []

    def registro(self):
        pass

    def ingreso(self):
        pass

    def consulta(self):
        pass

    def consulta_ofertas(self):
        pass

    def consulta_compras(self):
        pass

    def consulta_transacciones(self):
        pass

    def actualizar(self):
        pass

    def borrar(self):
        pass
