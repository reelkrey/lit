import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("to-do")
export class ToDo extends LitElement {
  render() {
    return html`
      <div>
        <h1>Todo</h1>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "to-do": ToDo;
  }
}
