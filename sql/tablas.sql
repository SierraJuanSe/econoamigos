-- MySQL Script generated by MySQL Workbench
-- Wed Mar 17 10:49:19 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sql10399086
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sql10399086
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sql10399086` DEFAULT CHARACTER SET utf8 ;
USE `sql10399086` ;

-- -----------------------------------------------------
-- Table `sql10399086`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Usuario` (
  `idUsuario` VARCHAR(20) NOT NULL,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `apellidousuario` VARCHAR(45) NOT NULL,
  `emailUsuario` VARCHAR(45) NOT NULL,
  `contraseñaUsuario` VARCHAR(45) NOT NULL,
  `telefonoUsuario` VARCHAR(45) NOT NULL,
  `ocupacionUsuario` VARCHAR(45) NOT NULL,
  `fechaNacUsuario` DATE NOT NULL,
  `totalMonedaUsuario` BIGINT(10) NOT NULL,
  `direccion` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10399086`.`Transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Transaccion` (
  `codTransaccion` INT NOT NULL AUTO_INCREMENT,
  `conceptoTransaccion` VARCHAR(45) NOT NULL,
  `Usuario_idUsuario` VARCHAR(20) NOT NULL,
  `valorTransaccion` BIGINT(40) NOT NULL,
  PRIMARY KEY (`codTransaccion`),
  INDEX `fk_Transaccion_Usuario1_idx` (`Usuario_idUsuario` ASC) ,
  CONSTRAINT `fk_Transaccion_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `sql10399086`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10399086`.`Oferta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Oferta` (
  `codOferta` INT NOT NULL AUTO_INCREMENT,
  `nombreOferta` VARCHAR(45) NOT NULL,
  `descripcionOferta` VARCHAR(45) NOT NULL,
  `precioOferta` BIGINT(100) NOT NULL,
   `estadoOferta` boolean NOT NULL,
  `Usuario_idUsuario` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`codOferta`),
  INDEX `fk_Oferta_Usuario_idx` (`Usuario_idUsuario` ASC) ,
  CONSTRAINT `fk_Oferta_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `sql10399086`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10399086`.`Compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Compra` (
  `codCompra` INT NOT NULL AUTO_INCREMENT,
  `precioCompra` BIGINT(30) NOT NULL,
  `estadoCompra` boolean NOT NULL,
  `Usuario_idUsuario` VARCHAR(20) NOT NULL,
  `Transaccion_codTransaccion` INT NOT NULL,
  `Oferta_codOferta` INT NOT NULL,
  PRIMARY KEY (`codCompra`),
  INDEX `fk_Compra_Usuario1_idx` (`Usuario_idUsuario` ASC) ,
  INDEX `fk_Compra_Transaccion1_idx` (`Transaccion_codTransaccion` ASC) ,
  INDEX `fk_Compra_Oferta1_idx` (`Oferta_codOferta` ASC) ,
  CONSTRAINT `fk_Compra_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `sql10399086`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Compra_Transaccion1`
    FOREIGN KEY (`Transaccion_codTransaccion`)
    REFERENCES `sql10399086`.`Transaccion` (`codTransaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Compra_Oferta1`
    FOREIGN KEY (`Oferta_codOferta`)
    REFERENCES `sql10399086`.`Oferta` (`codOferta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10399086`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Producto` (
  `imagenProducto` VARCHAR(45) NOT NULL,
  `cantidadProducto` INT NOT NULL,
  `Oferta_codOferta` INT NOT NULL,
  INDEX `fk_Producto_Oferta1_idx` (`Oferta_codOferta` ASC) ,
  CONSTRAINT `fk_Producto_Oferta1`
    FOREIGN KEY (`Oferta_codOferta`)
    REFERENCES `sql10399086`.`Oferta` (`codOferta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10399086`.`Servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Servicio` (
  `lugarServicio` VARCHAR(40) NOT NULL,
  `Oferta_codOferta` INT NOT NULL,
  CONSTRAINT `fk_Servicio_Oferta1`
    FOREIGN KEY (`Oferta_codOferta`)
    REFERENCES `sql10399086`.`Oferta` (`codOferta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql10399086`.`Recarga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql10399086`.`Recarga` (
  `Transaccion_codTransaccion` INT NOT NULL,
  INDEX `fk_Recarga_Transaccion1_idx` (`Transaccion_codTransaccion` ASC) ,
  CONSTRAINT `fk_Recarga_Transaccion1`
    FOREIGN KEY (`Transaccion_codTransaccion`)
    REFERENCES `sql10399086`.`Transaccion` (`codTransaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

ALTER TABLE Oferta AUTO_INCREMENT=1;
ALTER TABLE Compra AUTO_INCREMENT=1;
ALTER TABLE Transaccion AUTO_INCREMENT=1;