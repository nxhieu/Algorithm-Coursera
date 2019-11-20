const fs = require("fs");

const path = require("path");

const readDiGraph = (directoryname, filename, options) => {
  let result = {};
  const array = fs
    .readFileSync(path.join(__dirname, "..", directoryname, filename))
    .toString()
    .trim()
    .split(/\r?\n/);
  array.forEach(function(line) {
    let rawline = line.split("\t");
    if (rawline) {
      let vertexKey = rawline[0];
      let vertexEdges = {};
      // let vertexEdge = rawline.split(",");
      for (let j = 1; j < rawline.length; j++) {
        var edge = rawline[j].split(",");
        if (edge[0]) {
          vertexEdges[edge[0]] = parseInt(edge[1]);
        }
      }
      result[vertexKey] = vertexEdges;

      // let vertex = parseInt(vertexEdge[0]);
    }
  });

  // array.forEach(function(line) {
  //   let rawLine = line.trim();
  //   if (rawLine) {
  //     let vertexEdge = rawLine.split(' ');
  //     var vertex = parseInt(vertexEdge[0]);
  //     var edge = parseInt(vertexEdge[1]);
  //     // console.log(vertex);
  //     // digraph.addEdge(vertex, edge);
  //     if (vertex > largestVertex) {
  //       largestVertex = vertex;
  //     }
  //     if (!result[vertex]) {
  //       result[vertex] = [];
  //     }
  //     result[vertex].push(edge);
  //   }
  // });

  return { array, result };
};

// const addEdge = (vertex, edge) => {
//   if (vertex) {
//   }
// };

module.exports = readDiGraph;
