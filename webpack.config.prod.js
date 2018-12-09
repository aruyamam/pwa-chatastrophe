const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
   entry: [`${__dirname}/src/index.js`],
   output: {
      path: `${__dirname}/build`,
      filename: 'bundle.js',
      publicPath: './',
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
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
         },
         {
            exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
            loader: 'file-loader',
            options: {
               name: 'static/media/[name].[ext]',
            },
         },
      ],
   },
   plugins: [
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production'),
         },
      }),
      new HtmlWebpackPlugin({
         inject: true,
         template: `${__dirname}/public/index.html`,
         minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
         },
      }),
      new ManifestPlugin({
         fileName: 'asset-manifest.json',
      }),
   ],
   optimization: {
      minimizer: [
         new TerserPlugin({
            sourceMap: true,
         }),
      ],
   },
};
