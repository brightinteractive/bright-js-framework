import * as autoprefixer from 'autoprefixer'
import * as path from 'path'
import * as webpack from 'webpack'
import * as ExtractText from 'extract-text-webpack-plugin'
import ImageMin from 'imagemin-webpack-plugin'
import nodeExternals  = require('webpack-node-externals')
import { entrypointLoader } from './entrypointLoader'
import { getPluginEntrypoints } from './PluginLoader'

const extensions = ['.ts', '.tsx', '.js', '.jsx']

// If a module has a specific server-side version, give it prescidence when building for server
export const serverExtensions = [
  ...extensions.map((extension) => `.server${extension}`),
  ...extensions,
  '*'
]

// If a module has a specific client-side version, give it prescidence when building for client
export const clientExtensions = [
  ...extensions.map((extension) => `.client${extension}`),
  ...extensions,
  '*'
]

export interface WebpackConfigOpts {
  /** List of absolute paths to modules exporting routes */
  pages: string[],

  /** List of plugin configs */
  plugins: any

  devServer: boolean
}

export function getWebpackConfig({ pages, plugins, devServer }: WebpackConfigOpts): webpack.Configuration[] {
  const sharedConfig: Partial<webpack.Configuration> = {
    devtool: devServer ? 'cheap-module-source-map' : undefined,

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
          use: styleLoader(
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                localIdentName: '[local]__[name]',
                modules: true,
                sourceMap: true,
                minimize: !devServer
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
          ),
        },
        {
          test: /\.css$/,
          use: styleLoader(
            {
              loader: require.resolve('css-loader'),
              options: {
                minimize: !devServer
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer(),
                ],
              },
            },
          ),
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
      ...ifDevelopment(
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin({
          requestTimeout: 2000
        }),
        new webpack.NoEmitOnErrorsPlugin(),
      ),
      ...ifProduction(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ImageMin()
      )
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

      plugins: [
        ...sharedConfig.plugins || [],
        ...ifProduction(
          new ExtractText({ filename: 'style.css' })
        )
      ],

      output: {
        path: path.join(process.cwd(), 'build', 'public'),
        filename: 'bundle.js',
      },

      entry: [
        'core-js/shim',
        'whatwg-fetch',
        ...ifDevelopment(
          require.resolve('react-error-overlay'),
          require.resolve('../entry/errorDisplay'),
          'webpack-hot-middleware/client?path=/_hot&reload=true&timeout=2000&overlay=false',
        ),
        entrypointLoader({
          entry: require.resolve('../entry/client'),
          topLevelModules: {
            pages,
            plugins: getPluginEntrypoints(plugins, 'client')
          },
        }),
      ],
    },
    {
      ...sharedConfig,

      name: 'server',

      target: 'node',

      // Don't include external modules in the server bundle
      externals: nodeExternals({
        whitelist: [
          // XXX: Plugins need to be loaded using webpack, otherwise they don't handle
          // client/server distinctions, live-reloading, resource loading properly.
          // This presents a problem for plugins in external modules. As a temp workaround,
          // we bundle the framework using webpack too so that built-in plugins behave as expected.
          //
          // Would be better to extract external plugin paths from the plugin config, although this
          // raises issues for locally linked modules.
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
        path: path.join(process.cwd(), 'build', 'server'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs2',
      },

      entry: entrypointLoader({
        entry: require.resolve('../entry/server'),
        topLevelModules: {
          pages,
          plugins: getPluginEntrypoints(plugins, 'server')
        },
      }),
    }
  ]

  function ifDevelopment<T>(...xs: T[]): T[] {
    return devServer ? xs : []
  }

  function ifProduction<T>(...xs: T[]): T[] {
    return !devServer ? xs : []
  }

  function styleLoader(...loaders: webpack.Loader[]) {
    if (devServer) {
      return [require.resolve('style-loader'), ...loaders]
    }

    return ExtractText.extract(loaders)
  }
}
