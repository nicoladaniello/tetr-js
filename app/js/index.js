"use strict";

import Game from "./game.js";

const arena = document.getElementById("arena");
const accumulator = document.getElementById("accumulator");
const g = new Game(arena, accumulator);

document.getElementById("start").onclick = g.start;
document.getElementById("stop").onclick = g.stop;
