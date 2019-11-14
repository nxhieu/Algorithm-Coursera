// The file contains an adjacency list representation of an undirected weighted graph with 200 vertices labeled 1 to 200. Each row consists of the node tuples that are adjacent to that particular vertex along with the length of that edge. For example, the 6th row has 6 as the first entry indicating that this row corresponds to the vertex labeled 6. The next entry of this row "141,8200" indicates that there is an edge between vertex 6 and vertex 141 that has length 8200. The rest of the pairs of this row indicate the other vertices adjacent to vertex 6 and the lengths of the corresponding edges.

// Your task is to run Dijkstra's shortest-path algorithm on this graph, using 1 (the first vertex) as the source vertex, and to compute the shortest-path distances between 1 and every other vertex of the graph. If there is no path between a vertex vv and vertex 1, we'll define the shortest-path distance between 1 and vv to be 1000000.

// You should report the shortest-path distances to the following ten vertices, in order: 7,37,59,82,99,115,133,165,188,197. You should encode the distances as a comma-separated string of integers. So if you find that all ten of these vertices except 115 are at distance 1000 away from vertex 1 and 115 is 2000 distance away, then your answer should be 1000,1000,1000,1000,1000,2000,1000,1000,1000,1000. Remember the order of reporting DOES MATTER, and the string should be in the same order in which the above ten vertices are given. The string should not contain any spaces. Please type your answer in the space provided.

// IMPLEMENTATION NOTES: This graph is small enough that the straightforward O(mn)O(mn) time implementation of Dijkstra's algorithm should work fine. OPTIONAL: For those of you seeking an additional challenge, try implementing the heap-based version. Note this requires a heap that supports deletions, and you'll probably need to maintain some kind of mapping between vertices and their positions in the heap.

const readInput = require("../utils/readDjikstra");

const VX = readInput("Graph-Dijkstra", "Dijkstra.txt").result;

let X = {};

let A = {};

let prev = {};

// console.log(VX);s

//while loop
// assign distance value to the source vertex . other vertex assigned infi
// update the vertex with minimum distance value
// outer iteration: pick one that has minimum djikstra greedy score (A(v) + lvw)
// include u  to X
//
function Dijkstra(A, VX) {
  // add source vertex
  let i = 0;
  addVertex(0, 1);

  // Main while loop
  while (i <= 199) {
    let minScore = 99999;
    let minIndex;
    // console.log('')
    //look for min greedy score
    for (let j in A) {
      // console.log(j);
      if (minScore > A[j] && typeof X[j] === "undefined") {
        minScore = A[j];
        minIndex = j;
      }
    }

    // console.log(minScore);
    // add vertex to processed vertex
    addVertex(minScore, minIndex);

    // X[minIndex] = A[minIndex];

    i++;
  }
}
// add source vertex
function addVertex(distance, index) {
  X[index] = distance;
  A[index] = distance;
  for (let i in VX[index]) {
    // if greedy doesnt exist
    if (!A[i] && typeof X[i] === "undefined") {
      A[i] = A[index] + VX[index][i];
      prev[i] = parseInt(index);
    }
    // If greedy score is smaller
    if (A[i] > A[index] + VX[index][i] && typeof X[i] === "undefined") {
      A[i] = A[index] + VX[index][i];
      prev[i] = parseInt(index);
    }
    //
  }
  //update vertex adjent to source vertex
}

Dijkstra(A, VX);

// sad
// A["3"] = 1;

console.log(A, "X : ", X);
// console.log(prev);
