class ChessCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
     :host {

     }

     .cell {
       display: flex;
       justify-content: center;
       align-items: center;
       width: var(--cell-size);
       height: var(--cell-size);
       box-sizing: border-box;
     }
   `;
  }

  connectedCallback() {
    this.x = this.getAttribute("x");
    this.y = this.getAttribute("y");
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${ChessCell.styles}</style>
    <div class="cell">
    </div>`;
  }
}

customElements.define("chess-cell", ChessCell);
