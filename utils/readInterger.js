const fs = require("fs");

const path = require("path");

const readIntergerFromFile = (directoryname, filename) => {
  const array = fs
    .readFileSync(path.join(__dirname, "..", directoryname, filename))
    .toString()
    .trim()
    .split("\n");
  for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(array[i]);
  }
  return array;
};

module.exports = readIntergerFromFile;
