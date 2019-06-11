import Vec from "./vec.js";

const levelWidth = 10;
const levelHeight = 20;

class Level {
  constructor(state = null) {
    this.state = state ? state : this.newState();
    this.size = new Vec(levelWidth, levelHeight);
  }
  freezeBlock(block) {
    let newState = this.state.map(row => [...row]);
    let unitsPositions = block.blockRelativePositions();
    unitsPositions.map(unitVec => (newState[unitVec.y][unitVec.x] = 1)); // freeze block in level
    return new Level(newState);
  }
  countFullRows = () => {
    const fullRows = this.state.filter(
      row => row.reduce((r, n) => r + n) == levelWidth
    );
    return fullRows.length;
  };
  replaceFullRows = () => {
    const emptyRows = this.state.filter(
      row => row.reduce((r, n) => r + n) < levelWidth
    );
    if (emptyRows.length == levelHeight) return this;

    const count = levelHeight - emptyRows.length;
    const newState = this.newState(count).concat(emptyRows);
    return new Level(newState);
  };
  newState(customWidth = false) {
    const width = customWidth ? customWidth : levelHeight;
    return new Array(width).fill(null).map(() => {
      return new Array(levelWidth).fill(null).map(x => 0);
    });
  }
}

export default Level;
