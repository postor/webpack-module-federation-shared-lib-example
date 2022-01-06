const webpack = require('webpack')
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { ModuleFederationPlugin } = webpack.container

module.exports = {
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mf_component",
      filename: "remoteEntry.js",      
      remotes: {
        "mf-component": `mf_component@http://localhost:3000/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
      }
    }),
    new HtmlWebpackPlugin()
  ]
}
