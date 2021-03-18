import unittest
from utils.conector import Conector
from utils.conector import DBINFO

class TestConector(unittest.TestCase):

    def test_connection(self):
        self.conn = Conector(DBINFO['host'], DBINFO['user'], DBINFO['password'], DBINFO['database'])
        self.conn.connect()

    def test_query(self):
        self.conn = Conector(DBINFO['host'], DBINFO['user'], DBINFO['password'], DBINFO['database'])
        self.conn.connect()
        query = "SHOW COLUMNS FROM Usuario;"
        result = self.conn.execute_query(query, ())
        print(result)


    def test_close(self):
        self.conn = Conector(DBINFO['host'], DBINFO['user'], DBINFO['password'], DBINFO['database'])
        self.conn.connect()
        self.conn.close()

if __name__ == '__main__':
    unittest.main()
