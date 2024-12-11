import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() text = "";

  render() {
    return html`
      <div class="todo-create">
        <input></input>
        <button>create</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-create": TodoCreate;
  }
}
