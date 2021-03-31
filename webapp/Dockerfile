FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm ci

COPY . /usr/src/app

RUN echo "0.0.0.0 jheraspi.local" >> /etc/hosts

EXPOSE 3000

CMD ["npm", "start"]
