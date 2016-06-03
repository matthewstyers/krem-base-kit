FROM styers/keystone
ADD . /app/server
RUN npm install -g gulp@3.9.1 && cd /app && cp server/package.json . && npm install && npm link keystone
CMD npm start
