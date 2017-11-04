FROM node:8.9.0

COPY . /pailan
COPY package.json /pailan/package.json
COPY .env /pailan/.env

WORKDIR /pailan

ENV NODE_ENV production
RUN npm install --production

CMD ["npm","start"]

EXPOSE 8888
