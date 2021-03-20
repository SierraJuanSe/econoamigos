import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\modelo")

import unittest
from servicio import Servicio


class TestServicio(unittest.TestCase):

    def test_agregar(self):
        s = Servicio('Prueba', 'Coco','3200',None,'1002549404',"Jamaica")
        s.agregar()

if __name__ == '__main__':
    unittest.main()