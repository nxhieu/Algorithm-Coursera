// The file contains the adjacency list representation of a simple undirected graph. There are 200 vertices labeled 1 to 200. The first column in the file represents the vertex label, and the particular row (other entries except the first column) tells all the vertices that the vertex is adjacent to. So for example, the 6^{th}6
// the row looks like : "6	155	56	52	120	......". This just means that the vertex with label 6 is adjacent to (i.e., shares an edge with) the vertices with labels 155,56,52,120,......,etc

// Your task is to code up and run the randomized contraction algorithm for the min cut problem and use it on the above graph to compute the min cut. (HINT: Note that you'll have to figure out an implementation of edge contractions. Initially, you might want to do this naively, creating a new graph from the old every time there's an edge contraction. But you should also think about more efficient implementations.) (WARNING: As per the video lectures, please make sure to run the algorithm many times with different random seeds, and remember the smallest cut that you ever find.) Write your numeric answer in the space provided. So e.g., if your answer is 5, just type 5 in the space provided.

const _ = require("lodash");

const readInput = require("../utils/readGraph");

function RandomContraction() {
  const edgeArray = readInput("Graph-MinCut", "kargerMinCut.txt");

  let vertexArray = [];

  populateVertexArray(edgeArray, vertexArray);
  pickRandomEdge(edgeArray, vertexArray);
  let outComes = [];
  for (let i = 1; i < edgeArray.length; i++) {
    if (Array.isArray(edgeArray[i]) && edgeArray[i].length > 0) {
      outComes.push(edgeArray[i].length);
      if (outComes.length > 0) {
        return outComes;
      }
    }
  }
  return outComes;
}

function populateVertexArray(edgeArray, vertexArray) {
  for (let i = 0; i < edgeArray.length - 1; i++) {
    vertexArray[i] = i + 1;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random edge

function pickRandomEdge(edgeArray, vertexArray) {
  //get initial vertex that the edg
  if (vertexArray.length > 2) {
    // console.log(edgeArray, "edgeArray");
    let vertexA = _.sample(vertexArray);
    // console.log("A", vertexA);
    //get the other vertex that the vertex A adjacent to

    let indexvertexB = getRandomInt(0, edgeArray[vertexA].length - 1);

    let vertexB = edgeArray[vertexA][indexvertexB];

    let arrayVertexB = [];

    for (let k = 0; k < edgeArray[vertexA].length; k++) {
      if (edgeArray[vertexA][k] === vertexB) {
        arrayVertexB.push(k);
      }
    }

    // console.log("B", vertexB);
    // doubt this one
    let arrayVertexA = [];
    for (let i = 0; i < edgeArray[vertexB].length; i++) {
      if (edgeArray[vertexB][i] === vertexA) {
        arrayVertexA.push(i);
      }
    }
    // let indexvertexA = edgeArray[vertexB].findIndex(
    //   vertex => vertex === vertexA
    // );
    // removeSelfEdge(
    //   edgeArray,
    //   vertexArray,
    //   vertexA,
    //   vertexB,
    //   indexvertexB,
    //   indexvertexA
    // );
    // console.log(vertexArray);
    pickRandomEdge(
      removeSelfEdge(
        edgeArray,
        vertexArray,
        vertexA,
        vertexB,
        arrayVertexB,
        arrayVertexA
      ),
      vertexArray
    );
  } else {
    return edgeArray;
  }
}
//Remove self edge that points
function removeSelfEdge(
  edgeArray,
  vertexArray,
  vertexA,
  vertexB,
  arrayVertexB,
  arrayVertexA
) {
  // console.log(arrayVertexB, "delete array A");
  // console.log(arrayVertexA, "delele array B");

  //remove b point to a
  for (let j = 0, j2 = 0; j < arrayVertexB.length; j++) {
    // console.log(arrayVertexB[j]);

    edgeArray[vertexA].splice(arrayVertexB[j] + j2, 1);
    j2--;
  }

  //remove a point to b
  for (let k = 0, k2 = 0; k < arrayVertexA.length; k++) {
    edgeArray[vertexB].splice(arrayVertexA[k] + k2, 1);
    k2--;
  }
  // edgeArray[vertexB].splice(indexvertexA, 1);
  // remove vertex B from vertex Array
  for (let i = 0; i < vertexArray.length; i++) {
    if (vertexArray[i] === vertexB) {
      vertexArray.splice(i, 1);
    }
  }

  // change edge that point to B
  changeEdgePointer(edgeArray, vertexB, vertexA);
  //  change edge B to null because it has been merged to edge A
  edgeArray[vertexB] = null;

  return edgeArray;
}

function changeEdgePointer(edgeArray, vertexB, vertexA) {
  let edges = [];
  // console.log(vertexB);
  // add element of edge from B to an array
  for (let i = 0; i < edgeArray[vertexB].length; i++) {
    // console.log(array[vertexB][i]);
    // push to empty array
    edges.push(edgeArray[vertexB][i]);
    // push to vertex A
    edgeArray[vertexA].push(edgeArray[vertexB][i]);
  }
  // console.log(edges);
  // change edge that points to B => point to A
  for (let j = 0; j < edges.length; j++) {
    let vertex = edgeArray[edges[j]];

    if (vertex) {
      for (let k = 0; k < edgeArray[edges[j]].length; k++) {
        if (edgeArray[edges[j]][k] === vertexB) {
          edgeArray[edges[j]][k] = vertexA;
        }
      }
    }
  }
}

// array.splice(200, 1);
// console.log(array[0]);

// array.splice(1, 1);
// console.log(array.length);

module.exports = RandomContraction;

// console.log(RandomContraction());

// console.log(vertexArray[199]);
// console.log(pickRandomEdge(edgeArray, vertexArray), "here");
// let outComes = [];
// for (let i = 1; i < edgeArray.length; i++) {
//   if (Array.isArray(edgeArray[i]) && edgeArray[i].length > 0) {
//     outComes.push(edgeArray[i].length);
//   }
// }
// console.log(outComes);
// console.log(edgeArray.length);

// console.log(edgeArray[201]);
// console.log(edgeArray.length);

// console.log(getRandomInt(1, 3));
