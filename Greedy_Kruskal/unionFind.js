class UnionFind {
  constructor() {
    this.leaderArray = [];
    this.leaders = [];
    this.cluster = 501;
  }
  returnCluster() {
    return this.cluster;
  }
  returnArray() {
    return this.leaders;
  }
  add(edge) {
    let vertexU = edge.vertexU;
    let vertexV = edge.vertexV;

    // add leader to vertex in leader Array
    if (
      this.leaderArray[vertexU] &&
      typeof this.leaderArray[vertexV] == "undefined"
    ) {
      console.log(edge);
      // make leader of vertex U the leader of two vertexes
      this.leaderArray[vertexV] = this.leaderArray[vertexU];

      this.addLeader(this.leaderArray[vertexU], vertexV);
      this.cluster = this.cluster - 1;
    } else if (
      this.leaderArray[vertexV] &&
      typeof this.leaderArray[vertexU] == "undefined"
    ) {
      console.log(edge);
      //make leader of vertex V the leader of two vertexes
      this.leaderArray[vertexU] = this.leaderArray[vertexV];
      this.addLeader(this.leaderArray[vertexV], vertexU);

      this.cluster = this.cluster - 1;
    } else if (
      typeof this.leaderArray[vertexU] == "undefined" &&
      typeof this.leaderArray[vertexV] == "undefined"
    ) {
      // make vertex U the leader
      this.cluster = this.cluster - 2;
      this.leaderArray[vertexU] = [];
      this.leaderArray[vertexU] = vertexU;
      this.leaderArray[vertexV] = vertexU;
      this.addLeader(vertexU, vertexU);
      this.addLeader(vertexU, vertexV);
    } else if (this.leaderArray[vertexU] && this.leaderArray[vertexV]) {
      let leader = this.union(
        this.leaderArray[vertexU],
        this.leaderArray[vertexV]
      );
      // this.addLeader(leader, vertexU, vertexV);
    }
  }
  // add vertex to leader in leaders array
  addLeader(leader, vertexU) {
    if (this.leaders[leader]) {
      this.leaders[leader].push(vertexU);
    } else {
      this.leaders[leader] = [];
      this.leaders[leader].push(vertexU);
    }
  }

  find(vertex) {
    return this.leaderArray[vertex];
  }

  union(leader1, leader2) {
    let leader;
    if (this.leaders[leader1].length < this.leaders[leader2].length) {
      leader = leader2;
      for (let child of this.leaders[leader1]) {
        this.leaderArray[child] = leader2;
        this.addLeader(leader, child);
      }

      this.leaders[leader1] = undefined;
    } else {
      leader = leader1;
      for (let child of this.leaders[leader2]) {
        this.leaderArray[child] = leader1;
        this.addLeader(leader, child);
      }

      this.leaders[leader2] = undefined;
    }
    return leader;
  }
}

module.exports = UnionFind;
