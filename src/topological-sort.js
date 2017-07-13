'use strict'

const _ = require('lodash')

const addVertex = adjacencyList => (id, title = null) => (adjacentVertex = []) => {
  adjacencyList[id] = {
    id,
    title,
    adjacent: adjacentVertex
  }

  return adjacencyList
}

const adjacencyList = {}
const addVertexToGraph = addVertex(adjacencyList)

addVertexToGraph(1, 'Трусы')([3])
addVertexToGraph(2, 'Носки')([4])
addVertexToGraph(3, 'Шорты')([4, 5])
addVertexToGraph(4, 'Рейтузы')([6])
addVertexToGraph(5, 'Паховая защита')([6])
addVertexToGraph(6, 'Штаны')([7, 11])
addVertexToGraph(7, 'Коньки')([8])
addVertexToGraph(8, 'Щитки для ног')([13])
addVertexToGraph(9, 'Футболка')([10])
addVertexToGraph(10, 'Нагрудник')([11])
addVertexToGraph(11, 'Свитер')([12])
addVertexToGraph(12, 'Маска')([13])
addVertexToGraph(13, 'Ловушка')([14])
addVertexToGraph(14, 'Щиток')([])

/* const graphData = {
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
} */

// '6': { id: 6, title: 'Штаны', adjacent: [ 7, 11 ] }
const viewGraphData = _.reduce(adjacencyList, (acc, vertex) => {
  acc.nodes.push({
    data: {id: vertex.id, title: vertex.title}
  })

  vertex.adjacent.forEach(
    adjacentId => acc.edges.push({data: {source: vertex.id, target: adjacentId}})
  )

  return acc
}, {
  nodes: [],
  edges: []
})

module.exports = viewGraphData

console.log('\n\n', JSON.stringify(viewGraphData, null, 4))

const topologicalSort = (adjacencyMap) => {
  const adjacencyArray = Object.keys(adjacencyMap)

  let vertexIncomingDegree = Array.from(
        {length: adjacencyArray.length},
        element => 0
    )

    // Подсчитываем для каждого вершины входящую степень.
  adjacencyArray.forEach(vertexId => {
    const vertex = adjacencyMap[vertexId]

    vertex.adjacent.forEach((id) => {
      vertexIncomingDegree[id - 1]++
    })
  })

  let vertexIdsWithoutIncomingDegree = []

    // Определяем вершину с нулевой входящей степенью
  vertexIncomingDegree.forEach((value, index) => {
    if (value === 0) {
      vertexIdsWithoutIncomingDegree.push(index + 1)
    }
  })

  let sortedGraph = []

  while (vertexIdsWithoutIncomingDegree.length !== 0) {
    const id = vertexIdsWithoutIncomingDegree.shift()
    const vertex = adjacencyMap[id]

    sortedGraph.push(vertex)

        // Уменьшаем входящую степень, у смежных вершин.
    vertex.adjacent.forEach((vertexId) => {
      vertexIncomingDegree[vertexId - 1]--

      if (vertexIncomingDegree[vertexId - 1] === 0) {
        vertexIdsWithoutIncomingDegree.unshift(vertexId)
      }
    })
  }

  return sortedGraph
}

const sortedGraph = topologicalSort(adjacencyList)

sortedGraph.forEach(vertex => console.log(vertex.title))
