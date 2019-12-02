// sort the edge
// for i =  1 to m -4
// if T has no cycle (check using union find) => add to T => change the leader of the group with smaller number vertexes
// return T

/*
  result 106

*/

const readGraph = require("../utils/readEdges");

const UnionFind = require("./unionFind");

let array = readGraph("Greedy_Kruskal", "clustering_small.txt");

//sort the array using quicksort (choose pivot using median of three)

function quickSort(array, left, right) {
  if (left < right) {
    let position = partitionRoutine(array, left, right);

    quickSort(array, left, position - 1);

    quickSort(array, position + 1, right);
  }
}

function partitionRoutine(array, left, right) {
  let pivot = choosePivot(array, left, right);
  swap(array, left, pivot);
  let i = left + 1;
  for (let j = i + 1; j < right; j++) {
    if (array[j].cost < array[left].cost) {
      swap(array, i, j);
      i++;
    }
  }
  //swap the last element
  swap(array, i - 1, left);
  return i - 1;
}

function choosePivot(array, left, right) {
  let middle = Math.floor((left + right) / 2);
  let pivotCandidates = [
    array[left].cost,
    array[middle].cost,
    array[right].cost
  ];
  selectionSort(pivotCandidates);
  if (array[left].cost === pivotCandidates[1]) {
    return left;
  } else if (array[right].cost === pivotCandidates[1]) {
    return right;
  } else {
    return middle;
  }
}

function selectionSort(array) {
  let minIndex;
  for (let i = 0; i < array.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(array, minIndex, i);
    }
  }
}

function swap(array, firstElement, secondElement) {
  let temp = array[firstElement];
  array[firstElement] = array[secondElement];
  array[secondElement] = temp;
}

// sort edges
function sort(array) {
  quickSort(array, 0, array.length - 1);
}

function MST(array) {
  sort(array);

  // let leaderArray = {};
  const unionFind = new UnionFind();

  for (let i = 0; i < array.length - 100; i++) {
    if (unionFind.returnCluster() <= 3) {
      break;
    }
    if (!isCyclic(unionFind, array[i])) {
      //add i to leader
      addLeader(array[i], unionFind);
    }
  }
  return unionFind.returnArray();
}
// check if adding the edge will create cyclic
function isCyclic(unionFind, edge) {
  let vertexU = edge.vertexU;
  let vertexV = edge.vertexV;
  // console.log(vertexV);
  if (
    typeof unionFind.find(vertexV) === "undefined" &&
    typeof unionFind.find(vertexU) === "undefined"
  ) {
    return false;
  } else {
    return unionFind.find(vertexV) === unionFind.find(vertexU);
  }
}

function addLeader(edge, unionFind) {
  let vertexU = edge.vertexU;
  let vertexV = edge.vertexV;
  let cost = edge.cost;
  unionFind.add({ vertexU, vertexV, cost });
}

let leaders = MST(array);
let i = 0;
console.log(leaders);
// for (let leader of leaders) {
//   // console.log(leader);
//   if (leader !== 9) {
//     console.log(i);
//   }
//   i++;
// }
