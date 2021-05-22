import unittest
from app.utils.conector import Conector
from app.utils.conector import DBINFO


class TestConector(unittest.TestCase):

    def test_connection(self):
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()

    def test_query(self):
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        query = 'select * from Usuario'
        result = conn.execute_query(query, ())
        print(result)

    def test_close(self):
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.close()


if __name__ == '__main__':
    unittest.main()
