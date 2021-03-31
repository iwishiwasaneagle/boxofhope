FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm ci

EXPOSE 3001

CMD ["npm", "start"]
