// In this programming problem and the next you'll code up the greedy algorithms from lecture for minimizing the weighted sum of completion times..

// Download the text file below.

// This file describes a set of jobs with positive and integral weights and lengths. It has the format

// [number_of_jobs]

// [job_1_weight] [job_1_length]

// [job_2_weight] [job_2_length]

// ...

// For example, the third line of the file is "74 59", indicating that the second job has weight 74 and length 59.

// You should NOT assume that edge weights or lengths are distinct.

// Your task in this problem is to run the greedy algorithm that schedules jobs in decreasing order of the difference (weight - length). Recall from lecture that this algorithm is not always optimal. IMPORTANT: if two jobs have equal difference (weight - length), you should schedule the job with higher weight first. Beware: if you break ties in a different way, you are likely to get the wrong answer. You should report the sum of weighted completion times of the resulting schedule --- a positive integer --- in the box below.

// ADVICE: If you get the wrong answer, try out some small test cases to debug your algorithm (and post your test cases to the discussion forum).

const readJob = require("../utils/readJob");

let array = readJob("Greedy", "jobs.txt");

function scheduleTask(array) {
  let greedyScore = [];
  for (let i = 0; i < array.length; i++) {
    greedyScore.push({
      index: i + 1,
      score: array[i].weight - array[i].length,
      weight: array[i].weight,
      length: array[i].length
    });
  }

  sort(greedyScore);
  let sum = sum_weighted_average(greedyScore);
  return sum;
}
//Quick sort : median of three method
function sort(greedyScore, left, right) {
  quickSort(greedyScore, 0, greedyScore.length - 1);
}

function quickSort(greedyScore, left, right) {
  if (left < right) {
    let position = sortPartition(greedyScore, left, right);
    quickSort(greedyScore, left, position - 1);
    quickSort(greedyScore, position + 1, right);
  }
}

function sortPartition(greedyScore, left, right) {
  let pivotIndex = choosePivot(greedyScore, left, right);
  if (pivotIndex !== left) {
    swap(pivotIndex, left);
  }
  let i = left + 1;
  for (let j = i; j <= right; j++) {
    if (greedyScore[j].score > greedyScore[left].score) {
      swap(greedyScore, i, j);
      i++;
    } else if (
      greedyScore[j].score === greedyScore[left].score &&
      greedyScore[j].weight > greedyScore[left].weight
    ) {
      swap(greedyScore, i, j);
      i++;
    }
  }

  // swap the pivot elemen to rightful position
  swap(greedyScore, i - 1, left);
  return i - 1;
}

function choosePivot(greedyScore, left, right) {
  let midIndex = Math.floor((right + left) / 2);
  let pivotArray = [
    greedyScore[left].score,
    greedyScore[midIndex].score,
    greedyScore[right].score
  ];
  selectionSort(pivotArray);
  if (pivotArray[1] === greedyScore[left].score) {
    return left;
  } else if (pivotArray[1] === greedyScore[right].score) {
    return right;
  } else {
    return midIndex;
  }
}

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

function swap(array, left, right) {
  let temp = array[left];
  array[left] = array[right];
  array[right] = temp;
}

function sum_weighted_average(greedyScore) {
  let sum = 0;
  let currentLength = 0;
  for (let i = 0; i < greedyScore.length; i++) {
    currentLength = currentLength + greedyScore[i].length;
    sum = sum + greedyScore[i].weight * currentLength;
  }
  return sum;
}

console.log(scheduleTask(array));
