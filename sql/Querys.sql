#Consultar Si un usuario existe (1 si existe, 0 si no existe)
SELECT EXISTS(
SELECT Usuario.idUsuario
FROM Usuario 
WHERE Usuario.emailUsuario='jaun@gmail.com') as 'Result';

# Consultar a usuario y verificar el login
select*from Usuario as u where u.emailUsuario='felipe@gmail.com' && u.contraseñaUsuario='12345'; 

#Consultar las Ofertas que  ha comprado un usuario
select*from Oferta where Usuario_idUsuario='1002549404';

#Consultar Todos los servicios y los productos con Stock disponible
select*from Oferta where cantidadProducto >0 or cantidadProducto is null;

#Consultar Las ofertas con Stock disponible mediante un buscador
select*from Oferta where nombreOferta Like '%celular%' and (cantidadProducto >0 or cantidadProducto is null);

#consultar las compras que le han realizado a un usuario
SELECT Compra.codCompra,Compra.ofertacambio,Usuario.idUsuario,Usuario.nombreUsuario,Usuario.apellidoUsuario,telefonoUsuario,Usuario.direccion,
oferta.codOferta,oferta.nombreOferta,EstadoCompra_codEstadoCompra, compra.fechaEnvio
FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario='23789345')
INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);

#Cabiar estados cuando se compra por economonedas
#Cambiar el estado de la compra a confirmado por parte del vendedor
Update Compra SET EstadoCompra_codEstadoCompra=2 where Compra.codCompra=4;


#Cambiar el estado de la compra a enviado por parte del vendedor
Update Compra SET EstadoCompra_codEstadoCompra=3,fechaEnvio=now() where Compra.codCompra=4;

#Cambiar el estado de la compra a recibido por parte del comprador
Update Compra SET EstadoCompra_codEstadoCompra=4 where Compra.codCompra=4;
Update Transaccion as t SET t.estadoTransaccion=True where t.Compra_codCompra=4;


#Cabiar estados cuando se compra por intercambio
#Cambiar el estado de la compra a confirmado por parte del vendedor
Update Compra SET EstadoCompra_codEstadoCompra=2 where Compra.codCompra=8;
SET @dueno=(select Usuario_idUsuario from Oferta where codOferta=9);
insert into Compra values(null,9,null,null,6,@dueno,2);

#Cambiar el estado de la compra a enviado por parte del vendedor
Update Compra SET EstadoCompra_codEstadoCompra=3,fechaEnvio=now() where Compra.codCompra=8;
#Lo mismo para la otra compra

#Cambiar el estado de la compra a recibido por parte del comprador
Update Compra SET EstadoCompra_codEstadoCompra=4 where Compra.codCompra=8;
Update Transaccion as t SET t.estadoTransaccion=True where t.Compra_codCompra=8;
#Lo mismo para la otra compra



#Consultar las transacciones de un Usuario 
select*from Transaccion where Usuario_idUsuario='1002549404'; 


#Actualizar los datos de un usuario
update Usuario as u set u.nombreUsuario='Luis',u.apellidousuario='Velasquez',
u.contraseñaUsuario='qwerty',u.telefonoUsuario='3249874577',
u.direccion='clle 23 #12-12',u.Barrio_codBarrio=7
where u.idUsuario='23789345';

#Consultar el promedio de la valoracion de una oferta
select avg(valor) from Valoracion where Oferta_codOferta=3;

#Cosnultar los comentarios de una oferta
select*from Comentario where Oferta_codOferta=5;


#consultar las ofertas segun el barrio de la persona
SELECT * FROM Oferta as o 
INNER JOIN Usuario as u ON u.idUsuario=o.Usuario_idUsuario
where u.Barrio_CodBarrio=5;

#Actualizar el estado cuando una persona inserta el codigo de referido(Ya se actualiza el saldo con el trigger)
#Insertar las transacciones de referidos
SET @codOnewr = (Select idUsuario from Usuario where Referido_codReferido="MiCodigo");
insert into Transaccion values(null,'Referido',(select valorReferido from Referido where codReferido="MiCodigo"),True,'978676',null);
insert into Transaccion values(null,'Bono por Referir',10,True,@codOnewr,null);
update Usuario set estadoReferido=True where idUsuario="978676";

SET @codOnewr = (Select idUsuario from Usuario where Referido_codReferido="Axh8$m");
insert into Transaccion values(null,'Referido',(select valorReferido from Referido where codReferido="Axh8$m"),True,'333',null);
insert into Transaccion values(null,'Bono por Referir',10,True,@codOnewr,null);
update Usuario set estadoReferido=True where idUsuario="333";

#Borrar la compra si el usuario no acepta la oferta de intercambio
Delete from Compra where codCompra=5;

#consultar el chat de una compra
select*from Mensaje where Compra_codCompra=4;
