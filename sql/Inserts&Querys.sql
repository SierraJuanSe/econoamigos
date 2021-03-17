use econoamigos;

-- -----------------------------------------------------
-- insert a user
-- -----------------------------------------------------
insert into Usuario values('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudinate','2001-01-1',0,'Cll 434,Villa de Leyva');
insert into Usuario values('23789345','Juan','Rodriguez','jaun@gmail.com','1234sas5','345345423','Contador','1991-08-1',3400,'Cll 434,Cali');
insert into Usuario values('978676','Lina','Pulido','Lina@gmail.com','fksjdfh','654645','Secretaria','2000-08-1',0,'Cll 12,Bogotá');

select*from usuario;

-- -----------------------------------------------------
-- insertar una oferta
-- -----------------------------------------------------
insert into Oferta values(null,"celular iphone 6","Es un celular bonito",1200000,'1002549404');
insert into Oferta values(null,"Mesa de estudio","Es muy comodo",200000,'23789345');
insert into Oferta values(null,"Mesa de trabajo","Es muy comodo",100000,'23789345');
insert into Oferta values(null,"Servicio de niñera","Puedo cuidar a us hijos",40000,'978676');
insert into Oferta values(null,"Servicio de carpinteria","Puedo cuidar aarreglar tus muebles",400000,'23789345');


select*from oferta;

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
select*from Servicio;
-- -----------------------------------------------------
-- insertar una Transaccion (cada ve que se haga una transaccion ase acualice la moneda)
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
insert into Compra values(null,200000,'1002549404',1,2);
insert into Compra values(null,100000,'23789345',2,3);
insert into Compra values(null,1200000,'978676',3,1);
insert into Compra values(null,40000,'1002549404',4,4);
select*from Compra;

-- -----------------------------------------------------
-- insertar una Recarga
-- -----------------------------------------------------
insert into Recarga values(5,3000);
insert into Recarga values(6,3000);
insert into Recarga values(7,3000);
insert into Recarga values(8,3000);
select*from Recarga;

-- -----------------------------------------------------
-- Consultar a usuarios y verificar el login
-- -----------------------------------------------------
select*from Usuario as u where u.emailUsuario='felipe@gmail.com' && u.contraseñaUsuario='12345'; 
-- -----------------------------------------------------
-- Consultar Todos los producto
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta;
-- -----------------------------------------------------
-- Consultar Todos los servcios
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta;
-- -----------------------------------------------------
-- Consultar Todas los Productos que un Usuario ha creado
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta && o.Usuario_idUsuario='1002549404';
-- -----------------------------------------------------
-- Consultar Todas los Servicios que un Usuario ha creado
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta && o.Usuario_idUsuario='978676';
-- -----------------------------------------------------
-- Consultar Todas las Compras de productos que un Usuario ha realizado
-- -----------------------------------------------------
Select *from Compra as c where c.Usuario_idUsuario='1002549404';
-- -----------------------------------------------------
-- Consultar Quienes realizaron las compras de un servicio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Actualizar el saldo por una recarga
-- -----------------------------------------------------
UPDATE Usuario
SET totalMonedaUsuario=totalMonedaUsuario+10000
WHERE idUsuario='1002549404';

-- -----------------------------------------------------
-- Actualizar la Cantidad de un producto
-- -----------------------------------------------------
UPDATE Producto
SET cantidadProducto=cantidadProducto-1
WHERE Oferta_codOferta=1;
select*from Producto;

insert into Compra values(null,200000,'1002549404',1,2);
insert into Compra values(null,100000,'23789345',2,3);
insert into Compra values(null,1200000,'978676',3,1);
insert into Compra values(null,40000,'1002549404',4,4);
select*from Compra;

-- -----------------------------------------------------
-- insertar una Recarga
-- -----------------------------------------------------
insert into Recarga values(5,3000);
insert into Recarga values(6,3000);
insert into Recarga values(7,3000);
insert into Recarga values(8,3000);
select*from Recarga;

-- -----------------------------------------------------
-- Consultar a usuarios y verificar el login
-- -----------------------------------------------------
select*from Usuario as u where u.emailUsuario='felipe@gmail.com' && u.contraseñaUsuario='12345'; 
-- -----------------------------------------------------
-- Consultar Todos los producto
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta;
-- -----------------------------------------------------
-- Consultar Todos los servcios
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta;
-- -----------------------------------------------------
-- Consultar Todas los Productos que un Usuario ha creado
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta && o.Usuario_idUsuario='1002549404';
-- -----------------------------------------------------
-- Consultar Todas los Servicios que un Usuario ha creado
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta && o.Usuario_idUsuario='978676';
-- -----------------------------------------------------
-- Consultar Todas las Compras de productos que un Usuario ha realizado
-- -----------------------------------------------------
Select *from Compra as c where c.Usuario_idUsuario='1002549404';
-- -----------------------------------------------------
-- Consultar Quienes realizaron las compras de un servicio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Actualizar el saldo por una recarga
-- -----------------------------------------------------
UPDATE Usuario
SET totalMonedaUsuario=totalMonedaUsuario+10000
WHERE idUsuario='1002549404';

-- -----------------------------------------------------
-- Actualizar la Cantidad de un producto
-- -----------------------------------------------------
UPDATE Producto
SET cantidadProducto=cantidadProducto-1
WHERE Oferta_codOferta=1;
select*from Producto;

