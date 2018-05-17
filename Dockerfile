FROM node:8.9

COPY package.json package-lock.json /app/

WORKDIR /app/

RUN npm install

COPY . /app/

RUN npm run server

CMD node build/app.js

EXPOSE 8010
