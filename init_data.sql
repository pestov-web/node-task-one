-- Очистка таблиц
TRUNCATE TABLE history RESTART IDENTITY CASCADE;
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
(1, 'PLU-001', 'Product 1'),
(2, 'PLU-002', 'Product 2'),
(3, 'PLU-003', 'Product 3'),
(4, 'PLU-004', 'Product 4'),
(5, 'PLU-005', 'Product 5');

-- Добавление остатков
INSERT INTO stocks (product_id, shop_id, shelf_quantity, order_quantity) VALUES
(1, 1, 50, 10),
(2, 1, 30, 5),
(3, 2, 20, 2),
(4, 2, 60, 15),
(5, 3, 40, 8);

-- Добавление истории действий
INSERT INTO history (product_id, shop_id, action, quantity, created_at) VALUES
(1, 1, 'create_stock', 50, '2024-11-10 10:00:00'),
(1, 1, 'increase_stock', 10, '2024-11-11 11:00:00'),
(2, 1, 'create_stock', 30, '2024-11-10 12:00:00'),
(3, 2, 'create_stock', 20, '2024-11-12 09:00:00'),
(4, 2, 'decrease_stock', 5, '2024-11-12 14:00:00'),
(5, 3, 'create_stock', 40, '2024-11-13 08:00:00');
