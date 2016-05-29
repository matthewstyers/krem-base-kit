FROM mhart/alpine-node:latest
ADD . /app/client
RUN apk add --no-cache make gcc g++ python && npm install -g gulp@3.9.1 webpack@1.13.0 && cd /app && cp /app/client/package.json . && npm install --no-optional
CMD npm start
