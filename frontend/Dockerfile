FROM node:14.18-alpine AS node

WORKDIR /app

COPY package.json package-lock.json ./

EXPOSE 3000

RUN npm install

COPY . ./

CMD ["npm", "start"]