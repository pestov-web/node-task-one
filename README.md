# Демонстрация работы

### inventory-service

- GET / POST [https://inventory.pestov-web.ru/products](https://inventory.pestov-web.ru/products)
- GET / POST [https://inventory.pestov-web.ru/stocks](https://inventory.pestov-web.ru/stocks)
- PATCH [https://inventory.pestov-web.ru/stocks/increase](https://inventory.pestov-web.ru/stocks/increase)
- PATCH [https://inventory.pestov-web.ru/stocks/decrease](https://inventory.pestov-web.ru/stocks/decrease)

### history-service

- GET [https://history.pestov-web.ru/history](https://history.pestov-web.ru/history)

### users-service

- POST [https://users.pestov-web.ru/users/reset-issues](https://users.pestov-web.ru/users/reset-issues)

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
   git clone https://github.com/pestov-web/node-task-one.git
   cd node-task-one
   ```

2. Соберите и запустите сервисы с помощью Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Создайте базы данных и при необходимости наполните данными.

- перейдите в корень проекта

* создайте базы и таблицы для сервисов history и inventory
  ```bash
  psql -h localhost -p 5432 -U user -d postgres -f init_schema.sql
  ```
* заполните базы демо данными при необходимости
  ```bash
  psql -h localhost -p 5432 -U user -d postgres -f seed_shop.sql
  ```
  - перейдите в папку user-service
* выполните миграцию для сервиса user
  ```bash
  npx prisma migrate dev --name init
  ```
* сгенирируйте библиотеки клиента для вашей архитектуры

  ```bash
  npx prisma generate
  ```

  - заполните базу пользователями

  ```bash
   npx ts-node prisma/seed.ts
  ```

4. Сервисы будут доступны на следующих портах:
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

- **products**: Содержит информацию о продуктах.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор продукта.
  - `plu` (VARCHAR(50), UNIQUE): Уникальный код продукта.
  - `name` (VARCHAR(255)): Название продукта.

- **stocks**: Хранит информацию о запасах продуктов в магазинах.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор записи.
  - `plu` (VARCHAR(50)): Код продукта (ссылается на `products.plu`).
  - `shop_id` (INT): Идентификатор магазина (ссылается на `shops.id`).
  - `shelf_quantity` (INT): Количество продукта на полке.
  - `order_quantity` (INT): Количество продукта в заказах.

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

---

### 3. **user-service**: База данных пользователей

#### Таблица

- **history**: Хранит информацию о пользователях.

  - `id` (INT, PRIMARY KEY): Уникальный идентификатор записи.
  - `firstName` (VARCHAR(50)): Имя пользователя.
  - `lastName` (VARCHAR(50)): Фамилия пользователя.
  - `age` (INT, DEFAULT 0): Возраст пользователя.
  - `gender` (VARCHAR(50)): Пол пользователя.
  - `hasIssues` (BOOLEAN): Есть ли у пользователя проблемы.

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
- **POST**: Создать остатки.
  - **Тело запроса**:
    ```json
    {
      "shopId": 1,
      "plu": "000111",
      "shelfQuantity": 1,
      "orderQuantity": 12
    }
    ```

#### `/stocks/increase  /stock/decrease`

- **PATCH**: Увеличить или уменьшить остатки.
  - **Тело запроса**:
    ```json
    {
      "shopId": 1,
      "plu": "000111",
      "shelfQuantity": 1,
      "orderQuantity": 12
    }
    ```

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

### 3. **user-service**

#### `/users/reset-issues`

- **POST**: Меняет значение `hasIssues` на false у всех пользователей и возвращает количество измененых значений .
  - **Пример ответа**:
    ```json
    {
      "affectedUsers": 1234
    }
    ```

---

## Взаимодействие сервисов

1. **inventory-service** отправляет сообщения в RabbitMQ, когда продукт создается или уровни запасов обновляются.
2. **history-service** слушает очередь RabbitMQ и записывает изменения в таблицу `history`.

---

