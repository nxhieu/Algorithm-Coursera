const fs = require("fs");

const path = require("path");

const readDiGraph = (directoryname, filename, options) => {
  let largestVertex = 0;
  let result = {};
  const array = fs
    .readFileSync(path.join(__dirname, "..", directoryname, filename))
    .toString()
    .split("\n");

  array.forEach(function(line) {
    let rawLine = line.trim();
    if (rawLine) {
      let vertexEdge = rawLine.split(" ");
      var vertex = parseInt(vertexEdge[0]);
      var edge = parseInt(vertexEdge[1]);
      // console.log(vertex);
      // digraph.addEdge(vertex, edge);
      if (vertex > largestVertex) {
        largestVertex = vertex;
      }
      if (!result[vertex]) {
        result[vertex] = [];
      }
      result[vertex].push(edge);
    }
  });
  // for (let i = 0; i < array.length; i++) {
  //   let rawlines = array[i].trim();
  //   if (rawlines) {
  //     let splitline = rawlines.split("\t");
  //     result[splitline[0]] = splitline
  //       .slice(1)
  //       .map(element => parseInt(element));
  //   }
  // }

  return { largestVertex, result };
};

// const addEdge = (vertex, edge) => {
//   if (vertex) {
//   }
// };

module.exports = readDiGraph;
