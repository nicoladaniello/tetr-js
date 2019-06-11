import { copyState } from "./utils.js";

class Screen {
  constructor(arena, accumulator) {
    this.arena = arena;
    this.accumulator = accumulator;
  }
  draw(frame, points) {
    let { level, block } = frame;
    let view = copyState(level.state);
    let unitsPositions = block.relativePositions();
    unitsPositions.map(unitVec => (view[unitVec.y][unitVec.x] = 1)); // freeze block in level
    this.arena.innerHTML = syntaxHighlight(view);
    this.accumulator.innerHTML = points;
  }
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json);
  }
  return json.replace(/0|1|(],)|(\[\[)|(\]\])/g, match => {
    if (match === "],") return `${match}<br />`;
    if (match === "[[" || match == "]]") return match.slice(1);
    return `<span class="c${match}">${match}</span>`;
  });
}

export default Screen;
