const readInput = require("../utils/readInterger");

const array = readInput("QuickSort", "QuickSort.txt");

//Quick sort function
function quickSort(array, left, right) {
  if (left < right) {
    let pivotPosition = partitionArray(array, left, right);
    //recursively sort the 2nd half
    quickSort(array, pivotPosition + 1, right);
    quickSort(array, left, pivotPosition - 1);
  }
}

//Partition array element around the chosen pivot element.
function partitionArray(array, left, right) {
  counts[0] = counts[0] + right - left;
  const pivotElement = array[right];
  // The position of the middlepart between 2 subarrays
  let i = left;

  for (let j = i; j < right; j++) {
    if (array[j] <= pivotElement) {
      let tempElement = array[i];
      array[i] = array[j];
      array[j] = tempElement;
      i++;
    }
  }
  //swap the pivot element with the right most element which is smaller than the pivot
  array[right] = array[i];
  array[i] = pivotElement;
  return i;
}

const counts = [0];

quickSort(array, 0, array.length - 1);

console.log(array);

console.log(counts);
