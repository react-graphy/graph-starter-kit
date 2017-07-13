const prepareGraphCreator = require('./bootstrap')
const CommandQueue = require('./CommandQueue')
const viewGraphData = require('./topological-sort')

const graphData = {
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

const start = async () => {
  const createGraph = await prepareGraphCreator()
  const graph = createGraph(viewGraphData)

  console.log(viewGraphData)

  /* const queue = new CommandQueue([
    () => graph.remove('#n0'),
    () => graph.$('#n1').addClass('current')
  ])

  queue.execute() */
}

start()
