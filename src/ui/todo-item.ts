import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-item")
export class TodoItem extends LitElement {
  @property() title = "";
  @property({ type: Boolean }) completed = false;
  @property({ type: Number }) taskId = 0;

  private toggleTaskStatus() {
    this.completed = !this.completed;

    const toggle = new CustomEvent("toggle-task-status", {
      detail: { taskId: this.taskId },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(toggle);
  }

  render() {
    return html`
      <li class="todo-item">
        <input
          type="checkbox"
          @change=${this.toggleTaskStatus}
          ?checked=${this.completed}
        />
        <span>${this.title}</span>
        <button>edit</button>
        <button>delete</button>
      </li>
    `;
  }

  static styles = css`
    .todo-item button {
      padding: 5px 10px;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }

    .todo-item button:hover {
      background-color: #0056b3;
    }

    .todo-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-item": TodoItem;
  }
}
