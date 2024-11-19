# Используем Node.js образ
FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальной код приложения
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт сервиса
EXPOSE 3012

# Запускаем приложение
CMD ["npm", "run", "start:prod"]