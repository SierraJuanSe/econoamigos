import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\utils")

from abc import ABCMeta, abstractmethod
from app.utils.conector import Conector, DBINFO

class Oferta:

    def __init__(self,nombre="",descripcion="",precio="",estado="",idUsuario=""):
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.estado = estado
        self.idUsuario = idUsuario

    def consultarOfertaEspecifica(self,busqueda):
        sql = f"(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta," \
              f"o.precioOferta,o.Usuario_idUsuario,'-' as Lugar,p.cantidadProducto,p.imagenProducto as imagen from Oferta as o,Producto as p " \
              f"where o.codOferta=p.Oferta_codOferta and p.cantidadProducto>0 and o.Usuario_idUsuario!= '{self.idUsuario}' and (o.nombreOferta like '%{busqueda}%' or o.descripcionOferta like '%{busqueda}%')) " \
              f"union " \
              f"(select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta, o.precioOferta,o.Usuario_idUsuario,s.lugarServicio,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s " \
              f"where o.codOferta=s.Oferta_codOferta and o.Usuario_idUsuario!='{self.idUsuario}' and (o.nombreOferta like '%{busqueda}%' or o.descripcionOferta like '%{busqueda}%'));"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, None)
        respuesta = []
        for fila in result:
            r1 = {}
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['idUsuario'] = fila[5]
            r1['lugar'] = fila[6]
            r1['cantidad'] = fila[7]
            r1['imagen'] = fila[8]
            respuesta.append(r1)
        conn.close()
        return respuesta

    def consultarTodaOferta(self):
        sql = f"(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta,\n" \
              f"o.precioOferta,o.Usuario_idUsuario as id,'-' as Lugar,p.cantidadProducto as cantidad,p.imagenProducto as imagen from Oferta as o,Producto as p\n" \
              f"where o.codOferta=p.Oferta_codOferta and o.Usuario_idUsuario!={self.idUsuario} and p.cantidadProducto>0)union\n" \
              f"(select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta,\n" \
              f"o.precioOferta,o.Usuario_idUsuario as id,s.lugarServicio as Lugar,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s\n" \
              f"where o.codOferta=s.Oferta_codOferta and o.Usuario_idUsuario!={self.idUsuario});"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql, None)
        respuesta = []
        for fila in result:
            r1 = {}
            r1['id'] = fila[0]
            r1['tipo'] = fila[1]
            r1['nombre'] = fila[2]
            r1['descripcion'] = fila[3]
            r1['precio'] = fila[4]
            r1['idUsuario'] = fila[5]
            r1['lugar'] = fila[6]
            r1['cantidad'] = fila[7]
            r1['imagen'] = fila[8]
            respuesta.append(r1)
        conn.close()
        return respuesta
