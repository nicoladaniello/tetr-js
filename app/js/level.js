import Vec from "./vec.js";

const blocksX = 10;
const blocksY = 20;

class Level {
  constructor(state = null) {
    this.state = state ? state : this.newState();
    this.size = new Vec(blocksX, blocksY);
  }
  freezeBlock(block) {
    let newState = this.state.map(row => [...row]);
    let unitsPositions = block.blockRelativePositions();
    unitsPositions.map(unitVec => (newState[unitVec.y][unitVec.x] = 1)); // freeze block in level
    return new Level(newState);
  }
  replaceFullRows = () => {
    const emptyRows = this.state.filter(
      row => row.reduce((r, n) => r + n) < blocksX
    );
    if (emptyRows.length == blocksY) return this;

    const count = blocksY - emptyRows.length;
    const newState = this.newState(count).concat(emptyRows);
    return new Level(newState);
  };
  newState(customWidth = false) {
    const width = customWidth ? customWidth : blocksY;
    return new Array(width).fill(null).map(() => {
      return new Array(blocksX).fill(null).map(x => 0);
    });
  }
}

export default Level;
