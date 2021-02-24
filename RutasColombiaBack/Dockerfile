FROM node:latest

RUN mkdir -p /usr/src/RutasColombiaBack

WORKDIR /usr/src/RutasColombiaBack

COPY package*.json ./

RUN npm install

COPY . .
