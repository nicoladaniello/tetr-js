import Vec from "./vec.js";
import Block from "./block.js";
import Level from "./level.js";

export const keyEnum = Object.freeze({
  spaceBar: 32,
  arrowLeft: 37,
  arrowRight: 39,
  arrowDown: 40
});

const pointsEnum = [0, 10, 20, 50, 100];

class Frame {
  constructor(level = null, block = null, points = null) {
    this.level = level ? level : new Level();
    this.block = block ? block : new Block();
    this.points = points ? points : 0;
  }
  update = e => {
    let newBlock, newFrame;
    switch (e) {
      case keyEnum.spaceBar: //spacebar
        newBlock = this.block.rotate();
        newFrame = new Frame(this.level, newBlock);
        if (newFrame._hasCollision()) return false;
        return newFrame;
        break;
      case keyEnum.arrowLeft: //arrow left
        newBlock = this.block.move(new Vec(-1, 0));
        newFrame = new Frame(this.level, newBlock);
        if (newFrame._hasCollision()) return false;
        return newFrame;
        break;
      case keyEnum.arrowRight: //arrow right
        newBlock = this.block.move(new Vec(1, 0));
        newFrame = new Frame(this.level, newBlock);
        if (newFrame._hasCollision()) return false;
        return newFrame;
        break;
      case keyEnum.arrowDown: //arrow down
        newBlock = this.block.move(new Vec(0, 1));
        newFrame = new Frame(this.level, newBlock);
        if (newFrame._hasCollision()) return this._updateLevel();
        return newFrame;
        break;
    }
  };

  _hasCollision = () => {
    const { size: levelSize, state: levelState } = this.level;
    const positions = this.block.relativePositions();
    return (
      positions.find(vec => collisionChecker(levelState, levelSize, vec)) !=
      undefined
    );
  };

  /**
   * _updateLevel()
   * called when the block collided with the floor.
   * Freezes the block and replace any full row.
   *
   * @returns a new Frame with the updated level, a mew block and any collected points.
   */
  _updateLevel = () => {
    let newLevel = this.level.freezeBlock(this.block);
    const fullRows = newLevel.countFullRows();
    if (fullRows) {
      newLevel = newLevel.replaceFullRows();
    }
    return new Frame(newLevel, new Block(), pointsEnum[fullRows]);
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
