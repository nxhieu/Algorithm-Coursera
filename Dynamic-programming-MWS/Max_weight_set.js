/**
 * 3.Question 3
In this programming problem you'll code up the dynamic programming algorithm for computing a maximum-weight independent set of a path graph.

Download the text file below.

mwis.txt
This file describes the weights of the vertices in a path graph (with the weights listed in the order in which vertices appear in the path). It has the following format:

[number_of_vertices]

[weight of first vertex]

[weight of second vertex]

...

For example, the third line of the file is "6395702," indicating that the weight of the second vertex of the graph is 6395702.

Your task in this problem is to run the dynamic programming algorithm (and the reconstruction procedure) from lecture on this data set. The question is: of the vertices 1, 2, 3, 4, 17, 117, 517, and 997, which ones belong to the maximum-weight independent set? (By "vertex 1" we mean the first vertex of the graph---there is no vertex 0.) In the box below, enter a 8-bit string, where the ith bit should be 1 if the ith of these 8 vertices is in the maximum-weight independent set, and 0 otherwise. For example, if you think that the vertices 1, 4, 17, and 517 are in the maximum-weight independent set and the other four vertices are not, then you should enter the string 10011010 in the box below.
 * 
 * answer: 10100110
 */
const readInterger = require("../utils/readInterger");

const array = readInterger("Dynamic-programming-MWS", "mwis.txt");

array[0] = undefined;

function max_weight_set(array) {
  let suboptimal_solution = [];
  suboptimal_solution[0] = 0;
  suboptimal_solution[1] = array[1];
  for (let i = 2; i < array.length; ++i) {
    suboptimal_solution[i] = whichMax(
      suboptimal_solution[i - 2] + array[i],
      suboptimal_solution[i - 1]
    );
  }
  return suboptimal_solution;
}

function whichMax(element1, element2) {
  return element1 >= element2 ? element1 : element2;
}

function BelongToSet() {
  let solutions = max_weight_set(array);

  let array2 = [];

  let i = solutions.length - 1;

  while (i > 0) {
    array2[i] = isBelong(solutions, i);
    if (array2[i]) {
      array2[i - 1] = false;
      i--;
    }
    i--;
  }
  return array2;
}

function isBelong(solutions, index) {
  if (solutions[index] === solutions[index - 1]) {
    return false;
  } else {
    return true;
  }
}
let isbelong = BelongToSet();
console.log(
  isbelong[1],
  isbelong[2],
  isbelong[3],
  isbelong[4],
  isbelong[17],
  isbelong[117],
  isbelong[517],
  isbelong[997]
);
