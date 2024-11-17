# Указываем базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /history-service

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код
COPY . .

# Указываем порт и команду запуска
EXPOSE 3001
CMD ["node", "src/app.js"]