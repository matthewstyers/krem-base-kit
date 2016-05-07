FROM mhart/alpine-node:latest

RUN mkdir -p /app/client
ADD . /app/client
RUN apk add --no-cache make gcc g++ python
RUN npm install -g gulp@3.9.1 webpack@1.13.0
WORKDIR /app
RUN rm -f package.json && rm -rf node_modules
RUN cp /app/client/package.json . && npm install --no-optional


CMD npm start
