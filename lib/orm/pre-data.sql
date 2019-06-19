
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'asdfghjk'
-- Start Mysql
-- inser user type predate
insert into tblPreDefinedField(criterial,value,rangcolumn) values('userType','admin',1);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('userType','driver',2);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('userType','user',3);

insert into tblPreDefinedField(criterial,value,rangcolumn) values('deliveryStatus','new',1);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('deliveryStatus','pending',2);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('deliveryStatus','shipping',3);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('deliveryStatus','complete',4);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('deliveryStatus','cancel',5);

insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','request new',1);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','request checking',2);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','request balance',2);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','approved',3);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','suspend',4);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','inactive',5);
insert into tblPreDefinedField(criterial,value,rangcolumn) values('driverStatus','inactive',6);

-- insert car type