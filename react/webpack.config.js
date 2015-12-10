module.exports = {
  entry: {
    entryListApp: './EntryListApp'
  },
  output: {
    filename: 'public/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['jsx', 'babel'],
        exclude: /node_modules/
      }
    ]
  },
};
