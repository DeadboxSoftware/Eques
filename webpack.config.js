var path = require('path');
var fs = require('fs');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {

  let plugins, optimization, JSFilename;

  if(env.NODE_ENV === 'dev'){
    JSFilename = 'js/[name].js';
    plugins = [

      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 8090,
          open: false,
          server: { baseDir: ['./dist'] }
        },
        {
          reload: true
        }
      ),
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: false
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'src/vendor',
          to: 'js',
        },
        {
          from: 'src/video',
          to: 'video',
        },
        {
          from: 'src/html',
          to: './'
        },
        {
          from: 'src/fonts',
          to: 'fonts'
        }
      ]),
      // new RemoveUnwantedFiles()
    ];
    optimization = {};
  }
  else if(env.NODE_ENV === 'production'){
    console.log('PRODUCTION BUILD')
    JSFilename = 'js/[name].min.js';
    plugins = [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].min.css'
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: false
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'src/vendor',
          to: 'js',
        },
        {
          from: 'src/video',
          to: 'video',
        },
        {
          from: 'src/html',
          to: './'
        },
        {
          from: 'src/fonts',
          to: 'fonts'
        }
      ]),
    ];
    optimization = {
      minimize: true,
      splitChunks: {
        chunks: "async",
        minSize: 1000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
        }
      }
    };
  }
  else{
    console.log('INCORRECT BUILD OPTIONS ENV NOT CORRECT!')
    return;
  }

  return {
    entry: {
      polyfills: './src/js/polyfills/index.js',
      deadbox: ['./src/scss/main.scss', './src/js/index.js']
    },
    optimization: optimization,
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: JSFilename,
      library: "deadbox",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {}
    },
    plugins: plugins
  }
};

class RemoveUnwantedFiles {

  apply(compiler) {
    compiler.hooks.done.tap('RemoveUnwantedFilesPlugin', params => {

      fs.rm('./dist/js/css', { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
      });

    });
  }

}
