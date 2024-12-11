import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() task = "";

  private handleInput(event: InputEvent) {
    this.task = (event.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <div class="todo-create">
        <input placeholder="create new task" @input=${this.handleInput} />
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
