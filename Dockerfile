FROM node:16

WORKDIR /usr/app

COPY . .

RUN npm i

EXPOSE 4156

CMD [ "npm", "run", "deploy" ]