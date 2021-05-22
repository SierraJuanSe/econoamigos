#Insertar un barrio
insert into Barrio values(null,"Alcazares");
insert into Barrio values(null,"Santa Barbara");
insert into Barrio values(null,"El Refugio");
insert into Barrio values(null,"Santa Elena");
insert into Barrio values(null,"Pardo Rubio");
insert into Barrio values(null,"Barrancas");
insert into Barrio values(null,"Santa Teresa");
insert into Barrio values(null,"Villa Luz");
insert into Barrio values(null,"Villa Oliva");
insert into Barrio values(null,"La liberia");
insert into Barrio values(null,"Santa Monica");
insert into Barrio values(null,"La Calleja");
insert into Barrio values(null,"Santa Ana");

#Insertar un usuario
insert into Usuario values('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','2001-01-1',100,'Cll 434,Villa de Leyva',false,5);
insert into Usuario values('23789345','Juan','Rodriguez','jaun@gmail.com','1234sas5','345345423','1991-08-1',100,'Cll 434,Cali',false,1);
insert into Usuario values('978676','Lina','Pulido','Lina@gmail.com','fksjdfh','654645','2000-08-1',100,'Cll 12,Bogotá',false,7);
insert into Usuario values('333','Juan','Mecanico','Mecanico@gmail.com','vfvfvf','3102765467','2003-04-1',100,'cll 43 n3.2,Bogotá',false,9);
select*from usuario;

#Insertar un codigo de referido
insert into Referido values("MiCodigo",1000,'1002549404');
insert into Referido values("Axh8$m",200,'978676');
insert into Referido values("Er)2;0",112,'333');
insert into Referido values("qwerty",1000,'23789345');


#Insertar una Oferta de tipo producto
insert into Oferta values(null,'Producto',"celular iphone 6","Es un celular bonito",100,true,null,'https//:www.imagen.jpg',10,'1002549404');
insert into Oferta values(null,'Producto',"Mesa de estudio","Es muy comodo",20,true,null,'https//:www.imagen.jpg',10,'23789345');
insert into Oferta values(null,'Producto',"Mesa de trabajo","Es muy comodo",10,true,null,'https//:www.imagen.jpg',10,'23789345');
insert into Oferta values(null,'Producto',"Posillos de porcelana","Posillos con tematicas varias",10,true,null,'https//:www.imagen.jpg',10,'978676');
insert into Oferta values(null,'Producto',"Posillos de porcelana","Posillos con tematicas varias",7,true,null,'https//:www.imagen.jpg',0,'978676');

Select*from Oferta where tipo='Producto';

#Insertar una Oferta de tipo Servicio
insert into Oferta values(null,'Servicio',"Servicio de niñera","Puedo cuidar a us hijos",20,true,'Norte de Bogotá',null,null,'978676');
insert into Oferta values(null,'Servicio',"Servicio de carpinteria","Puedo cuidar aarreglar tus muebles",10,true,'Sur de Bogotá',null,null,'23789345');
insert into Oferta values(null,'Servicio',"Servicio de Mecanica","Puedo arreglar carros y motos",18,true,'Bogotá',null,null,'333');
insert into Oferta values(null,'Servicio',"Mantenimiento de cocina","Ofrezco el servicio para que su cocina este limpia",10,true,'Villa de Leyva',null,null,'333');
Select*from Oferta where tipo='Servicio';


#Insertar una Compra por economoneda como medio de pago
insert into Compra values(null,null,100,false,1,'333');
insert into Compra values(null,null,100,false,1,'978676');
insert into Compra values(null,null,20,false,6,'1002549404');
insert into Compra values(null,null,20,false,2,'978676');

#Insertar una Compra por intercambio de oferta como medio de pago
insert into Compra values(null,8,null,false,3,'333');
insert into Compra values(null,9,null,false,4,'333');
insert into Compra values(null,2,null,false,7,'23789345');
insert into Compra values(null,6,null,false,9,'978676');
Select*from Compra;

#Insertar Transacciones a vendedor y comprador
insert into Transaccion values(null,'Ingreso',100,false,'1002549404',1);
insert into Transaccion values(null,'Compra',100,false,'333',1);
insert into Transaccion values(null,'Ingreso',20,false,'1002549404',2);
insert into Transaccion values(null,'Compra',20,false,'978676',2);
insert into Transaccion values(null,'Ingreso',10,false,'23789345',3);
insert into Transaccion values(null,'Compra',10,false,'1002549404',3);
insert into Transaccion values(null,'Ingreso',10,false,'978676',4);
insert into Transaccion values(null,'Compra',10,false,'23789345',4);
Select*from Transaccion;

#Insertar una Transferencia
insert into Transaccion values(null,'Transferencia Recibida',20,True,'1002549404',null);
insert into Transaccion values(null,'Transferencia Enviada',20,True,'333',null);

insert into Transaccion values(null,'Transferencia Recibida',5,True,'23789345',null);
insert into Transaccion values(null,'Transferencia Enviada',5,True,'978676',null);



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

#Insertar MEnsajes de un chat
insert Into Mensaje values(null,"Buenos Dias como esta?",'1002549404','333',1);
insert Into Mensaje values(null,"Cuando me envia el producto?",'1002549404','333',1);
insert Into Mensaje values(null,"esta misma tarde señor",'333','1002549404',1);
insert Into Mensaje values(null,"Gracias",'1002549404','333',1);


insert Into Mensaje values(null,"Buenos Dias",'978676','23789345',4);
insert Into Mensaje values(null,"Bunos dias",'23789345','978676',4);
insert Into Mensaje values(null,"Disculpe, como instalo la mesa?",'978676','23789345',4);
insert Into Mensaje values(null,"Tienes que leer las instruciones",'23789345','978676',4);



select*from Mensaje;




