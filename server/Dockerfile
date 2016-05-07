FROM mhart/alpine-node:latest

ADD . /app/server
RUN cd /app && cp /app/server/keystone-0.4.0-alpha.tgz . && cp /app/server/package.json . && apk add --no-cache make gcc g++ python && npm install -g gulp@3.9.1 && npm install

CMD npm start
