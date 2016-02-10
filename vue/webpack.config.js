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
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    }
    ]
  }
};
