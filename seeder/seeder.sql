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