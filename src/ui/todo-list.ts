import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./todo-item.ts";

@customElement("todo-list")
export class TodoList extends LitElement {
  render() {
    return html`
      <div>
        <ul class="todo-list">
          <todo-item />
        </ul>
      </div>
    `;
  }

  static styles = css`
    .todo-list {
      padding: 0px;
      list-style: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-list": TodoList;
  }
}
