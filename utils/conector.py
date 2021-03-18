import pymysql


class Conector:

    def __init__(self, host=None, user=None, password=None, database=None):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def connect(self):
        self.connection = pymysql.connect(
            host=self.host, user=self.user, password=self.password, database=self.database)

    def execute_query(self, query, data=()):
        c = self.get_cursor()
        c.execute(query, data)
        return c.fetchall()

    def commit_change(self):
        self.connection.commit()

    def get_cursor(self):
        return self.connection.cursor()

    def close(self):
        self.connection.close()
