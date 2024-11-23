FROM node:16
WORKDIR /app
COPY . .
EXPOSE 8090
CMD ["sh", "-c", "npm install && npm start"]