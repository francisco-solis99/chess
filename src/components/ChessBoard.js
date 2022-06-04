import "./ChessCell.js";
import "./ChessPiece.js";
import initialLocations from "../data/initialLocations.json";

class ChessBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.PIECES = [];
  }

  static get styles() {
    return /* css */ `
     :host {
      --piece-size: 54px;
      --cell-size: 72px;
      --board-size: 576px;

      --color-odd: #eed2aa;
      --color-even: #90502f;
      --frame-color: #62351f;
      --border-style: 0;
      font-family: sans-serif;
     }

     :host(.wood) {
      --color-odd: #eed2aa;
      --color-even: #90502f;
      --frame-color: #62351f;
     }

     :host(.colorful) {
      --color-odd: #7135a4;
      --color-even: #f566e8;
      --frame-color: #421768;
     }

     :host(.forest) {
      --color-odd: #779556;
      --color-even: #ebecd0;
      --frame-color: #3d5226;
     }

     :host(.classic) {
      --color-odd: #e7e6e4;
      --color-even: #ebecd0;
      --frame-color: #779556;
     }

     :host(.ocean) {
      --color-odd: #99ccff;
      --color-even: #026498;
      --frame-color: #09364e;
     }

     .frame {
        display: grid;
        grid-template-areas: "top top top"
                            "left center right"
                            "bottom bottom bottom";
        justify-content: center;
        align-items: center;
        width:  calc(var(--cell-size) * 10);
        height: calc(var(--cell-size) * 10);
        background-color: var(--frame-color);
     }

     .row {
        display: flex;
     }

     .row.top {grid-area: top;}
     .col.left {grid-area: left;}
     .board {grid-area: center;}
     .row.bottom {grid-area: bottom;}
     .col.right {grid-area: right;}

     .board {
       display: flex;
       flex-wrap: wrap;
       width: var(--board-size);
       height: var(--board-size);


       background: conic-gradient(
         var(--color-even) 90deg,
         var(--color-odd) 90deg 100deg,
         var(--color-even) 180deg 270deg,
         var(--color-odd) 270deg
       );

       background-size: calc(var(--cell-size)* 2) calc(var(--cell-size) * 2);
     }

     .fake {
       width: var(--cell-size);
       height: var(--cell-size);
       display: flex;
       justify-content: center;
       align-items: center;
       color: #ccc;
       font-size: 1.2rem;
       font-weight: 500;
       box-sizing: border-box;
     }
   `;
  }

  connectedCallback() {
    this.render();
    // this.classList.add("wood");
  }

  // render funtions
  renderCells() {
    const cells = [];
    // genarete the 64 cells for the ches
    for (let y = 0; y < 8; y += 1) {
      for (let x = 0; x < 8; x += 1) {
        cells.push(this.renderCell(y, x));
      }
    }
    // join the array of cells into a string
    return cells.join("");
  }

  renderCell(y, x) {
    const col = String.fromCharCode(65 + x); // 65 before the letter A in the ascii table
    const row = 9 - (y + 1);
    return `
      <chess-cell x="${col}" y="${row}"></chess-cell>
    `;
  }

  genFakeCells(n) {
    const texts = (n === 10 ? " ABCDEFGH " : "87654321").split("");
    return texts.map(text => /* html */`<div class="fake">${text}</div>`).join("");
  }

  // functions to render pieces
  getCell(posX, posY) {
    return this.shadowRoot.querySelector(`[x="${posX.toUpperCase()}"][y="${posY}"]`).shadowRoot.querySelector(".cell");
  }

  preparePieces() {
    initialLocations.forEach(([letter, position]) => this.addPiece(letter, position));
  }

  getPiece(position) {
    if (!this.isEmpty(position)) {
      const cell = this.at(position);
      return cell.querySelector("chess-piece");
    }
  }

  addPiece(letter, position) {
    const [x, y] = position;
    const cell = this.getCell(x, y);
    const piece = document.createElement("chess-piece");
    piece.setAttribute("type", letter);
    cell.appendChild(piece);

    // save the each piece
    this.PIECES.push(piece);
  }

  // functions for move the pieces

  // chess-cell
  at(position) {
    const [x, y] = position;
    this.getCell(x, y);
  }

  // validate if sone position is empty
  isEmpty(position) {
    const cell = this.at(position);
    const piece = cell.querySelector("chess-piece");
    return !piece;
  }

  // move some piece
  movePiece(from, to) {

  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${ChessBoard.styles}</style>
    <div class="frame">
      <div class="row top">
        ${this.genFakeCells(10)}
      </div>
      <div class="col left">
        ${this.genFakeCells(8)}
      </div>
      <div class="board">
        ${this.renderCells()}
      </div>
      <div class="col right">
        ${this.genFakeCells(8)}
      </div>
      <div class="row bottom">
        ${this.genFakeCells(10)}
      </div>
    </div>`;
  }
}

customElements.define("chess-board", ChessBoard);
