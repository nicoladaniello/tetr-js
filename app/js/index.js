"use strict";

import Game from "./game.js";

const arena = document.getElementById("arena");
const accumulator = document.getElementById("accumulator");
const g = new Game(arena, accumulator);

document.getElementById("start").onclick = g.start;
document.getElementById("pause").onclick = g.pause;
document.getElementById("stop").onclick = g.over;
