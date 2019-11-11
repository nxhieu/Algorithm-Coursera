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

let s = null;

let leader = {};

// discovered['875714'] = true;

// console.log(discovered['875714']);

// console.log(edgeArray['2'][0]);

function dfs_Loop(edgeArray) {
  for (let i = largestVertex; i > 0; i--) {
    if (!discovered[i]) {
      dfs_finishTime(edgeArray, i);
    }
  }
}
//loop from finishTime dictionary
function seconddfs_Loop(reversedArray) {
  discovered = {};

  for (let i = largestVertex; i > 0; i--) {
    if (!discovered[finishtime_array[i]]) {
      // console.log(finishtime_array[i]);s
      // discovered = {};
      s = i;
      dfs_leader(reversedArray, finishtime_array[i]);
    }
  }
}

function dfs_leader(reversedArray, vertexI) {
  discovered[vertexI] = true;

  setLeader(vertexI);
  if (reversedArray[vertexI]) {
    for (let j_index = 0; j_index < reversedArray[vertexI].length; j_index++) {
      if (discovered[reversedArray[vertexI][j_index]] !== true) {
        // console.log(reversedArray[vertexI][j_index], 's');
        // console.log(discovered);
        dfs_leader(reversedArray, reversedArray[vertexI][j_index]);
      }
    }
  }
}

function setLeader(vertexI) {
  // console.log(s);
  if (!leader[s]) {
    leader[s] = [];
  }
  leader[s].push(vertexI);
}

function dfs_finishTime(edgeArray, vertexI) {
  discovered[vertexI] = true;

  if (edgeArray[vertexI]) {
    for (let j_index = 0; j_index < edgeArray[vertexI].length; j_index++) {
      if (discovered[edgeArray[vertexI][j_index]] !== true) {
        dfs_finishTime(edgeArray, edgeArray[vertexI][j_index]);
      }
    }
  }
  ++finishing_time;
  finishtime_array[finishing_time] = vertexI;
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

seconddfs_Loop(reversedGraph(edgeArray));

// find the largest
let leaderRange = [];

for (let vertex in leader) {
  leaderRange.push(leader[vertex].length);
}

// console.log(discovered, 'final');
// const quicksort = require('../QuickSort/quicksort_medianelement');

// quicksort(leaderRange, 0, leaderRange - 1);
// console.log(leaderRange);

leaderRange.sort(function(a, b) {
  return b - a;
});
console.log(leaderRange);

// console.log(reversedArray);
// console.log(largestVertex);
// console.log(finishtime_array[1]);
// console.log(finishing_time);
// console.log(discovered);
// console.log(largestVertex);
