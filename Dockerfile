FROM node:latest

WORKDIR /usr/app

COPY package*.json ./
COPY *.lock ./

RUN yarn

COPY . .

EXPOSE 5000

CMD [ "yarn", "run:container" ]