/* eslint no-console: 0 */

const config = require('./webpack.config').development;
const PORT = process.env.PORT || 8080;
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const winston = require('winston');

const socketBase = 'webpack-dev-server/client?';

config.entry.app.unshift(socketBase.concat('http://', process.env.DOCKER_MACHINE_IP, ':', process.env.PORT, '/'), 'webpack/hot/dev-server');

const compiler = webpack(config);
const app = new WebpackDevServer(compiler, config.devServer);

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }
});
