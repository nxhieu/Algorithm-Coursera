// The file contains the edges of a directed graph. Vertices are labeled as positive integers from 1 to 875714. Every row indicates an edge, the vertex label in first column is the tail and the vertex label in second column is the head (recall the graph is directed, and the edges are directed from the first column vertex to the second column vertex). So for example, the 11^{th}11
// th
//   row looks liks : "2 47646". This just means that the vertex with label 2 has an outgoing edge to the vertex with label 47646

// Your task is to code up the algorithm from the video lectures for computing strongly connected components (SCCs), and to run this algorithm on the given graph.

// Output Format: You should output the sizes of the 5 largest SCCs in the given graph, in decreasing order of sizes, separated by commas (avoid any spaces). So if your algorithm computes the sizes of the five largest SCCs to be 500, 400, 300, 200 and 100, then your answer should be "500,400,300,200,100" (without the quotes). If your algorithm finds less than 5 SCCs, then write 0 for the remaining terms. Thus, if your algorithm computes only 3 SCCs whose sizes are 400, 300, and 100, then your answer should be "400,300,100,0,0" (without the quotes). (Note also that your answer should not have any spaces in it.)

// WARNING: This is the most challenging programming assignment of the course. Because of the size of the graph you may have to manage memory carefully. The best way to do this depends on your programming language and environment, and we strongly suggest that you exchange tips for doing this on the discussion forums.

const readInput = require('../utils/readDiGraph');

const array = readInput('Graph-Scc', 'SCC.txt');

const edgeArray = array.result;

let largestVertex = array.largestVertex;

// edgeArray['875714'].push(true);

// let time = [];

let finishing_time = 0;

let finishtime_array = {};

let reversedArray = {};

let discovered = {};

let leader = [];

// discovered['875714'] = true;

// console.log(discovered['875714']);

// console.log(edgeArray['2'][0]);

function dfs_Loop(edgeArray) {
  for (let i = largestVertex; i > 0; i--) {
    if (!discovered[i]) {
      dfs(edgeArray, i);
    }
  }
}

function dfs(edgeArray, vertexI) {
  discovered[vertexI] = true;

  if (edgeArray[vertexI]) {
    // console.log(vertexI);
    for (let j_index = 0; j_index < edgeArray[vertexI].length; j_index++) {
      // console.log(edgeArray[`${vertexI}`].length);
      if (discovered[edgeArray[vertexI][j_index]] !== true) {
        // console.log(edgeArray[vertexI][j_index]);
        dfs(edgeArray, edgeArray[vertexI][j_index]);
      }
    }
  }
  ++finishing_time;
  finishtime_array[finishing_time] = vertexI;
  // discovered[`${vertexI}`] = false;
}

function reversedGraph(edgeArray) {
  for (let vertex in edgeArray) {
    edgeArray[vertex].forEach(edge => {
      if (!reversedArray[edge]) {
        reversedArray[edge] = [];
      }
      reversedArray[edge].push(parseInt(vertex));
    });
  }
  return reversedArray;
}

dfs_Loop(edgeArray);
reversedGraph(edgeArray);
console.log(reversedArray);
console.log(finishing_time);
// console.log(discovered);
// console.log(largestVertex);
