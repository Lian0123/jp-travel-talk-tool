const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        // include: [/node_modules\/kuroshiro/,/node_modules\/kuroshiro-analyzer-kuromoji/],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js' ],
    fallback: {
      "path": require.resolve("path-browserify")
    },
    modules: [
      'node_modules'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // plugins: [
  //   context: path.join(__dirname, './'),
  //   new CopyWebpackPlugin({
  //       patterns: [
  //           { from: 'static' }
  //       ]
  //   })
  // ]
};