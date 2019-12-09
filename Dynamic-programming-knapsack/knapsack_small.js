// 1.Question 1
// In this programming problem and the next you'll code up the knapsack algorithm from lecture.

// Let's start with a warm-up. Download the text file below.

// knapsack1.txt
// This file describes a knapsack instance, and it has the following format:

// [knapsack_size][number_of_items]

// [value_1] [weight_1]

// [value_2] [weight_2]

// ...

// For example, the third line of the file is "50074 659", indicating that the second item has value 50074 and size 659, respectively.

// You can assume that all numbers are positive. You should assume that item weights and the knapsack capacity are integers.

// In the box below, type in the value of the optimal solution.

// ADVICE: If you're not getting the correct answer, try debugging your algorithm using some small test cases. And then post them to the discussion forum!

const readJob = require("../utils/readknap");

const array = readJob("Dynamic-programming-knapsack", "knapsack1.txt");

function computeCapacity(array) {
  let capacity = array[0].value;
  return capacity;
}

function preprocessingArray(array) {
  array[0] = undefined;
}

function maximalValue(array) {
  let suboptimal = [];
  let maxCapacity = computeCapacity(array);
  preprocessingArray(array);
  prefill_array(suboptimal, maxCapacity);
  for (let j = 1; j < array.length; j++) {
    suboptimal[j] = [];

    for (let i = 1; i <= maxCapacity; i++) {
      suboptimal[j][i] = maxofTwo(array, suboptimal, i, j);
    }
  }
  return suboptimal;
}

function prefill_array(suboptimal, maxCapacity) {
  suboptimal[0] = [];
  for (let i = 1; i < maxCapacity; i++) {
    suboptimal[0][i] = 0;
  }
}

function maxofTwo(array, suboptimal, i, j) {
  let notInclude = suboptimal[j - 1][i];
  let Include;
  if (i > array[j].weight) {
    Include = suboptimal[j - 1][i - array[j].weight] + array[j].value;
  } else {
    Include = notInclude;
  }

  return notInclude > Include ? notInclude : Include;
}

let suboptimal = maximalValue(array);

console.log(suboptimal[suboptimal.length - 1][10000]);
