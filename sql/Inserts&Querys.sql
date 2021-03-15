use econoamigos;

-- -----------------------------------------------------
-- insert a user
-- -----------------------------------------------------
insert into usuario values('1002549404','Luis Felipe','Velasquez Puentes','felipe@gmail.com','12345','3222328138','Estudinate','2001-01-1',0);
insert into usuario values('23789345','Juan','Rodriguez','jaun@gmail.com','1234sas5','345345423','Contador','1991-08-1',3400);
insert into usuario values('978676','Lina','Pulido','Lina@gmail.com','fksjdfh','654645','Secretaria','2000-08-1',0);

select*from usuario;

-- -----------------------------------------------------
-- insertar una oferta
-- -----------------------------------------------------
insert into oferta values(null,"celular iphone 6","Es un celular bonito",1200000,'1002549404');
insert into oferta values(null,"Mesa de estudio","Es muy comodo",200000,'23789345');
insert into oferta values(null,"Mesa de trabajo","Es muy comodo",100000,'23789345');
insert into oferta values(null,"Servicio de niñera","Puedo cuidar a us hijos",40000,'978676');
insert into oferta values(null,"Servicio de carpinteria","Puedo cuidar aarreglar tus muebles",400000,'23789345');


select*from oferta;

-- -----------------------------------------------------
-- insertar un producto
-- -----------------------------------------------------
insert into producto values('https://www.google.es/url?sa=dsds',3,1);
insert into producto values('https://www.google.co/url?sa=isdfABAE',2,2);
insert into producto values('https://www.google/url?sa=sdfsdfBAE',1,3);
select*from producto;
-- -----------------------------------------------------
-- insertar un servicio
-- -----------------------------------------------------
insert into servicio values('Sector del norte de Bogotá',4);
insert into servicio values('Sector del norte de Bogotá',5);
select*from servicio;
-- -----------------------------------------------------
-- insertar una compra
-- -----------------------------------------------------
