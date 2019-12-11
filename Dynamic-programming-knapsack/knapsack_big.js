// 2.Question 2
// This problem also asks you to solve a knapsack instance, but a much bigger one.

// Download the text file below.

// knapsack_big.txt
// This file describes a knapsack instance, and it has the following format:

// [knapsack_size][number_of_items]

// [value_1] [weight_1]

// [value_2] [weight_2]

// ...

// For example, the third line of the file is "50074 834558", indicating that the second item has value 50074 and size 834558, respectively. As before, you should assume that item weights and the knapsack capacity are integers.

// This instance is so big that the straightforward iterative implemetation uses an infeasible amount of time and space. So you will have to be creative to compute an optimal solution. One idea is to go back to a recursive implementation, solving subproblems --- and, of course, caching the results to avoid redundant work --- only on an "as needed" basis. Also, be sure to think about appropriate data structures for storing and looking up solutions to subproblems.

// In the box below, type in the value of the optimal solution.

// ADVICE: If you're not getting the correct answer, try debugging your algorithm using some small test cases. And then post them to the discussion forum!

const readJob = require("../utils/readknap");

const array = readJob("Dynamic-programming-knapsack", "knapsack1.txt");

function maximalValue(array) {
  let suboptimal = [];
  let maxCapacity = computeCapacity(array);

  preprocessingArray(array);

  prefill_array(suboptimal, maxCapacity);

  for (let j = 1; j < array.length; j++) {
    suboptimal[j] = [];
  }

  recurseSubproblem(array, suboptimal, maxCapacity, array.length - 2);
  return suboptimal;
  // suboptimal[j][i] = maxofTwo(array, suboptimal, maxCapacity, j);
}

function recurseSubproblem(array, suboptimal, i, j) {
  if (typeof suboptimal[j][i] !== "undefined") {
    return suboptimal[j][i];
  }

  if (i === 0 || j === 0) {
    return 0;
  }
  if (i < array[j].weight || i < 0) {
    suboptimal[j][i] = recurseSubproblem(array, suboptimal, i, j - 1);
    return suboptimal[j][i] - array[j].weight;
  }
  // console.log(i);
  if (i > array[j].weight) {
    suboptimal[j][i] = maxofTwo(
      recurseSubproblem(array, suboptimal, i - array[j].weight, j - 1) +
        array[j].weight,
      recurseSubproblem(array, suboptimal, i, j - 1)
    );
  } else {
    suboptimal[j][i] = maxofTwo(
      recurseSubproblem(array, suboptimal, i, j - 1) + array[j].weight,
      recurseSubproblem(array, suboptimal, i, j - 1)
    );
  }
}

function maxofTwo(Include, notInclude) {
  return notInclude > Include ? notInclude : Include;
}

function prefill_array(suboptimal, maxCapacity) {
  suboptimal[0] = [];
  for (let i = 1; i < maxCapacity; i++) {
    suboptimal[0][i] = 0;
  }
}

function computeCapacity(array) {
  let capacity = array[0].value;
  return capacity;
}

function preprocessingArray(array) {
  array[0] = undefined;
}

let suboptimal = maximalValue(array);

console.log(suboptimal, "?");
