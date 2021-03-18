-- -----------------------------------------------------
-- Consultar Si un usuario existe (1 si existe, 0 si no existe)
-- -----------------------------------------------------
SELECT EXISTS(
SELECT Usuario.idUsuario
FROM Usuario 
WHERE Usuario.emailUsuario='jaun@gmail.com') as 'Result';


-- -----------------------------------------------------
-- Consultar a usuarios y verificar el login
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
-- Consultar Todos los productos Y todos Los Servicios
-- -----------------------------------------------------
(select o.codOferta,'Producto' as tipo,o.nombreOferta,o.descripcionOferta,
o.precioOferta,'-' as Lugar,p.cantidadProducto,p.imagenProducto as imagen from Oferta as o,Producto as p
where o.codOferta=p.Oferta_codOferta and o.estadoOferta=1 and p.cantidadProducto>0)union
(select o.codOferta,'Servicio' as tipo,o.nombreOferta,o.descripcionOferta,
o.precioOferta,s.lugarServicio,'-' as cantidad ,'-' as imagen from Oferta as o,Servicio as s
where o.codOferta=s.Oferta_codOferta and o.estadoOferta=1);


-- -----------------------------------------------------
-- Consultar Todos los productos
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
-- Consultar Todas las Compras de productos que un Usuario ha realizado
-- -----------------------------------------------------
Select *from Compra as c where c.Usuario_idUsuario='1002549404';


-- -----------------------------------------------------
-- Consultar Quienes realizaron las compras de los servicios realizados por el usuario 23789345
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
-- Actualizar el saldo por una compra
-- -----------------------------------------------------
UPDATE Usuario
SET totalMonedaUsuario=totalMonedaUsuario-10000
WHERE idUsuario='1002549404';


-- -----------------------------------------------------
-- Actualizar la Cantidad de un producto
-- -----------------------------------------------------
UPDATE Producto
SET cantidadProducto=cantidadProducto-1
WHERE Oferta_codOferta=7;


-- -----------------------------------------------------
-- Cambiar el estado de la compra 1
-- -----------------------------------------------------
Update Compra
SET Compra.estadoCompra=True
where Compra.codCompra='1';


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
select*from Transaccion where Transaccion.Usuario_idUsuario='1002549404'



