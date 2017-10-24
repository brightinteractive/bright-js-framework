import * as autoprefixer from 'autoprefixer'
import * as path from 'path'
import * as webpack from 'webpack'
import { entrypointLoader } from './entrypointLoader'

export interface WebpackConfigOpts {
  /** List of absolute paths to modules exporting routes */
  entrypoints: string[]
}

export function getWebpackConfig({ entrypoints }: WebpackConfigOpts): webpack.Configuration {
  const extensions = ['.ts', '.tsx', '.js', '.jsx']

  return {
    devtool: 'cheap-module-source-map',

    resolve: {
      extensions,
      modules: [
        // Needed to run locally linked version
        path.resolve(__dirname, '../../node_modules'),
        'node_modules'
      ]
    },

    resolveLoader: {
      extensions,
      modules: [
        // Needed to run locally linked version
        path.resolve(__dirname, '../../node_modules'),
        'node_modules'
      ]
    },

    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            'source-map-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  noEmitOnError: false,
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[local]__[name]',
                modules: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer(),
                ],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer(),
                ],
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2|jpg|jpeg|png|svg)$/,
          loader: 'url-loader',
          options: {
            name: 'img/[hash].[ext]',
            publicPath: '/',
            limit: 25000,
          },
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],

    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
    },

    entry: [
      'webpack-hot-middleware/client?reload=true&timeout=2000&overlay=false',
      'core-js/shim',
      'whatwg-fetch',
      entrypointLoader({
        entry: path.resolve(__dirname, '../entry/client'),
        topLevelModules: entrypoints
      }),
    ],
  }
}
