-- -----------------------------------------------------
-- Consultar Si un usuario existe (1 si existe, 0 si no existe)
-- -----------------------------------------------------
SELECT EXISTS(
SELECT Usuario.idUsuario
FROM Usuario 
WHERE Usuario.emailUsuario='jaun@gmail.com') as 'Result';


-- -----------------------------------------------------
-- Consultar a usuario y verificar el login
-- -----------------------------------------------------
select*from Usuario as u where u.emailUsuario='felipe@gmail.com' && u.contraseñaUsuario='12345'; 

-- -----------------------------------------------------
-- Actualizar los datos de un usuario
-- -----------------------------------------------------
update Usuario as u set u.nombreUsuario='Luis',u.apellidousuario='Velasquez',
u.contraseñaUsuario='qwerty',u.telefonoUsuario='3249874577',
u.ocupacionUsuario='Electrico',u.direccion='clle 23 #12-12'
where u.idUsuario='23789345';


-- -----------------------------------------------------
-- Consultar Todos los servicios y los productos con Stock disponible
-- -----------------------------------------------------
(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta,
o.precioOferta,o.Usuario_idUsuario,'-' as Lugar,p.cantidadProducto,p.imagenProducto as imagen from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0)union
(select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta,
o.precioOferta,o.Usuario_idUsuario,s.lugarServicio,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1);

(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta,
o.precioOferta,o.Usuario_idUsuario,'-' as Lugar,p.cantidadProducto,p.imagenProducto as imagen from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0 and (o.nombreOferta like '%Mesa%' or and o.descripcionOferta like '%Mesa%'))union
(select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta,
o.precioOferta,o.Usuario_idUsuario,s.lugarServicio,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1);
-- -----------------------------------------------------
-- Consultar Todos los productos con Stock Disponible
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0;


-- -----------------------------------------------------
-- Consultar Todos los servcios
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1;


-- ----------------------------------------------------
-- Consultar Todas los Productos que un Usuario ha creado
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta && o.Usuario_idUsuario='1002549404';


-- -----------------------------------------------------
-- Consultar Todas los Servicios que un Usuario ha creado
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta && o.Usuario_idUsuario='23789345';


-- -----------------------------------------------------
-- Consultar Todas las Compras de productos que un Usuario ha realizado!!!!
-- -----------------------------------------------------
select *,'Producto' as tipo from Oferta as o,Producto as p,Compra as c
where o.codOferta=p.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='1002549404';


-- -----------------------------------------------------
-- Consultar Todas las Compras de servicios que un Usuario ha realizado!!!!
-- -----------------------------------------------------
select *,'Servicio' as tipo from Oferta as o,Servicio as s,Compra as c
where o.codOferta=s.Oferta_codOferta and o.codOferta=c.Oferta_codOferta and c.Usuario_idUsuario='23789345';

-- -----------------------------------------------------
-- Consultar Quienes realizaron las compras de los Productos realizados por el usuario 23789345
-- -----------------------------------------------------
SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion,
oferta.codOferta,oferta.nombreOferta,Compra.estadoCompra
FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario='23789345')
INNER JOIN Producto ON Compra.Oferta_codOferta = Producto.Oferta_codOferta
INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);


-- -----------------------------------------------------
-- Consultar Quienes realizaron las compras los servicios realizados por el usuario 978676
-- -----------------------------------------------------
SELECT Compra.codCompra,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,
oferta.codOferta,oferta.nombreOferta,Compra.estadoCompra
FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario='978676')
INNER JOIN Servicio ON Compra.Oferta_codOferta = Servicio.Oferta_codOferta
INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);


-- -----------------------------------------------------
-- Actualizar la Cantidad de un producto
-- -----------------------------------------------------
UPDATE Producto
SET cantidadProducto=70
WHERE Oferta_codOferta=7;

-- -----------------------------------------------------
-- Cambiar el estado de la compra 2	(Aca ya se acualiza el saldo)
-- -----------------------------------------------------
Update Compra SET Compra.estadoCompra=True where Compra.codCompra=2;

Update Transaccion as t SET t.estadoTransaccion=True 
where t.codTransaccion=(select c.Transaccion_codTransaccion from Compra as c where  c.codCompra=2);

Update Transaccion as t SET t.estadoTransaccion=True 
where t.codTransaccion=(select c.Transaccion_codTransaccion from Compra as c where  c.codCompra=2)+1;

-- -----------------------------------------------------
-- Inactivar la oferta 1
-- -----------------------------------------------------
Update Oferta
SET Oferta.estadoOferta=false
where Oferta.codOferta='1';


-- -----------------------------------------------------
-- activar la oferta 1
-- -----------------------------------------------------
Update Oferta
SET Oferta.estadoOferta=True
where Oferta.codOferta='1';

-- -----------------------------------------------------
-- consultar las Transacciones de un usuario
-- -----------------------------------------------------
select*from Transaccion where Transaccion.Usuario_idUsuario='1002549404';


-- -----------------------------------------------------
-- consultar Quien es el vendedor y el Comprador de una oferta PENDIENTE
-- -----------------------------------------------------
SELECT Distinct c.codCompra,c.Usuario_idUsuario as Comprador,o.Usuario_idUsuario as Vendedor ,o.nombreOferta
FROM ((Compra as c INNER JOIN Oferta as o ON c.Oferta_codOferta = o.codOferta and c.estadoCompra=0 )
INNER JOIN Transaccion as t ON c.Usuario_idUsuario = t.Usuario_idUsuario and t.conceptoTransaccion='Compra');