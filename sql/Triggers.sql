#Trigger para Actualizar el sueldo por medio de una recarga y de los referidos
DELIMITER $$
CREATE TRIGGER ActualizarMonedaRecargaReferido  AFTER INSERT ON Transaccion
FOR EACH ROW
BEGIN
    IF  new.conceptoTransaccion = 'Transferencia Recibida' or new.conceptoTransaccion = 'Referido' or new.conceptoTransaccion = 'Bono por Referir' THEN BEGIN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario+new.valorTransaccion
	where Usuario.idUsuario=new.Usuario_idUsuario;
    END;
	ELSEIF new.conceptoTransaccion = 'Transferencia Enviada' THEN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario-new.valorTransaccion
	where Usuario.idUsuario=new.Usuario_idUsuario;
    END IF;
END$$transaccion
DELIMITER ;


#Trigger para Actualizar el sueldo por medio de una Compra por economonedas
DELIMITER $$
CREATE TRIGGER ActualizarMoneda AFTER UPDATE ON Transaccion
FOR EACH ROW
BEGIN
IF  old.conceptoTransaccion = 'Ingreso' THEN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario+old.valorTransaccion
	where Usuario.idUsuario=old.Usuario_idUsuario;
   END IF;
END$$
DELIMITER ;


#cuando se inserte la transaccion de compra
DELIMITER $$
CREATE TRIGGER ActualizarMonedaInsercion AFTER insert ON Transaccion
FOR EACH ROW
BEGIN
IF new.conceptoTransaccion = 'Compra' THEN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario-new.valorTransaccion
	where Usuario.idUsuario=new.Usuario_idUsuario;
   END IF;
END$$
DELIMITER ;


#cuando se haga una compra reducir la cantidad
DELIMITER $$
CREATE TRIGGER ActualizarCantidad AFTER insert ON Compra
FOR EACH ROW
BEGIN
UPDATE Oferta as o SET o.cantidadProducto=o.cantidadProducto-1
 where o.codOferta=new.Oferta_codOferta;
END$$
DELIMITER ;
