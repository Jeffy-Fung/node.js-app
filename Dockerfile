FROM node:20.17.0

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
