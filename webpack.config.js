const path = require('path');
module.exports = {
  entry: {
    'main': '/src/assets/javascript/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/javascript'),
    filename: '[name].js'
  }
};