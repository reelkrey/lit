import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-item")
export class TodoItem extends LitElement {
  @property() title = "";
  @property({ type: Boolean }) completed = false;

  private handleCheckChange(event: Event) {
    this.completed = (event.target as HTMLInputElement).checked;

    const changeEvent = new CustomEvent("task-status-changed", {
      detail: { title: this.title, completed: this.completed },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEvent);
  }

  render() {
    return html`
      <li class="todo-item">
        <input
          type="checkbox"
          @change=${this.handleCheckChange}
          ?checked=${this.completed}
        />
        <span>${this.title}</span>
        <button>edit</button>
        <button>delete</button>
      </li>
    `;
  }

  static styles = css`
    .todo-item {
      display: flex;
      gap: 20px;
      max-width: max-content;
      padding: 10px 20px;
      border: 1px solid #000;
      border-radius: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-item": TodoItem;
  }
}
