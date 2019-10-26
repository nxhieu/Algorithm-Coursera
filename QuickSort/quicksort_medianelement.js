const readInput = require("../utils/readInterger");

const array = readInput("QuickSort", "testcase.txt");
let loop = 0;
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
  const pivotPosition = choosePivot(array, left, right);
  // console.log(pivotPosition);
  // counts[0] = counts[0] + right - left;
  const pivotElement = array[pivotPosition];
  // The position of the middlepart between 2 subarrays
  let i = left;

  for (let j = i; j <= right; j++) {
    if (array[j] <= pivotElement) {
      let tempElement = array[i];
      array[i] = array[j];
      array[j] = tempElement;
      i++;
    }
  }
  //swap the pivot element with the right most element which is smaller than the pivot

  if (i < pivotPosition) {
    let temp = array[i];
    array[i] = array[pivotPosition];
    array[pivotPosition] = temp;
  } else if (i > pivotPosition) {
    let temp = array[i - 1];
    array[i - 1] = array[pivotPosition];
    array[pivotPosition] = temp;
  }

  // array[pivotPosition] = array[i];
  // array[i] = pivotElement;
  // console.log(i);
  return i;
}

// choose pivot medidan of three left , right or middle index
function choosePivot(array, left, right) {
  let middleindex = left + Math.floor((right - left) / 2);

  const pivotCandidates = [array[left], array[middleindex], array[right]];

  let copyPivotCandidates = Object.assign([], pivotCandidates);
  for (let i = 0; i < pivotCandidates.length; i++) {
    for (let j = 0; j < pivotCandidates.length - i; j++) {
      if (pivotCandidates[j] > pivotCandidates[j + 1]) {
        let temp = pivotCandidates[j + 1];
        pivotCandidates[j + 1] = pivotCandidates[j];
        pivotCandidates[j] = temp;
      }
    }
  }
  // console.log(pivotCandidates);
  for (let k = 0; k < 3; k++) {
    if (copyPivotCandidates[k] === pivotCandidates[1]) {
      switch (k) {
        case 0:
          console.log(copyPivotCandidates[k]);
          console.log(array.indexOf(copyPivotCandidates[k]));
          return left;
        case 1:
          console.log(copyPivotCandidates[k]);
          console.log(array.indexOf(copyPivotCandidates[k]));
          return middleindex;
        case 2:
          console.log(copyPivotCandidates[k]);
          console.log(array.indexOf(copyPivotCandidates[k]));
          return right;
      }
    }
  }

  // let min = Math.min(...pivotCandidates);
  // for (let k = 0; k < 3; k++) {
  //   if (pivotCandidates[k] >= min && pivotCandidates[k] <= max) {
  //     return pivotCandidates[k];
  //   }
  // }
}

const counts = [0];

quickSort(array, 0, array.length - 1);

console.log(array);

// console.log(counts);

console.log(Math.floor((5 - 4) / 2));
