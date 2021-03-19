import unittest
from modelo.usuario import Usuario


class TestUsuario(unittest.TestCase):

    def test_registro(self):
        u = Usuario('1001167424', 'Juan', 'Sierra',
                    'juan@mail.com', 'pass1234')
        u.moneda = 50000
        u.ocupacion = 'Devp'
        u.tel = '3133634562'
        u.fechaNac = '2000-06-09'
        u.direccion = 'Calle 182'
        self.assertFalse(u.registro())

    def test_existe_usuario(self):
        u = Usuario(email='felipe@gmail.com')
        nu = Usuario(email='noExsite@mail.com')
        self.assertTrue(u.existe_email())
        self.assertFalse(nu.existe_email())

    def test_login_usaurio(self):
        u = Usuario(email='juan@mail.com', password='pass1234')
        nu = Usuario(email='noExsite@mail.com', password='1234')
        self.assertTrue(u.ingreso())
        self.assertFalse(nu.ingreso())


if __name__ == '__main__':
    unittest.main()
