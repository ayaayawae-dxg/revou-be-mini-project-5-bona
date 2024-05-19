# Mini Project Assignment: Create Microservices Using Docker

![image](https://github.com/ayaayawae-dxg/revou-be-mini-project-5-bona/assets/156976045/9082e420-8058-4884-ba66-10d8b3cb5f16)

## Description
A simple microservice API for ordering a products with [Kong](https://konghq.com) as an API Management and [Kafka](https://kafka.apache.org) as an event streaming platform

## Library
1. [typescript](https://www.npmjs.com/package/typescript)
2. [express](https://www.npmjs.com/package/express)
3. [bcrypt](https://www.npmjs.com/package/bcrypt)
4. [express-openapi-validator](https://www.npmjs.com/package/express-openapi-validator)
5. [jwt](https://www.npmjs.com/package/jsonwebtoken)
5. [mysql2](https://www.npmjs.com/package/mysql2)
6. [amqplib](https://www.npmjs.com/package/amqplib)
7. [kafkajs](https://www.npmjs.com/package/kafkajs)

## How to run (with Docker)
1. Clone this repository.
2. Open project folder.
3. Type this on the Command Prompt.
	```
	docker compose up
	```
	This will generate a docker image and run a container that contains a MySQL database with DML & DDL data, and the server application.
4. Wait until process completed and access the API on `http://localhost:8000`

## Database
### DDL & DML [here](https://github.com/ayaayawae-dxg/revou-be-mini-project-5-bona/blob/main/seeder/seeder.sql)
```sql
CREATE DATABASE IF NOT EXISTS `be-mini-project-5-orders`;
CREATE DATABASE IF NOT EXISTS `be-mini-project-5-products`;
CREATE DATABASE IF NOT EXISTS `be-mini-project-5-notification`;

use `be-mini-project-5-orders`;
CREATE TABLE orders (
	id VARCHAR(64) PRIMARY KEY DEFAULT (UUID()),
	user_id INT,
	product_id INT,
	quantity INT,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP ON UPDATE NOW()
);
INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 1, 3);
INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 2, 1);

use `be-mini-project-5-products`;
CREATE TABLE products (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(128),
	quantity INT,
	price FLOAT,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP ON UPDATE NOW()
);
INSERT INTO products (name, quantity, price) VALUES ("Esia", 10, 20000);
INSERT INTO products (name, quantity, price) VALUES ("Samsul", 2, 100000);

use `be-mini-project-5-notification`;
CREATE TABLE notifications (
	id VARCHAR(64) PRIMARY KEY DEFAULT (UUID()),
	message TEXT,
	created_at TIMESTAMP DEFAULT NOW()
);
```
