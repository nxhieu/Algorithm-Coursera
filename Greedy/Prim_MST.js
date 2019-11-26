const readMSTGraph = require("../utils/readMST");

const array = readMSTGraph("Greedy", "edges.txt");

let U_V = {};
function MSTcost(array) {
  // vertex that has been processed
  let I = [];
  // vertex adjacent to I

  addVertex(1, 0, I, array, U_V);

  for (let i = 1; i < array.length - 1; i++) {
    let minCost = Number.MAX_SAFE_INTEGER;
    let minIndex;
    for (let j in U_V) {
      if (U_V[j] < minCost && typeof I[j] === "undefined") {
        minIndex = j;
        minCost = U_V[j];
      }
    }

    addVertex(minIndex, minCost, I, array, U_V);
  }
  console.log(I);
  let distance = 0;
  for (let j in I) {
    distance = distance + I[j];
  }

  return distance;
}

function addVertex(vertex, minCost, I, array, U_V) {
  I[vertex] = minCost;
  // add vertex adjacent to X

  for (let i in array[vertex]) {
    if (
      !U_V[array[vertex][i].vertex] &&
      typeof I[array[vertex][i].vertex] === "undefined"
    ) {
      U_V[array[vertex][i].vertex] = array[vertex][i].cost;
    } else if (
      U_V[array[vertex][i].vertex] > array[vertex][i].cost &&
      typeof I[array[vertex][i].vertex] === "undefined"
    ) {
      U_V[array[vertex][i].vertex] = array[vertex][i].cost;
    }
  }
  delete U_V[vertex];
}
console.log(array);
console.log(MSTcost(array));
