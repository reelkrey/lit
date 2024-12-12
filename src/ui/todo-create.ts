import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

type EventWithTarget<T extends HTMLElement, E extends Event> = E & {
  target: T;
  currentTarget: T;
};

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() title = "";

  private handleChange(event: EventWithTarget<HTMLInputElement, InputEvent>) {
    this.title = event.target.value;
  }

  private createTask() {
    if (!this.title.trim()) return;

    const newTask = new CustomEvent("task-created", {
      detail: { title: this.title, completed: false },
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
