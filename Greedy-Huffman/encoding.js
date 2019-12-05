/** 
 In this programming problem and the next you'll code up the greedy algorithm from the lectures on Huffman coding.

 Download the text file below.

 This file describes an instance of the problem. It has the following format:

 [number_of_symbols]

 [weight of symbol #1]

 [weight of symbol #2]

 ...

For example, the third line of the file is "6852892," indicating that the weight of the second symbol of the alphabet is 6852892. (We're using weights instead of frequencies, like in the "A More Complex Example" video.)

Your task in this problem is to run the Huffman coding algorithm from lecture on this data set. What is the maximum length of a codeword in the resulting Huffman code?

ADVICE: If you're not getting the correct answer, try debugging your algorithm using some small test cases. And then post them to the discussion forum!s

2.Question 2
Continuing the previous problem, what is the minimum length of a codeword in your Huffman code?
*/
// prestep to filter the array

// min = 9
const readInterger = require("../utils/readInterger");

const array = readInterger("Greedy-Huffman", "test.txt");

const array2 = [];

const MinHeap = require("./minHeap");

array.splice(0, 1);

const minHeap = new MinHeap();

for (let element of array) {
  let elementObject = { value: element };
  array2.push(elementObject);
}
console.log(array2.length);

let metasymbol = {};

function encoding(array2, metasymbol) {
  if (array2.length > 1) {
    let min1 = extractMin(array2);
    let min2 = extractMin(array2);

    // console.log(min1, "min1 ", min2, "min2");
    metasymbol = {
      value: min1.value + min2.value,
      left: min1,
      right: min2
    };
    // console.log(metasymbol);
    array2.push(metasymbol);

    encoding(array2, metasymbol);
    split(metasymbol);
  }
}
encoding(array2, metasymbol);
console.log(array2[0].right);
calculatePath(array2[0], 0);

function split(metasymbol) {
  metasymbol.value = -1;
}

// create a heap

function extractMin(array2) {
  let min = { value: Number.MAX_SAFE_INTEGER };
  let index;
  for (let i in array2) {
    if (min.value >= array2[i].value) {
      min = array2[i];
      index = i;
    }
  }

  array2.splice(index, 1);
  return min;
}

function calculatePath(tree, i) {
  if (tree.left.value === -1 && tree.right.value === -1) {
    i++;
    calculatePath(tree.left, i);
    calculatePath(tree.right, i);
  } else if (tree.right.value === -1) {
    i++;
    calculatePath(tree.right, i);
  } else if (tree.left.value === -1) {
    i++;
    calculatePath(tree.left, i);
  }
  if (tree.left.value !== -1 || tree.right.value !== -1) {
    i++;
    console.log(i, "?");
    return i;
  }
}

// console.log(findMin(array2));
// console.log(array2);
