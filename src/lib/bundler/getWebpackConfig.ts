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
      extensions
    },

    resolveLoader: {
      extensions
    },

    module: {
      rules: [
        {
          test: /\.json$/,
          loader: require.resolve('json-loader'),
        },
        {
          test: /\.tsx?$/,
          use: [
            require.resolve('source-map-loader'),
            {
              loader: require.resolve('ts-loader'),
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
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                localIdentName: '[local]__[name]',
                modules: true,
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: () => [
                  autoprefixer(),
                ],
              },
            },
            require.resolve('sass-loader'),
          ],
        },
        {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
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
          loader: require.resolve('url-loader'),
          options: {
            name: 'img/[hash].[ext]',
            publicPath: '/',
            limit: 25000,
          },
        },
      ],
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin({
        requestTimeout: 2000
      }),
      new webpack.NoEmitOnErrorsPlugin(),
    ],

    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
    },

    entry: [
      require.resolve('react-error-overlay'),
      require.resolve('../entry/errorDisplay'),
      'webpack-hot-middleware/client?path=/_hot&reload=true&timeout=2000&overlay=false',
      'core-js/shim',
      'whatwg-fetch',
      entrypointLoader({
        entry: require.resolve('../entry/client'),
        topLevelModules: entrypoints,
        configFile: path.resolve(path.join('src', 'config.ts'))
      }),
    ],
  }
}
