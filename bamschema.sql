drop database if exists bamazonDB;
create database bamazonDB;

use bamazonDB;

create table products (
item_id integer not null,
product_name varchar(50) not null,
department_name varchar(25),
price decimal(10,2) not null,
stock_quantity integer not null,
primary key (item_id)
);
