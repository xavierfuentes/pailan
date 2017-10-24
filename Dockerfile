FROM node:8

COPY . /expensit
COPY package.json /expensit/package.json
COPY .env /expensit/.env

WORKDIR /expensit

ENV NODE_ENV production
RUN npm install --production

CMD ["npm","start"]

EXPOSE 8888
