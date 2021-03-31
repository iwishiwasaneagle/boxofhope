FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
