const readInterger = require("../utils/readInterger");
const array = readInterger("Median", "Median.txt");

console.log(array);
const minHeap = require("./MinHeap");
const maxHeap = require("./MaxHeap");

let minheap = new minHeap();
let i = 0;
while (array.length > i) {
  i++;
}
console.log(i);

minheap.insert(3);

minheap.insert(4);

minheap.insert(6);

minheap.insert(7);

minheap.insert(8);

// console.log(minheap.extractMin());
// console.log(minheap.extractMin());

console.log(minheap);

let maxheap = new maxHeap();

maxheap.insert(3);

maxheap.insert(4);

maxheap.insert(6);

maxheap.insert(7);

maxheap.insert(8);

maxheap.extractMax();

console.log(maxheap);
