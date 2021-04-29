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
oferta.codOferta,oferta.nombreOferta,Compra.estadoCompra
FROM ((Compra INNER JOIN Oferta ON Compra.Oferta_codOferta = oferta.codOferta and Oferta.Usuario_idUsuario='23789345')
INNER JOIN Usuario ON Compra.Usuario_idUsuario = Usuario.idUsuario);

#Cambiar el estado de la compra (Aca ya se acualiza el saldo) 
Update Compra SET Compra.estadoCompra=True where Compra.codCompra=3;
Update Transaccion as t SET t.estadoTransaccion=True where t.Compra_codCompra=3;

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

#Conusltar Todos los barrios
select*from Barrio;

#consultar las ofertas segun el barrio de la persona
SELECT * FROM Oferta as o 
INNER JOIN Usuario as u ON u.idUsuario=o.Usuario_idUsuario
where u.Barrio_CodBarrio=5;

#Actualizar el estado cuando una persona inserta el codigo de referido(Ya se actualiza el saldo con el trigger)
#Insertar las transacciones de referidos
insert into Transaccion values(null,'Referido',(select valorReferido from Referido where codReferido="MiCodigo"),True,'978676',null);
insert into Transaccion values(null,'Bono por Referir',10,True,'1002549404',null);
update Usuario set estadoReferido=True where idUsuario="978676";


insert into Transaccion values(null,'Referido',(select valorReferido from Referido where codReferido="Axh8$m"),True,'333',null);
insert into Transaccion values(null,'Bono por Referir',10,True,'23789345',null);
update Usuario set estadoReferido=True where idUsuario="333";


#Borrar la compra si el usuario no acepta la oferta de intercambio
Delete from Compra where codCompra=5;
