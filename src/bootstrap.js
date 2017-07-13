const graphCreator = require('./graph-creator')
require('./app.css')

module.exports = graphCreator(document.getElementById('cy'))
