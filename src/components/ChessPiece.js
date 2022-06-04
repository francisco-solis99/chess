const PIECES = {
  K: "king",
  Q: "queen",
  R: "rook",
  B: "bishop",
  N: "knight",
  P: "pawn",
};

const MAYUS_PIECES = Object.keys(PIECES);

class ChessPiece extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
     :host {

     }

     .piece img {
       image-renderin: pixelated;
       transform: scale(2.5);
       filter: drop-shadow(0 0 1px #00006);
     }
   `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type");
    this.color = MAYUS_PIECES.includes(this.type) ? "black" : "white";
    this.render();
  }

  render() {
    const typePiece = PIECES[this.type.toUpperCase()] + ".svg";
    this.shadowRoot.innerHTML = /* html */ `
    <style>${ChessPiece.styles}</style>
    <div class="piece">
      <img src="./pieces/normal/${this.color}-${typePiece}" alt="Chess Piece ${this.color}-${typePiece}" class="piece__iamge">
    </div>`;
  }
}

customElements.define("chess-piece", ChessPiece);
