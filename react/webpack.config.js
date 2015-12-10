module.exports = {
  entry: {
    entryListApp: './src/EntryListApp'
  },
  output: {
    filename: 'public/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx',
        exclude: /node_modules/
      }
    ]
  },
};
