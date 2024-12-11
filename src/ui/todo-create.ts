import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() task = "";

  private handleInput(event: InputEvent) {
    this.task = (event.target as HTMLInputElement).value;
  }

  createTask() {}

  render() {
    return html`
      <div class="todo-create">
        <input @input=${this.handleInput} placeholder="create new task" />
        <button @click=${this.createTask}>create</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-create": TodoCreate;
  }
}
