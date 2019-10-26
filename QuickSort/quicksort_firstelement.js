const readInput = require("../utils/readInterger");

const array = readInput("QuickSort", "QuickSort.txt");

//Quick sort function
function quickSort(array, left, right) {
  if (left < right) {
    let pivotPosition = partitionArray(array, left, right);
    //recursively sort the 2nd half
    quickSort(array, pivotPosition, right);
    quickSort(array, left, pivotPosition - 2);
  }
}

//Partition array element around the chosen pivot element.
function partitionArray(array, left, right) {
  counts[0] = counts[0] + right - left;
  const pivotElement = array[left];
  // The position of the middlepart between 2 subarrays
  let i = left + 1;

  for (let j = i; j <= right; j++) {
    if (array[j] <= pivotElement) {
      let tempElement = array[i];
      array[i] = array[j];
      array[j] = tempElement;
      i++;
    }
  }
  //swap the pivot element with the right most element which is smaller than the pivot
  array[left] = array[i - 1];
  array[i - 1] = pivotElement;
  return i;
}

const counts = [0];

quickSort(array, 0, array.length - 1);

console.log(counts);

console.log(array);
