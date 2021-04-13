from app.utils.conector import Conector, DBINFO
from datetime import datetime

class Comentario:

    def __init__(self,descripcionComentario="",respuestaComentario="",Oferta_codOferta="",Usuario_idUsuario=""):
        self.descripcionComentario = descripcionComentario
        self.respuestaComentario = respuestaComentario
        self.Oferta_codOferta = Oferta_codOferta
        self.Usuario_idUsuario = Usuario_idUsuario

    def agregarComentario(self):
        aux = datetime.now()
        horaComentario = str(aux.hour)+":"+str(aux.minute)+":"+str(aux.second)
        sql = f"insert into Comentario values('{None}','{self.descripcionComentario}','{horaComentario}','{self.respuestaComentario}','{self.Oferta_codOferta}','{self.Usuario_idUsuario}');"
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
        r = []
        for fila in result:
            r1 ={}
            r1['codComentario'] = fila[0]
            r1['descripcion'] = fila[1]
            r1['hora'] = str(fila[2])
            r1['respuesta'] = fila[3]
            r1['codOferta'] = fila[4]
            r1['idUsuario'] = fila[5]
            r.append(r1)
        conn.close()
        return r

    def agregarRespuesta(self, comentario):
        sql = f"update Comentario set respuestaComentario= '{self.respuestaComentario}' where codComentario='{comentario}';"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        conn.execute_query(sql)
        conn.commit_change()
        conn.close()
        return True