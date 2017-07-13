const cytoscape = require('cytoscape')
const cytoscapeDagre = require('cytoscape-dagre')
const {curry} = require('lodash')

cytoscapeDagre(cytoscape)

module.exports = curry((container, {nodes = [], edges = []}) =>
  cytoscape({
    container,
    elements: {
      nodes,
      edges
    },

    boxSelectionEnabled: false,
    autounselectify: true,
    zoom: 1,

    layout: {
      name: 'dagre'
    },

    style: [
      {
        selector: 'node',
        style: {
          'text-margin-x': -23,
          'content': 'data(id)',
          'text-opacity': 0.5,
          'color': '#fff',
          'text-valign': 'center',
          'text-halign': 'right',
          'background-color': '#424242'
        }
      },

      {
        selector: 'edge',
        style: {
          'text-margin-x': -20,
          'content': 'data(weight)',
          'width': 4,
          'target-arrow-shape': 'triangle',
          'line-color': '#BDBDBD',
          'target-arrow-color': '#9dbaea',
          'font-size': 13,
          'color': '#8D6E63'
        }
      },

      {
        selector: '.current',
        style: {
          'background-color': '#FF5722'
        }
      }
    ]
  })
)
