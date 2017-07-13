const createGraph = require('./bootstrap')

const init = () => {
  const graph1 = {
    nodes: [
      { data: { id: 'n0', weight: 60 }, classes: 'current' },
      { data: { id: 'n1' } },
      { data: { id: 'n2' } },
      { data: { id: 'n3' } },
      { data: { id: 'n4' } },
      { data: { id: 'n5' } }
    ],
    edges: [
      { data: { id: '234', source: 'n0', target: 'n1', weight: '10'}},
      { data: { source: 'n1', target: 'n2' } },
      { data: { source: 'n1', target: 'n3' } },
      { data: { source: 'n4', target: 'n5' } },
      { data: { source: 'n0', target: 'n4' } }
    ]
  }

  const graph = createGraph(graph1)
  
  setTimeout(() => {
    graph.remove('#n0')

    setTimeout(() => {
      graph.$('#n1').addClass('current')
    }, 1000)
  }, 1000)
}

document.addEventListener('DOMContentLoaded', init, false)
