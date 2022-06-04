import * as dat from "dat.gui";
import "./components/ChessBoard.js";

// { K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙", k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" }

const board = document.querySelector("chess-board");
board.preparePieces();

const gui = new dat.GUI();

const options = {
  theme: "wood"
};

const themes = ["wood", "colorful", "forest", "classic", "ocean"];

gui.add(options, "theme", themes)
  .onChange(data => {
    themes.forEach(theme => board.classList.remove(theme));
    board.classList.add(data);
  });

// close the controls by default
gui.close();
