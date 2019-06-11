import Vec from "./vec.js";
import Block from "./block.js";
import Level from "./level.js";

export const keyEnum = Object.freeze({
  spaceBar: 32,
  arrowLeft: 37,
  arrowRight: 39,
  arrowDown: 40
});

class Frame {
  constructor(level = null, block = null) {
    this.level = level ? level : new Level();
    this.block = block ? block : new Block();
  }
  update = e => {
    let newBlock, newFrame;
    switch (e) {
      case keyEnum.spaceBar: //spacebar
        newBlock = this.block.rotate();
        newFrame = new Frame(this.level, newBlock);
        if (newFrame.hasCollision()) return false;
        return newFrame;
        break;
      case keyEnum.arrowLeft: //arrow left
        newBlock = this.block.move(new Vec(-1, 0));
        newFrame = new Frame(this.level, newBlock);
        if (newFrame.hasCollision()) return false;
        return newFrame;
        break;
      case keyEnum.arrowRight: //arrow right
        newBlock = this.block.move(new Vec(1, 0));
        newFrame = new Frame(this.level, newBlock);
        if (newFrame.hasCollision()) return false;
        return newFrame;
        break;
      case keyEnum.arrowDown: //arrow down
        newBlock = this.block.move(new Vec(0, 1));
        newFrame = new Frame(this.level, newBlock);
        if (newFrame.hasCollision()) return this.updateLevel();
        return newFrame;
        break;
    }
  };
  hasCollision = () => {
    const { size: levelSize, state: levelState } = this.level;
    const positions = this.block.blockRelativePositions();
    return (
      positions.find(vec => collisionChecker(levelState, levelSize, vec)) !=
      undefined
    );
  };
  updateLevel = () => {
    let newLevel = this.level.freezeBlock(this.block);
    newLevel = newLevel.replaceFullRows();
    console.log(newLevel);
    return new Frame(newLevel, new Block());
  };
}

/**
 *
 * @param {multidimensional array rapresenting the level state} grid
 * @param {vector rapresenting dimensions of the level state} gridSize
 * @param {position in space to test} vector
 * @returns true if the position is outside the grid or the position in the grid is positive;
 */
function collisionChecker(grid, gridSize, vector) {
  const { x, y } = vector;
  const { x: gridWidth, y: gridHeight } = gridSize;
  // console.log(x, y, x < 0, x > gridWidth - 1, y >= gridHeight, grid[y][x] == 1);
  return x < 0 || x > gridWidth - 1 || y >= gridHeight || grid[y][x] == 1;
}

export default Frame;
