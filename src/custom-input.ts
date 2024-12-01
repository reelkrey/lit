import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("custom-input")
export class CustomInput extends LitElement {
  render() {
    return html`<input class="custom-input" placeholder="type some..." />`;
  }

  static styles = css`
    .custom-input {
      border: none;
      background-color: #000;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "custom-input": CustomInput;
  }
}
