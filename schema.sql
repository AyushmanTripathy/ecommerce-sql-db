create database ecom;
use ecom;

-- users
create table users(
  id int primary key auto_increment,
  name varchar(255) not null,
  email varchar(255) not null
);

insert into users(name,email)
values('ayushman','contact@ayushman.dev');

-- products
create table products(
  id int auto_increment,
  name varchar(255) not null,
  description text,
  price int,
  manufacturer int not null,
  primary key(id),
  foreign key (manufacturer) references users(id)
);
create index name_index on products(name);

insert into products(name,description,price,manufacturer)
values
('jeggings','simple jeggings for everyone',1000,1),
('pants','men pants for all',540,1);

-- drop database ecom;
