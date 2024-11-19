-- DROP DATABASE shop_db; 
-- DROP DATABASE history_db; 
-- DROP DATABASE users_db;


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
    plu VARCHAR(50) REFERENCES products(plu) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    shelf_quantity INTEGER DEFAULT 0,
    order_quantity INTEGER DEFAULT 0,
    UNIQUE (plu, shop_id)
);

\c history_db

-- Создание таблицы истории в базе данных history_db
CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    plu VARCHAR(50) NOT NULL,
    shop_id INTEGER DEFAULT 0,
    action VARCHAR(50) NOT NULL,
    shelf_quantity INTEGER DEFAULT 0,
    order_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\c users_db

-- Создание таблицы пользователей в базе данных users_db
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')) NOT NULL,
    has_issues BOOLEAN DEFAULT false
);