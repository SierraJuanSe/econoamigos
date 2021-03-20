import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\modelo")

import unittest
from producto import Producto


class TestOferta(unittest.TestCase):

    def test_consulta(self):
        p = Producto('Juan', 'Coco','3200',None,'1001167424',None,3)
        print(p.consultarOfertas('Celular'))

if __name__ == '__main__':
    unittest.main()