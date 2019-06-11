"use strict";

import Game from "./game.js";

const elem = document.getElementById("arena");
const g = new Game(elem);

document.getElementById("start").onclick = g.start;
document.getElementById("stop").onclick = g.stop;
