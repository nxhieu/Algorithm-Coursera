const fs = require("fs");

const path = require("path");

const readGraph = (directoryname, filename) => {
  let result = [];
  const array = fs
    .readFileSync(path.join(__dirname, "..", directoryname, filename))
    .toString()
    .split("\n");
  for (let i = 0; i < array.length; i++) {
    let rawlines = array[i].trim();
    if (rawlines) {
      let splitline = rawlines.split("\t");
      result[splitline[0]] = splitline
        .slice(1)
        .map(element => parseInt(element));
    }
  }
  return result;
};

module.exports = readGraph;
