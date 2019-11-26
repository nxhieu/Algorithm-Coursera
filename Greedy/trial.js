let i = [4, 4, 5, 1, 12];

function selectionSort(pivotArray) {
  let minIndex;
  for (let i = 0; i < pivotArray.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < pivotArray.length; j++) {
      if (pivotArray[j] < pivotArray[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(pivotArray, minIndex, i);
    }
  }
}

function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

selectionSort(i);

console.log(i);
