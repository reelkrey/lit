import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() title = "";

  private handleChange(event: InputEvent) {
    this.title = (event.target as HTMLInputElement).value;
  }

  private createTask() {
    if (!this.title.trim()) return;

    const newTask = new CustomEvent("task-created", {
      detail: { title: this.title },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newTask);
    this.title = "";
  }

  render() {
    return html`
      <div class="todo-create">
        <input
          @input=${this.handleChange}
          .value=${this.title}
          placeholder="create new task"
        />
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
