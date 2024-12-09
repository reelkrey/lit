import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("todo-item")
export class TodoItem extends LitElement {
  render() {
    return html` <li></li> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-item": TodoItem;
  }
}
