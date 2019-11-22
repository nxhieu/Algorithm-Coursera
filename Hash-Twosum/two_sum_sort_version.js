const readInterger = require("../utils/readInterger");

const array = readInterger("Hash-Twosum", "2sum.txt");

const quicksort = require("../QuickSort/quicksort_medianelement");

quicksort(array, 0, array.length - 1);
// console.log(array.length);

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

// NumberOfValues(ht_array, total_sum);
