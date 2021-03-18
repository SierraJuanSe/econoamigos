#Trigger para Actualizar el sueldo por medio de una recarga
DELIMITER $$
CREATE TRIGGER ActualizarMonedaRecarga  AFTER INSERT ON Transaccion
FOR EACH ROW
BEGIN
    IF new.conceptoTransaccion = 'Recarga'  THEN BEGIN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario+new.valorTransaccion
	where Usuario.idUsuario=new.Usuario_idUsuario;
    END; END IF;
END$$transaccion
DELIMITER ;


#Trigger para Actualizar el sueldo por medio de una Compra o una recarga
DELIMITER $$
CREATE TRIGGER ActualizarMoneda AFTER UPDATE ON Transaccion
FOR EACH ROW
BEGIN
IF old.conceptoTransaccion = 'Compra' THEN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario-old.valorTransaccion
	where Usuario.idUsuario=old.Usuario_idUsuario;

   ELSEIF old.conceptoTransaccion = 'Ingreso' THEN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario+old.valorTransaccion
	where Usuario.idUsuario=old.Usuario_idUsuario;
   END IF;
END$$
DELIMITER ;

#cuando se haga una compra reducir la cantidad
DELIMITER $$
CREATE TRIGGER ActualizarCantidad AFTER insert ON Compra
FOR EACH ROW
BEGIN
UPDATE Producto as p SET p.cantidadProducto=p.cantidadProducto-1
 where p.Oferta_codOferta=new.Oferta_codOferta;
END$$
DELIMITER ;