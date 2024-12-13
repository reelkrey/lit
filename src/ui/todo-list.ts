import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Task } from "./interfaces.ts";
import "./todo-item.ts";

@customElement("todo-list")
export class TodoList extends LitElement {
  @property() title = "";
  @property({ type: Array }) tasks: Task[] = [];

  render() {
    return html`
      <div class="todo-list__wrapper">
        <h1 class="todo-list__title">${this.title}</h1>
        <ul class="todo-list">
          ${this.tasks.map(
            (task) =>
              html`<todo-item
                .title=${task.title}
                .completed=${task.completed}
                .taskId=${task.taskId}
              ></todo-item>`,
          )}
        </ul>
      </div>
    `;
  }

  static styles = css`
    .todo-list__wrapper {
      padding: 10px 30px;
      border: 1px solid #0056b3;
      border-radius: 8px;
    }

    .todo-list__title {
      font-size: 20px;
      font-weight: 900;
    }

    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      list-style: none;
      padding: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-list": TodoList;
  }
}
