import Screen from "./screen.js";
import Frame, { keyEnum } from "./frame.js";

const gameStatus = Object.freeze({
  stop: 0,
  start: 1
});

class Game {
  constructor(el) {
    this.screen = new Screen(el);
    this.timer = 800;
    this.interval = null;
    this.status = gameStatus.stop;

    document.onkeydown = this._event;
    this.currFrame = new Frame();
    this._display();
  }
  start = () => {
    this._setStatus(gameStatus.start);
  };
  stop = () => {
    this._setStatus(gameStatus.stop);
  };
  // "private" methods
  _setStatus = status => {
    this.status = status;
    this._toggleTimer();
  };
  _toggleTimer = () => {
    switch (this.status) {
      case gameStatus.start:
        this.interval = setInterval(
          () => this._event({ keyCode: keyEnum.arrowDown }),
          this.timer
        );
        break;

      case gameStatus.stop:
        clearInterval(this.interval);
        break;
    }
  };
  _display = () => {
    this.screen.draw(this.currFrame);
  };
  _event = e => {
    if (this.status !== gameStatus.start) return;
    if (e instanceof Event) e.preventDefault();
    let newFrame = this.currFrame.update(e.keyCode); //return new updated frame
    if (!newFrame) return; // invalid frame, return
    this.currFrame = newFrame;
    this._display();
  };
}

export default Game;
