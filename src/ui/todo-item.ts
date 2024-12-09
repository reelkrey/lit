import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-item")
export class TodoItem extends LitElement {
  @property() text = "";
  @property({ type: Boolean }) completed = false;
  @property({ type: Number }) taskId = 0;

  render() {
    return html`
      <li>
        <input type="checkbox" />
        <span>text</span>
        <button>edit</button>
        <button>delete</button>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-item": TodoItem;
  }
}
