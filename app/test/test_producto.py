import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\modelo")

import unittest
from app.modelo.producto import Producto


class TestProducto(unittest.TestCase):

    def test_agregar(self):
        p = Producto('Prueba', 'Coco','3200',None,'1002549404',None,3)
        p.agregar()

if __name__ == '__main__':
    unittest.main()
