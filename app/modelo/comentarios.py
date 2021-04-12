from app.utils.conector import Conector, DBINFO

class Comentario:

    def __init__(self,descripcionComentario="",respuestaComentario="",Oferta_codOferta="",Usuario_idUsuario=""):
        self.descripcionComentario = descripcionComentario
        self.respuestaComentario = respuestaComentario
        self.Oferta_codOferta = Oferta_codOferta
        self.Usuario_idUsuario = Usuario_idUsuario

    def agregarComentario(self):
        sql = f"insert into Comentario values(null,'{self.descripcionComentario}',DATE_FORMAT(NOW( ), '%H:%i:%S')," \
              f"'{self.respuestaComentario}','{self.Oferta_codOferta}','{self.Usuario_idUsuario}');"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True

    def consultarComentarios(self):
        sql = f"select*from Comentario where Oferta_codOferta='{self.Oferta_codOferta}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql)
        r1 = {}
        for fila in result:
            r1['codComentario'] = fila[0]
            r1['descripcion'] = fila[1]
            r1['hora'] = fila[2]
            r1['respuesta'] = fila[3]
            r1['codOferta'] = fila[4]
            r1['idUsuario'] = fila[5]
        conn.close()
        return r1