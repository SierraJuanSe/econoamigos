#Trigger para Actualizar el sueldo por medio de una recarga
DELIMITER $$
CREATE TRIGGER ActualizarMoneda  AFTER INSERT ON Transaccion
FOR EACH ROW
BEGIN
    IF new.conceptoTransaccion = 'Recarga' THEN BEGIN
	update Usuario
	set Usuario.totalMonedaUsuario=Usuario.totalMonedaUsuario+new.valorTransaccion
	where Usuario.idUsuario=new.Usuario_idUsuario;
    END; END IF;
END$$transaccion
DELIMITER ;