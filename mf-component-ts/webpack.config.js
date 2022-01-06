const webpack = require('webpack')
const { join } = require('path')
const { ModuleFederationPlugin } = webpack.container

module.exports = {
  entry: './src/index.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
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
      exposes: {
        './src/ComponentA': './src/ComponentA.tsx'
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
  ]
}
