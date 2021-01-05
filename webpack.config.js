const path = require('path')
module.exports = {
  context: path.resolve(__dirname,'src'),
  entry: './index.ts',
  output: {
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test:  /\.ts/,
        use: 'ts-loader'
      }
    ]
  }
}