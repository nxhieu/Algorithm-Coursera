/// create a MinHeap

class MaxHeap {
  constructor() {
    this.heapContainer = [null];
  }

  getMax() {
    return this.heapContainer[1];
  }

  getLength() {
    return this.heapContainer.length;
  }

  insert(node) {
    /* insert node to latest element */
    this.heapContainer[this.heapContainer.length] = node;
    /* bubble up  */
    let current = this.heapContainer.length - 1;
    while (
      current > 1 &&
      this.heapContainer[current] > this.heapContainer[Math.floor(current / 2)]
    ) {
      this._swap(current, Math.floor(current / 2));

      current = Math.floor(current / 2);
    }
  }

  extractMax() {
    let max = this.heapContainer[1];
    if (this.heapContainer.length > 2) {
      this._swap(1, this.heapContainer.length - 1);
      this.heapContainer.splice(this.heapContainer.length - 1);
      let current = 1;
      let leftParentIndex = current * 2;
      let rightParentIndex = current * 2 + 1;
      while (
        (this.heapContainer[leftParentIndex] >= this.heapContainer[current] ||
          this.heapContainer[rightParentIndex] >=
            this.heapContainer[current]) &&
        this.heapContainer[leftParentIndex] &&
        this.heapContainer[rightParentIndex]
      ) {
        if (
          this.heapContainer[leftParentIndex] >
          this.heapContainer[rightParentIndex]
        ) {
          this._swap(leftParentIndex, current);
          current = leftParentIndex;
        } else {
          this._swap(rightParentIndex, current);
          current = rightParentIndex;
        }
        leftParentIndex = current * 2;
        rightParentIndex = current * 2 + 1;
        if (
          this.heapContainer[leftParentIndex] &&
          this.heapContainer[rightParentIndex] == undefined
        ) {
          if (
            this.heapContainer[leftParentIndex] > this.heapContainer[current]
          ) {
            this._swap(current, leftParentIndex);
          }
        }
      }
    } else if (this.heapContainer.length == 2) {
      return this.heapContainer.splice(1, 1);
    } else {
      return null;
    }
    return max;
  }

  _swap(index1, index2) {
    let temp = this.heapContainer[index1];
    this.heapContainer[index1] = this.heapContainer[index2];
    this.heapContainer[index2] = temp;
  }
}
module.exports = MaxHeap;
