#Insertar un usuario
insert into Usuario values('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudinate','2001-01-1',0,'Cll 434,Villa de Leyva');
insert into Usuario values('23789345','Juan','Rodriguez','jaun@gmail.com','1234sas5','345345423','Contador','1991-08-1',0,'Cll 434,Cali');
insert into Usuario values('978676','Lina','Pulido','Lina@gmail.com','fksjdfh','654645','Secretaria','2000-08-1',0,'Cll 12,Bogotá');
insert into Usuario values('333','Juan','Mecanico','Mecanico@gmail.com','vfvfvf','3102765467','Mecanico','2003-04-1',0,'cll 43 n3.2,Bogotá');
select*from usuario;

#Insertar una Oferta de tipo producto
insert into Oferta values(null,'Producto',"celular iphone 6","Es un celular bonito",1200000,true,null,'https//:www.imagen.jpg',10,'1002549404');
insert into Oferta values(null,'Producto',"Mesa de estudio","Es muy comodo",200000,true,null,'https//:www.imagen.jpg',10,'23789345');
insert into Oferta values(null,'Producto',"Mesa de trabajo","Es muy comodo",100000,true,null,'https//:www.imagen.jpg',10,'23789345');
insert into Oferta values(null,'Producto',"Posillos de porcelana","Posillos con tematicas varias",10000,true,null,'https//:www.imagen.jpg',10,'978676');
insert into Oferta values(null,'Producto',"Posillos de porcelana","Posillos con tematicas varias",10000,true,null,'https//:www.imagen.jpg',0,'978676');

Select*from Oferta where tipo='Producto';

#Insertar una Oferta de tipo Servicio
insert into Oferta values(null,'Servicio',"Servicio de niñera","Puedo cuidar a us hijos",40000,true,'Norte de Bogotá',null,null,'978676');
insert into Oferta values(null,'Servicio',"Servicio de carpinteria","Puedo cuidar aarreglar tus muebles",400000,true,'Sur de Bogotá',null,null,'23789345');
insert into Oferta values(null,'Servicio',"Servicio de Mecanica","Puedo arreglar carros y motos",50000,true,'Bogotá',null,null,'333');
insert into Oferta values(null,'Servicio',"Mantenimiento de cocina","Ofrezco el servicio para que su cocina este limpia",100000,true,'Villa de Leyva',null,null,'333');
Select*from Oferta where tipo='Servicio';

#Insertar una Recarga
insert into Transaccion values(null,'Recarga',1200000,true,'1002549404',null);
insert into Transaccion values(null,'Recarga',1100000,true,'23789345',null);
insert into Transaccion values(null,'Recarga',1100000,true,'978676',null);
insert into Transaccion values(null,'Recarga',800000,true,'333',null);

#Insertar una Compra
insert into Compra values(null,1200000,false,1,'333');
insert into Compra values(null,1200000,false,1,'978676');
insert into Compra values(null,1200000,false,6,'1002549404');
insert into Compra values(null,1200000,false,2,'978676');
Select*from Compra;

#Insertar Transacciones a vendedor y comprador
insert into Transaccion values(null,'Ingreso',1200000,false,'1002549404',1);
insert into Transaccion values(null,'Compra',1200000,false,'333',1);
insert into Transaccion values(null,'Ingreso',1200000,false,'1002549404',2);
insert into Transaccion values(null,'Compra',1100000,false,'978676',2);
insert into Transaccion values(null,'Ingreso',1200000,false,'23789345',3);
insert into Transaccion values(null,'Compra',1100000,false,'1002549404',3);
insert into Transaccion values(null,'Ingreso',1200000,false,'978676',4);
insert into Transaccion values(null,'Compra',1100000,false,'23789345',4);
Select*from Transaccion;

#Insertar una Transferencia
insert into Transaccion values(null,'Transferencia Recibida',200000,True,'1002549404',null);
insert into Transaccion values(null,'Transferencia Enviada',20000,True,'333',null);

insert into Transaccion values(null,'Transferencia Recibida',50000,True,'23789345',null);
insert into Transaccion values(null,'Transferencia Enviada',50000,True,'978676',null);

#Insertar un comentario
insert into comentario values(null,"Es un buen celular aunque es muy delicado",DATE_FORMAT(NOW( ), "%H:%i:%S" ),null,1,'333');
insert into comentario values(null,"¿Tienes disponibilidad para el dia viernes?",DATE_FORMAT(NOW( ), "%H:%i:%S" ),null,5,'1002549404');
insert into comentario values(null,"¿Cuantos niños puedes cuidar?",DATE_FORMAT(NOW( ), "%H:%i:%S" ),null,5,'333');
insert into comentario values(null,"¿Que tipo de herramientas usa para el servicio?",DATE_FORMAT(NOW( ), "%H:%i:%S" ),null,6,'978676');
select*from Comentario;

#Insertar una respuesta a un comentario
update Comentario set respuestaComentario="Que bueno que te gusto" where codComentario=1;
update Comentario set respuestaComentario="Si, para la tarde y noche" where codComentario=2;
update Comentario set respuestaComentario="llave inglesa,cinta de teflon y pinzas" where codComentario=3;
select*from Comentario;

#Insertar una valoracion a una oferta
insert into Valoracion values(null,5,1);
insert into Valoracion values(null,3,1);
insert into Valoracion values(null,4.5,2);
insert into Valoracion values(null,3.5,2);
insert into Valoracion values(null,5,3);
insert into Valoracion values(null,2,3);
select *from Valoracion;





