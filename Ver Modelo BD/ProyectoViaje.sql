SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `proyectoviaje` ;
CREATE SCHEMA IF NOT EXISTS `proyectoviaje` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `proyectoviaje` ;

-- -----------------------------------------------------
-- Table `proyectoviaje`.`Objetivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Objetivo` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Objetivo` (
  `id` INT NOT NULL ,
  `YearInicio` DATE NOT NULL ,
  `YearFin` DATE NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`Centro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Centro` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Centro` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `CodigoCentro` VARCHAR(45) NOT NULL ,
  `Nombre` VARCHAR(45) NOT NULL ,
  `Localidad` VARCHAR(45) NULL ,
  `Verificado` TINYINT(1) NULL ,
  `Coordinador` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Centro_Usuarios1_idx` (`Coordinador` ASC) ,
  CONSTRAINT `fk_Centro_Usuarios1`
    FOREIGN KEY (`Coordinador` )
    REFERENCES `proyectoviaje`.`Usuarios` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Usuarios` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(45) NOT NULL ,
  `Apellidos` VARCHAR(45) NOT NULL ,
  `DNI` VARCHAR(45) NOT NULL ,
  `Telefono` VARCHAR(45) NOT NULL ,
  `Curso` VARCHAR(45) NOT NULL ,
  `Objetivo` INT NOT NULL ,
  `Centro` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Usuarios_Objetivo1_idx` (`Objetivo` ASC) ,
  INDEX `fk_Usuarios_Centro1_idx` (`Centro` ASC) ,
  CONSTRAINT `fk_Usuarios_Objetivo1`
    FOREIGN KEY (`Objetivo` )
    REFERENCES `proyectoviaje`.`Objetivo` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_Centro1`
    FOREIGN KEY (`Centro` )
    REFERENCES `proyectoviaje`.`Centro` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`TipoPedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`TipoPedido` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`TipoPedido` (
  `id` INT NOT NULL ,
  `Nombre` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`Proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Proveedor` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Proveedor` (
  `id` INT NOT NULL ,
  `Nombre` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`Ingreso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Ingreso` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Ingreso` (
  `id` INT NOT NULL ,
  `Cantidad` DECIMAL(10,3) NOT NULL ,
  `Verificado` TINYINT(1) NULL ,
  `Tipo` INT NOT NULL ,
  `Alumno` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Ingreso_TipoPedido1_idx` (`Tipo` ASC) ,
  INDEX `fk_Ingreso_Usuarios1_idx` (`Alumno` ASC) ,
  CONSTRAINT `fk_Ingreso_TipoPedido1`
    FOREIGN KEY (`Tipo` )
    REFERENCES `proyectoviaje`.`TipoPedido` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ingreso_Usuarios1`
    FOREIGN KEY (`Alumno` )
    REFERENCES `proyectoviaje`.`Usuarios` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`Producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Producto` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Producto` (
  `id` INT NOT NULL ,
  `Descripcion` TEXT NOT NULL ,
  `Referencia` VARCHAR(45) NOT NULL ,
  `PrecioVenta` INT NOT NULL ,
  `Beneficio` INT NOT NULL ,
  `Tipo` INT NOT NULL ,
  `Fabricante` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Producto_TipoPedido_idx` (`Tipo` ASC) ,
  INDEX `fk_Producto_Proveedor1_idx` (`Fabricante` ASC) ,
  CONSTRAINT `fk_Producto_TipoPedido`
    FOREIGN KEY (`Tipo` )
    REFERENCES `proyectoviaje`.`TipoPedido` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_Proveedor1`
    FOREIGN KEY (`Fabricante` )
    REFERENCES `proyectoviaje`.`Proveedor` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoviaje`.`Pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proyectoviaje`.`Pedido` ;

CREATE  TABLE IF NOT EXISTS `proyectoviaje`.`Pedido` (
  `id` INT NOT NULL ,
  `FechaPedido` DATE NOT NULL ,
  `CantidadPedida` INT NOT NULL ,
  `CantidadEntrega` INT NULL ,
  `IdProducto` INT NOT NULL ,
  `Alumno` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Pedido_Producto1_idx` (`IdProducto` ASC) ,
  INDEX `fk_Pedido_Usuarios1_idx` (`Alumno` ASC) ,
  CONSTRAINT `fk_Pedido_Producto1`
    FOREIGN KEY (`IdProducto` )
    REFERENCES `proyectoviaje`.`Producto` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_Usuarios1`
    FOREIGN KEY (`Alumno` )
    REFERENCES `proyectoviaje`.`Usuarios` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `proyectoviaje` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
