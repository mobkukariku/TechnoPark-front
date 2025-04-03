FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем все зависимости (включая dev-зависимости для сборки)
RUN npm install --legacy-peer-deps

# Копируем весь проект
COPY . .

# Билдим Next.js приложение
RUN npm run build

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start"]
