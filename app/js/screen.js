class Screen {
  constructor(domEl) {
    this.dom = domEl;
  }
  draw(frame) {
    let { level, block } = frame;
    let view = level.state.map(row => [...row]);
    let unitsPositions = block.blockRelativePositions();
    unitsPositions.map(unitVec => (view[unitVec.y][unitVec.x] = 1)); // freeze block in level
    this.dom.innerHTML = syntaxHighlight(view);
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
