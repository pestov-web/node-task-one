-- Создание баз данных
CREATE DATABASE shop_db;
CREATE DATABASE history_db;
CREATE DATABASE users_db;

\c shop_db

-- Создание таблиц в базе данных shop_db
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    plu VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    shelf_quantity INTEGER DEFAULT 0,
    order_quantity INTEGER DEFAULT 0,
    UNIQUE (product_id, shop_id)
);

\c history_db

-- Создание таблицы истории в базе данных history_db
CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    shop_id INTEGER,
    action VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
