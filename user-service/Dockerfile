# Используем Node.js образ
FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальной код приложения
COPY . .

# Устанавливаем netcat
RUN apk add --no-cache netcat-openbsd

# Prisma
RUN npx prisma migrate dev --name init
RUN npx prisma generate
RUN npx ts-node prisma/seed.ts

# Собираем приложение
RUN npm run build

# Открываем порт сервиса
EXPOSE 3012

# Скрипт ожидания RabbitMQ с использованием nc
CMD while ! nc -z rabbitmq 5672; do sleep 1; done && npm run start:prod