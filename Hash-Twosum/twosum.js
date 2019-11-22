// The goal of this problem is to implement a variant of the 2-SUM algorithm covered in this week's lectures.

// The file contains 1 million integers, both positive and negative (there might be some repetitions!).This is your array of integers, with the i^{th}i
// th
//   row of the file specifying the i^{th}i
// th
//   entry of the array.

// Your task is to compute the number of target values tt in the interval [-10000,10000] (inclusive) such that there are distinct numbers x,yx,y in the input file that satisfy x+y=tx+y=t. (NOTE: ensuring distinctness requires a one-line addition to the algorithm from lecture.)

// Write your numeric answer (an integer between 0 and 20001) in the space provided.

// OPTIONAL CHALLENGE: If this problem is too easy for you, try implementing your own hash table for it. For example, you could compare performance under the chaining and open addressing approaches to resolving collisions.

const readInterger = require("../utils/readInterger");

const array = readInterger("Hash-Twosum", "2sum.txt");

let ht_array = {};

let total_sum = 0;

// store intergers in hash table
for (let i of array) {
  if (ht_array[i] == undefined) {
    ht_array[i] = 1;
  } else {
    ht_array[i] = ht_array[i] + 1;
  }
}

function NumberOfValues(ht_array, total_sum) {
  let sum = -10000;
  while (sum <= 10000) {
    if (findDistinctNumber(ht_array, sum, total_sum)) {
      total_sum++;
      console.log(total_sum);
    }

    sum++;
  }
}

function findDistinctNumber(ht_array, sum) {
  for (let i in ht_array) {
    let otherProduct = sum - i;
    if (ht_array[otherProduct] && otherProduct !== i) {
      return true;
    }
  }
  return false;
}

NumberOfValues(ht_array, total_sum);

console.log(total_sum);
