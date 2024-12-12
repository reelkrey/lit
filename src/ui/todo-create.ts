import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EventWithTarget } from "./types";

@customElement("todo-create")
export class TodoCreate extends LitElement {
  @property() title = "";

  private handleChange(event: EventWithTarget<HTMLInputElement, InputEvent>) {
    this.title = event.target.value;
  }

  private createTask() {
    if (!this.title.trim()) return;

    const create = new CustomEvent("create-task", {
      detail: { title: this.title, completed: false },
    });

    this.dispatchEvent(create);
    this.title = "";
  }

  render() {
    return html`
      <div class="todo-create">
        <input
          class="todo-create__input"
          @input=${this.handleChange}
          .value=${this.title}
          placeholder="create new task"
        />
        <button class="todo-create__button" @click=${this.createTask}>
          create
        </button>
      </div>
    `;
  }

  static styles = css`
    .todo-create__input {
      padding: 10px 20px;
      border: 1px solid #0056b3;
      border-radius: 8px;
    }

    .todo-create__button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      color: #fff;
      background-color: #0056b3;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-create": TodoCreate;
  }
}
