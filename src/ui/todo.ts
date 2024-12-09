import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./todo-list.ts";

@customElement("todo-app")
export class Todo extends LitElement {
  render() {
    return html`
      <div>
        <h1>Todo</h1>
        <todo-list />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-app": Todo;
  }
}
