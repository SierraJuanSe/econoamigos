import pymysql

DBINFO = {
  'host' : "econoamigos.com",
  'user' : "devOceanDB",
  'password': "devOceanEconoamigos",
  'database': "econoamigosBD"
}

class Connection(object):
  _connection = None

  def __init__(self):
    self.host = DBINFO['host']
    self.user = DBINFO['user']
    self.password = DBINFO['password']
    self.database = DBINFO['database']
    self.conn = pymysql.connect(
      host=self.host, 
      user=self.user, 
      password=self.password, 
      database=self.database
    )

  def __new__(cls, *args, **kwargs):
    if cls._connection is None:
      cls._connection = super(Connection, cls).__new__(cls)
    return cls._connection

  def connect(self):
    if not self.isOpen():
      self.conn.ping()

  def close(self):
    if self.isOpen():
      self.conn.close()

  def commit(self):
    if self.isOpen():
      print("Hago el commit")
      self.conn.commit()

  def rollblack(self):
    if self.isOpen():
      self.conn.rollback()

  def isOpen(self):
    return self.conn.open

  def getCursor(self, c="Cursor"):
    cc = {
      "Cursor": None,
      "SSCursor": pymysql.cursors.SSCursor,
      "DictCursor": pymysql.cursors.DictCursor,
      "SSDictCursor": pymysql.cursors.SSDictCursor
    }
    if not self.isOpen():
      self.connect()
    return self.conn.cursor(cc[c])

if __name__ == '__main__':
  c1 = Connection()
  c2 = Connection()
  print(c1.isOpen())
  c1.close()
  print(c2.isOpen())
  c2.connect()
  print(c1.isOpen())
  cc = c1.getCursor("DictCursor")
  print(cc)
