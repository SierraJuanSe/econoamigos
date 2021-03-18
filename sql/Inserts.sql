-- -----------------------------------------------------
-- insert a user
-- -----------------------------------------------------
insert into Usuario values('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudinate','2001-01-1',0,'Cll 434,Villa de Leyva');
insert into Usuario values('23789345','Juan','Rodriguez','jaun@gmail.com','1234sas5','345345423','Contador','1991-08-1',3400,'Cll 434,Cali');
insert into Usuario values('978676','Lina','Pulido','Lina@gmail.com','fksjdfh','654645','Secretaria','2000-08-1',0,'Cll 12,Bogotá');
insert into Usuario values('333','Juan','Mecanico','Mecanico@gmail.com','vfvfvf','3102765467','Mecanico','2003-04-1',0,'cll 43 n3.2,Bogotá');
select*from usuario;

-- -----------------------------------------------------
-- insertar una oferta
-- -----------------------------------------------------
insert into Oferta values(null,"celular iphone 6","Es un celular bonito",1200000,true,'1002549404');
insert into Oferta values(null,"Mesa de estudio","Es muy comodo",200000,true,'23789345');
insert into Oferta values(null,"Mesa de trabajo","Es muy comodo",100000,true,'23789345');
insert into Oferta values(null,"Servicio de niñera","Puedo cuidar a us hijos",40000,true,'978676');
insert into Oferta values(null,"Servicio de carpinteria","Puedo cuidar aarreglar tus muebles",400000,true,'23789345');
insert into Oferta values(null,"Servicio de Mecanica","Puedo arreglar carros y motos",50000,true,'333');
select*from Oferta;
-- -----------------------------------------------------
-- insertar un producto
-- -----------------------------------------------------
insert into Producto values('https://www.google.es/url?sa=dsds',3,1);
insert into Producto values('https://www.google.co/url?sa=isdfABAE',2,2);
insert into Producto values('https://www.google/url?sa=sdfsdfBAE',1,3);
select*from Producto;
-- -----------------------------------------------------
-- insertar un servicio
-- -----------------------------------------------------
insert into Servicio values('Sector del norte de Bogotá',4);
insert into Servicio values('Villa de Leyva,Boyaca',5);
insert into Servicio values('Sector de Chapinero,Bgota',6);
select*from Servicio;

-- -----------------------------------------------------
-- insertar una Transaccion (cada vez que se haga una transaccion ase actualize la moneda)
-- -----------------------------------------------------
insert into Transaccion values(null,'Compra','1002549404',200000);
insert into Transaccion values(null,'Compra','23789345',100000);
insert into Transaccion values(null,'Compra','978676',1200000);
insert into Transaccion values(null,'Compra','1002549404',40000);
insert into Transaccion values(null,'Recarga','1002549404',200000);
insert into Transaccion values(null,'Recarga','23789345',100000);
insert into Transaccion values(null,'Recarga','978676',1200000);
insert into Transaccion values(null,'Recarga','1002549404',40000);
select*from Transaccion;

-- -----------------------------------------------------
-- insertar una compra
-- -----------------------------------------------------
insert into Compra values(null,200000,false,'1002549404',1,2);
insert into Compra values(null,100000,false,'23789345',2,3);
insert into Compra values(null,1200000,false,'978676',3,1);
insert into Compra values(null,40000,false,'1002549404',4,4);
insert into Compra values(null,40000,false,'1002549404',4,5);
select*from Compra;

-- -----------------------------------------------------
-- insertar una Recarga
-- -----------------------------------------------------
insert into Recarga values(5);
insert into Recarga values(6);
insert into Recarga values(7);
insert into Recarga values(8);
select*from Recarga;

