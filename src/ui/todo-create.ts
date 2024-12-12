import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() task = "";

  private handleChange(event: InputEvent) {
    this.task = (event.target as HTMLInputElement).value;
  }

  private createTask() {
    const newTask = new CustomEvent("task-created", {
      detail: { task: this.task },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newTask);

    this.task = "";
  }

  render() {
    return html`
      <div class="todo-create">
        <input
          @input=${this.handleChange}
          .value=${this.task}
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
