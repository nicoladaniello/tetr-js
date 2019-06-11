import Screen from "./screen.js";
import Frame, { keyEnum } from "./frame.js";

const gameStatus = Object.freeze({
  pause: 0,
  start: 1,
  over: 2
});

class Game {
  constructor(arena, accumulator) {
    this.screen = new Screen(arena, accumulator);
    this.reset();
  }

  start = () => {
    if (this.status === gameStatus.over) this.reset();
    this._setStatus(gameStatus.start);
  };

  pause = () => {
    this._setStatus(gameStatus.pause);
  };

  over = () => {
    this._setStatus(gameStatus.over);
    alert("Game over: total point: " + this.accumulator);
  };

  reset = () => {
    this.timer = 800;
    this.interval = null;
    this.status = gameStatus.pause;
    this.accumulator = 0;

    document.onkeydown = this._event;
    this.currFrame = new Frame();
    this._display();
  };

  /**
   * "private" methods
   */

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

      case gameStatus.pause:
        clearInterval(this.interval);
        break;
    }
  };

  _display = () => {
    this.screen.draw(this.currFrame, this.accumulator);
  };

  _event = e => {
    if (this.status !== gameStatus.start) return;
    if (e instanceof Event) e.preventDefault();

    let newFrame = this.currFrame.update(e.keyCode); //return new updated frame
    if (!newFrame) return; // invalid frame, return
    if (newFrame._hasCollision()) {
      // game is lost.
      this.over();
      return;
    }
    this.currFrame = newFrame;
    this.accumulator += newFrame.points;
    this._display();
  };
}

export default Game;
