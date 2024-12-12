import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./todo-item.ts";
import { Task } from "./task.interface.ts";

@customElement("todo-list")
export class TodoList extends LitElement {
  @property() title = "";
  @property({ type: Array }) tasks: Task[] = [];

  render() {
    return html`
      <div>
        <span class="todo-list__span">${this.title}</span>
        <ul class="todo-list">
          
          
          ${this.tasks.map(
            (task) =>
              html`<todo-item .title=${task.title}></todo-item>` 
          )}
        </ul>
      </div>
    `;
  }

  static styles = css`
    .todo-list {
      padding: 0px;
      list-style: none;
    }

    .todo-list__span {
      font-size: 20px;
      font-weight: 900;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-list": TodoList;
  }
}
