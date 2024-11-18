FROM node:20-alpine

# Устанавливаем рабочую директорию для сервиса
WORKDIR /history-service

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект (если у вас есть процесс сборки)
RUN npm run build

# Открываем порт 3011
EXPOSE 3011

# Запускаем сервис
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && npm start"]
