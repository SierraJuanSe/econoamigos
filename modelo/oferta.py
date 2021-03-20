import sys  
sys.path.append(r"C:\Users\micha\OneDrive\Documentos\7 Semestre\Paralela\C C++\econo-prieteni\utils")

from abc import ABCMeta, abstractmethod
from conector import Conector, DBINFO

class Oferta(metaclass=ABCMeta):

    def __init__(self,nombre,descripcion,precio,estado,idUsuario):
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.estado = estado
        self.idUsuario = idUsuario

    @abstractmethod
    def agregar(self):
        pass

    @abstractmethod
    def ocultar(self):
        pass

    @abstractmethod
    def modificar(self):
        pass

    @abstractmethod
    def consultaIndividual(self):
        pass

    def consultarOfertas(self,busqueda):
        #aux = r"%"+busqueda+r"%"
        sql = f"(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta, o.precioOferta,o.Usuario_idUsuario,'-' as Lugar,p.cantidadProducto,p.imagenProducto as imagen from Oferta as o,Producto as p where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0 and (o.nombreOferta like '%{busqueda}%' or o.descripcionOferta like '%{busqueda}%'))union all (select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta, o.precioOferta,o.Usuario_idUsuario,s.lugarServicio,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1 and (o.nombreOferta like '%{busqueda}%' or o.descripcionOferta like '%{busqueda}%'));"
        conn = Conector(DBINFO['host'], DBINFO['user'],
                        DBINFO['password'], DBINFO['database'])
        conn.connect()
        result = conn.execute_query(sql,None)
        conn.close()
        return result