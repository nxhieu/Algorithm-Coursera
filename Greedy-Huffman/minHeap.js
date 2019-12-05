class MinHeap {
  constructor() {
    this.heapContainer = [null];
  }

  getArray() {
    return this.heapContainer;
  }

  getMin() {
    return this.heapContainer[1].value;
  }

  getLength() {
    return this.heapContainer.length;
  }

  _swap(index1, index2) {
    let temp = this.heapContainer[index1];
    this.heapContainer[index1] = this.heapContainer[index2];
    this.heapContainer[index2] = temp;
  }

  insert(node) {
    this.heapContainer[this.heapContainer.length] = node;

    let position = this.heapContainer.length - 1;
    /* traversing the tree until the node current is greater than its parent */
    while (
      position > 1 &&
      this.heapContainer[position].value <
        this.heapContainer[Math.floor(position / 2)].value
    ) {
      /* bubble up swaping two node */
      this._swap(position, Math.floor(position / 2));
      position = Math.floor(position / 2);
    }
  }
  extractMin() {
    let min = this.heapContainer[1];

    if (this.heapContainer.length > 2) {
      let currentLength = this.heapContainer.length;
      /* swap the last node to the min and remove min */
      this.heapContainer[1] = this.heapContainer[currentLength - 1];
      this.heapContainer.splice(currentLength - 1);
      /* bubble down */
      let current = 1;

      let leftParentIndex = current * 2;

      let rightParentIndex = current * 2 + 1;

      while (
        this.heapContainer[leftParentIndex] &&
        this.heapContainer[rightParentIndex] &&
        (this.heapContainer[leftParentIndex].value <=
          this.heapContainer[current].value ||
          this.heapContainer[rightParentIndex].value <=
            this.heapContainer[current].value)
      ) {
        if (
          this.heapContainer[leftParentIndex].value <
          this.heapContainer[rightParentIndex].value
        ) {
          // swap with left parent child

          this._swap(leftParentIndex, current);
          current = leftParentIndex;
        } else {
          // swap with right parent child
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
            this.heapContainer[leftParentIndex].value <
            this.heapContainer[current].value
          ) {
            this._swap(leftParentIndex, current);
          }
        }
      }
    } else if (this.heapContainer.length === 2) {
      return this.heapContainer.splice(1, 1);
    } else {
      return null;
    }
    return min;
  }
}

module.exports = MinHeap;
