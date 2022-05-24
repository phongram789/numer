FROM node:alpine3.11

WORKDIR /app

COPY package.json /app
COPY package-lock.json .

RUN npm install

COPY . /app

CMD ["npm","start"]