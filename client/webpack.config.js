const path = require('path');
const webpack = require('webpack');
const httString = 'http://';
const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.DOCKER_MACHINE_IP;

const common = {
  context: path.resolve(__dirname),
  entry: {
    app: ['./src/app.js', './src/vendors/index.js']
  },
  module: {
    preLoaders: [{
      test: [/\.js$/, /\.jsx$/],
      include: path.join(__dirname, 'src'),
      loader: 'source-map-loader'
    }],
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-1'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.*css$/,
        include: path.join(__dirname, 'src'),
        exclude: /\.useable\.*css$/,
        loader: 'style!css!sass'
      },
      {
        test: [
          require.resolve('bootstrap')
        ],
        loader: 'imports?jQuery=jquery!imports?$=jquery!imports?Tether=tether'
      }
    ]
  },
  output: {
    path: path.resolve('./public/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether',
      'window.jQuery': 'jquery',
      'window.Tether': 'tether'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src')]
  }
};

exports.development = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './src',
    filename: 'bundle.js',
    hideModules: true,
    hot: true,
    proxy: {
      '*': httString.concat(HOSTNAME, ':', PORT)
    },
    publicPath: '/',
    quiet: false,
    staticOptions: {},
    stats: {
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: true,
      modules: true,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false
    },
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }
  },
  entry: common.entry,
  module: common.module,
  output: common.output,
  plugins: common.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'HOST': JSON.stringify(process.env.DOCKER_MACHINE_IP)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ),
  quiet: false,
  resolve: common.resolve,
  sassLoader: common.sassLoader
};

exports.production = {
  context: common.context,
  debug: false,
  devtool: 'cheap-module-source-map',
  entry: common.entry,
  module: common.module,
  output: {
    path: path.resolve('./public/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: common.plugins.concat(
    // new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ 'vendors', /* filename= */ 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        'HOST': JSON.stringify('new-line-properties-staging.herokuapp.com'),
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ),
  resolve: common.resolve,
  sassLoader: common.sassLoader
};
