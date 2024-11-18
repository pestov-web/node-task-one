FROM node:20-alpine

WORKDIR /history-service

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3011
CMD ["npm", "start"]
