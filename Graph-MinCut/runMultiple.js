const RandomContraction = require("./RandomContraction");

let i = 200;

let outComes = [];

for (let k = 0; k < i; k++) {
  outComes.push(RandomContraction()[0]);
}

console.log(
  outComes.sort(function(a, b) {
    return a - b;
  })
);
