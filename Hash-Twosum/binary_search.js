function binary_search(array, left, right, element) {
  if (left > right) {
    return -1;
  }

  let mid = Math.floor((right + left) / 2);

  if (array[mid] < element) {
    return binary_search(array, mid + 1, right, element);
  } else if (array[mid] > element) {
    return binary_search(array, left, mid - 1, element);
  } else {
    return mid;
  }
}

function search(array, element) {
  let index = binary_search(array, 0, array.length - 1, element);
  return index;
}

let arr = [1, 2, 4, 5, 6, 7, 8, 9, 10];

module.exports = search;
