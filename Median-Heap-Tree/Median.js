const readInterger = require("../utils/readInterger");
const array = readInterger("Median-Heap-Tree", "Median.txt");

// console.log(array);
const MinHeap = require("./MinHeap");
const MaxHeap = require("./MaxHeap");

let minheap = new MinHeap();
let maxheap = new MaxHeap();

let median = [];
let i = 0;
while (array.length > i) {
  // minheap.insert(array[i]);
  // maxheap.insert(array[i]);

  medianMaintain(array[i]);

  i++;
}

function medianMaintain(number) {
  if (number < maxheap.getMax() || !maxheap.getMax()) {
    maxheap.insert(number);
  } else {
    minheap.insert(number);
  }
  if (minheap.getLength() - 1 > maxheap.getLength()) {
    let min = minheap.extractMin();
    maxheap.insert(min);
  } else if (maxheap.getLength() - 1 > minheap.getLength()) {
    let max = maxheap.extractMax();
    minheap.insert(max);
  }
  // console.log("minheap ", minheap, "maxheap", maxheap);
  addMedian();
}

function addMedian() {
  let totalLength = minheap.getLength() + maxheap.getLength();

  if (isOdd(totalLength)) {
    if (minheap.getLength() > maxheap.getLength()) {
      median.push(minheap.getMin());
    } else {
      median.push(maxheap.getMax());
    }
  } else {
    // let average = (maxheap.getMax() + minheap.getMin()) / 2;
    median.push(maxheap.getMax());
  }
}

function isOdd(number) {
  return number % 2 == 1;
}

let sum = 0;
for (let i = 0; i < median.length; i++) {
  sum = sum + median[i];
}
console.log(sum % 10000);
// minheap.extractMin();
// minheap.extractMin();
// minheap.extractMin();
// console.log(minheap);
