class ChessPiece extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
     :host {

     }
   `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type");
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${ChessPiece.styles}</style>
    <div>
    </div>`;
  }
}

customElements.define("chess-piece", ChessPiece);
