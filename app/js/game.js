import Screen from "./screen.js";
import Frame from "./frame.js";

class Game {
  constructor(el) {
    this.screen = new Screen(el);
    this.currFrame = new Frame();
    document.onkeydown = this.event;
    this.display();
  }
  display = () => {
    this.screen.draw(this.currFrame);
  };
  event = e => {
    e.preventDefault();
    let newFrame = this.currFrame.update(e.keyCode); //return new updated frame
    if (!newFrame) return; // invalid frame, return
    this.currFrame = newFrame;
    this.display();
  };
}

export default Game;
