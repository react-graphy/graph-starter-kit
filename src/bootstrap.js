const graphCreator = require('./graph-creator')
require('./app.css')

module.exports = async () => new Promise((resolve, reject) => {
  document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('cy')

    if (!node) {
      return reject(new Error('Node element not found!'))
    }

    resolve(graphCreator(node))
  })
})
