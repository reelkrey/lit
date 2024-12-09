import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./todo-list.ts";

@customElement("todo-app")
export class Todo extends LitElement {
  render() {
    return html`
      <div class="todo-app__inner">
        <todo-list title="completed"></todo-list>
        <todo-list title="in progress"></todo-list>
      </div>
    `;
  }

  static styles = css`
    .todo-app__inner {
      display: flex;
      gap: 100px;
      justify-content: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-app": Todo;
  }
}
