/**
 * TODO:
 * Implement the line shaped tetromino;
 */
import Vec from "./vec.js";
import { copyState } from "./utils.js";

const blockSize = 3;

const tetrominoes = [
  [[0, 1, 1], [0, 1, 1], [0, 0, 0]], // _|_
  [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // ::
  [[0, 1, 0], [0, 1, 0], [1, 1, 0]], // ---|
  [[0, 1, 0], [0, 1, 0], [0, 1, 1]], // ___|
  [[0, 1, 0], [0, 1, 1], [0, 0, 1]], // _|-
  [[0, 1, 0], [1, 1, 0], [1, 0, 0]] // -|_
  // [[0, 1, 0], [1, 1, 1], [0, 0, 0]] // ----
];

class Block {
  constructor(state = null, pos = null) {
    this.state = state ? copyState(state) : this.newState();
    this.pos = pos ? pos : new Vec(3, 0);
    this.size = new Vec(blockSize, blockSize);
  }
  move = distance => {
    return new Block(this.state, this.pos.plus(distance));
  };
  rotate = () => {
    let newState = copyState(this.state);
    for (let i = 0; i < blockSize; i++) {
      for (let j = 0; j < blockSize; j++) {
        newState[j][blockSize - 1 - i] = this.state[i][j];
      }
    }
    return new Block(newState, this.pos);
  };
  relativePositions = () => {
    let result = new Array();
    for (let i = 0; i < blockSize; i++) {
      for (let j = 0; j < blockSize; j++) {
        if (this.state[i][j]) result.push(new Vec(j, i).plus(this.pos));
      }
    }
    return result;
  };
  newState = (n = null) => {
    if (!n) console.log("get rand");
    if (!n) n = getRandomNumber(tetrominoes.length);
    console.log(n);
    return tetrominoes[n];
  };
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Block;
