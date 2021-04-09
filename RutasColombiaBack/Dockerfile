FROM node:latest

RUN mkdir -p /usr/src/RutasColombiaBack

WORKDIR /usr/src/RutasColombiaBack

COPY package*.json ./

RUN npm install

ENV SITIO=/usr/src/RutasColombiaBack/

COPY . .

EXPOSE 11001

CMD ["npm", "start"]
