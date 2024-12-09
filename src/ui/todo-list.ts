import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("todo-list")
export class TodoList extends LitElement {
  render() {
    return html` <ul></ul> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-list": TodoList;
  }
}
