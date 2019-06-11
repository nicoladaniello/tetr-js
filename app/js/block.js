import Vec from "./vec.js";

const blockSize = 3;

class Block {
  constructor(state = null, pos = null) {
    this.state = state ? state : this.newState();
    this.pos = pos ? pos : new Vec(3, 0);
    this.size = new Vec(blockSize, blockSize);
  }
  move = distance => {
    return new Block(this.state, this.pos.plus(distance));
  };
  rotate = () => {
    let newState = this.newState();
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
  newState = () => {
    return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
  };
}

export default Block;
