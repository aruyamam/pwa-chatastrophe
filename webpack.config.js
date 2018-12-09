var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: [__dirname + '/src/index.js'],
   output: {
      path: __dirname + '/public',
      filename: 'bundle.js',
      publicPath: '/'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env', '@babel/preset-react'],
               plugins: [
                  'react-hot-loader/babel',
                  '@babel/plugin-proposal-class-properties'
               ]
            }
         },
         {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
         }
      ]
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         inject: true,
         template: __dirname + '/public/index.html'
      })
   ],
   devServer: {
      contentBase: './public',
      historyApiFallback: true,
      inline: true,
      hot: true
   }
};
