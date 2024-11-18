-- Очистка таблиц в shop_db
TRUNCATE TABLE stocks RESTART IDENTITY CASCADE;
TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE shops RESTART IDENTITY CASCADE;

-- Добавление магазинов
INSERT INTO shops (id, name) VALUES
(1, 'Shop A'),
(2, 'Shop B'),
(3, 'Shop C');

-- Добавление товаров
INSERT INTO products (id, plu, name) VALUES
(1, '000013', 'Iphone 13'),
(2, 'r2d2v1', 'Robot'),
(3, '000001', 'Булка хлеба'),
(4, '000002', 'Product 4'),
(5, '000003', 'Product 5');

-- Добавление остатков
INSERT INTO stocks (product_id, shop_id, shelf_quantity, order_quantity) VALUES
(1, 1, 50, 10),
(2, 1, 30, 5),
(3, 2, 20, 2),
(4, 2, 60, 15),
(5, 3, 40, 8);