import * as autoprefixer from 'autoprefixer'
import * as path from 'path'
import * as webpack from 'webpack'
import { map } from 'lodash'
import nodeExternals  = require('webpack-node-externals')
import { entrypointLoader } from './entrypointLoader'
import { getPluginLoader } from './getPluginLoader'

export interface WebpackConfigOpts {
  /** List of absolute paths to modules exporting routes */
  pages: string[],

  /** List of plugin configs */
  plugins: any
}

export function getWebpackConfig({ pages, plugins }: WebpackConfigOpts): webpack.Configuration[] {
  const extensions = ['.ts', '.tsx', '.js', '.jsx']
  const serverExtensions = [
    ...extensions.map((extension) => `.server${extension}`),
    ...extensions,
    '*'
  ]
  const clientExtensions = [
    ...extensions.map((extension) => `.client${extension}`),
    ...extensions,
    '*'
  ]

  const pluginModules = map(plugins, getPluginLoader)

  const sharedConfig: Partial<webpack.Configuration> = {
    devtool: 'cheap-module-source-map',

    module: {
      rules: [
        {
          test: /\.json$/,
          loader: require.resolve('json-loader'),
        },
        {
          test: /\.graphql$/,
          loader: require.resolve('graphql-tag/loader'),
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
  }

  return [
    {
      ...sharedConfig,

      name: 'client',

      resolve: {
        extensions: clientExtensions
      },

      resolveLoader: {
        extensions: clientExtensions
      },

      output: {
        path: path.join(process.cwd(), 'build'),
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
          topLevelModules: {
            pages,
            plugins: pluginModules
          },
        }),
      ],
    },
    {
      ...sharedConfig,

      name: 'server',

      target: 'node',

      externals: nodeExternals({
        whitelist: [
          // Exclude framework plugins
          // XXX: Exclude anything with a plugin-config.ts file
          /^@brightinteractive\/bright-js-framework/,
        ]
      }),

      resolve: {
        extensions: serverExtensions
      },

      resolveLoader: {
        extensions: serverExtensions
      },

      output: {
        path: path.join(process.cwd(), 'build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
      },

      entry: entrypointLoader({
        entry: require.resolve('../entry/server'),
        topLevelModules: {
          pages,
          plugins: pluginModules
        },
      }),
    }
  ]
}
