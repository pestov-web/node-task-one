# node-task-one

psql -h localhost -p 5432 -U user -d postgres -f init_schema.sql
psql -h localhost -p 5432 -U user -d postgres -f seed_shop.sql

# Обзор проекта

Этот проект состоит из трех сервисов, каждый из которых выполняет определенные задачи, связанные с управлением инвентарем магазина и историей изменений. Сервисы взаимодействуют друг с другом с использованием RabbitMQ для асинхронного обмена сообщениями и PostgreSQL для хранения данных. Ниже приведен обзор каждого сервиса, его структуры базы данных и доступных эндпоинтов.

## Обзор сервисов

1. **user-service**: Управляет данными пользователей.
2. **inventory-service**: Управляет продуктами и уровнями запасов в магазинах.
3. **history-service**: Отслеживает изменения уровней запасов и хранит историю действий.

## Требования

- Docker
- Docker Compose
- Node.js
- PostgreSQL
- RabbitMQ

## Архитектура

Сервисы подключены через RabbitMQ, а для хранения данных используется PostgreSQL. Сервисы следующие:

- **PostgreSQL**: Хранит данные о пользователях, продуктах и истории инвентаризации.
- **RabbitMQ**: Обеспечивает коммуникацию между сервисами, особенно для изменений в инвентаре.
- **inventory-service**: Управляет продуктами и уровнями запасов в магазинах.
- **history-service**: Логирует все изменения инвентаря.

## Настройка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

2. Соберите и запустите сервисы с помощью Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Сервисы будут доступны на следующих портах:
   - `user-service`: `3012`
   - `inventory-service`: `3010`
   - `history-service`: `3011`
   - `PostgreSQL`: `5432`
   - `RabbitMQ`: `5672` (UI управления доступен по адресу `http://localhost:15672`)

---

## Структуры баз данных

### 1. **inventory-service**: База данных для управления продуктами и запасами

#### Таблицы

- **shops**: Содержит информацию о магазинах.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор магазина.
  - `name` (VARCHAR(255)): Название магазина.

  ```sql
  CREATE TABLE IF NOT EXISTS shops (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
  );
  ```

- **products**: Содержит информацию о продуктах.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор продукта.
  - `plu` (VARCHAR(50), UNIQUE): Уникальный код продукта.
  - `name` (VARCHAR(255)): Название продукта.

  ```sql
  CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      plu VARCHAR(50) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL
  );
  ```

- **stocks**: Хранит информацию о запасах продуктов в магазинах.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор записи.
  - `plu` (VARCHAR(50)): Код продукта (ссылается на `products.plu`).
  - `shop_id` (INT): Идентификатор магазина (ссылается на `shops.id`).
  - `shelf_quantity` (INT): Количество продукта на полке.
  - `order_quantity` (INT): Количество продукта в заказах.

  ```sql
  CREATE TABLE IF NOT EXISTS stocks (
      id SERIAL PRIMARY KEY,
      plu VARCHAR(50) REFERENCES products(plu) ON DELETE CASCADE,
      shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
      shelf_quantity INTEGER DEFAULT 0,
      order_quantity INTEGER DEFAULT 0,
      UNIQUE (plu, shop_id)
  );
  ```

---

### 2. **history-service**: База данных для логирования изменений инвентаря

#### Таблица

- **history**: Логирует изменения инвентаря в магазинах.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор записи.
  - `plu` (VARCHAR(50)): Код продукта.
  - `shop_id` (INT, DEFAULT 0): Идентификатор магазина.
  - `action` (VARCHAR(50)): Действие, которое привело к изменению (например, "Stock increased").
  - `shelf_quantity` (INT, DEFAULT 0): Количество на полке после изменения.
  - `order_quantity` (INT, DEFAULT 0): Количество в заказах после изменения.
  - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP): Дата и время изменения.

  ```sql
  CREATE TABLE IF NOT EXISTS history (
      id SERIAL PRIMARY KEY,
      plu VARCHAR(50) NOT NULL,
      shop_id INTEGER DEFAULT 0,
      action VARCHAR(50) NOT NULL,
      shelf_quantity INTEGER DEFAULT 0,
      order_quantity INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

---

---

## API Эндпоинты

### 1. **inventory-service**

#### `/products`

- **POST**: Создание нового продукта.

  - **Тело запроса**:
    ```json
    {
      "plu": "12345",
      "name": "Product Name"
    }
    ```

- **GET**: Получить список продуктов с фильтрацией и пагинацией.
  - **Параметры запроса**:
    - `name`: Фильтр по названию продукта.
    - `plu`: Фильтр по PLU продукта.
    - `page`: Номер страницы для пагинации (по умолчанию: 1).
    - `limit`: Количество продуктов на странице (по умолчанию: 10).

#### `/stocks`

- **GET**: Получить информацию о запасах с фильтрацией и пагинацией.
  - **Параметры запроса**:
    - `plu`: Фильтр по PLU продукта.
    - `shop_id`: Фильтр по ID магазина.
    - `minShelf`: Минимальное количество на полке.
    - `maxShelf`: Максимальное количество на полке.
    - `minOrder`: Минимальное количество в заказе.
    - `maxOrder`: Максимальное количество в заказе.
    - `page`: Номер страницы для пагинации (по умолчанию: 1).
    - `limit`: Количество результатов на странице (по умолчанию: 10).

---

### 2. **history-service**

#### `/history`

- **GET**: Получить историю изменений инвентаря с фильтрацией и пагинацией.
  - **Параметры запроса**:
    - `shop_id`: Фильтр по ID магазина.
    - `plu`: Фильтр по PLU продукта.
    - `action`: Фильтр по действию (например, "Stock increased").
    - `startDate`: Фильтр по начальной дате.
    - `endDate`: Фильтр по конечной дате.
    - `page`: Номер страницы для пагинации (по умолчанию: 1).
    - `limit`: Количество результатов на странице (по умолчанию: 10).

---

## Взаимодействие сервисов

1. **inventory-service** отправляет сообщения в RabbitMQ, когда продукт создается или уровни запасов обновляются.
2. **history-service** слушает очередь RabbitMQ и записывает изменения в таблицу `history`.

---

## Тестирование

### От Автора =)
