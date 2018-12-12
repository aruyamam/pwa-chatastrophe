const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config({ path: '.env' });

module.exports = {
   entry: ['babel-polyfill', `${__dirname}/src/index.js`, `${__dirname}/src/styles/style.scss`],
   output: {
      path: `${__dirname}/public`,
      filename: 'bundle.js',
      publicPath: '/',
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env', '@babel/preset-react'],
               plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties'],
            },
         },
         {
            test: /\.s?css$/,
            use: [
               MiniCSSExtractPlugin.loader,
               { loader: 'css-loader' },
               {
                  loader: 'postcss-loader',
                  options: {
                     sourceMap: true,
                     plugins: [require('autoprefixer')],
                  },
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new webpack.DefinePlugin({
         'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
         'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
         'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
         'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
         'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
         'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
            process.env.FIREBASE_MESSAGING_SENDER_ID,
         ),
      }),
      new HtmlWebpackPlugin({
         inject: true,
         template: `${__dirname}/public/index.html`,
      }),
      new MiniCSSExtractPlugin({
         filename: 'style.css',
      }),
   ],
   devServer: {
      contentBase: './public',
      watchContentBase: true,
      historyApiFallback: true,
      inline: true,
      hot: true,
   },
};
