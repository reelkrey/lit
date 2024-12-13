import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EventWithTarget } from "./types";

@customElement("todo-item")
export class TodoItem extends LitElement {
  @property() title = "";
  @property({ type: Boolean }) completed = false;
  @property({ type: Number }) taskId = 0;
  @property({ type: Boolean }) isEditing = false;

  private changeTaskStatus() {
    const changeTaskStatus = new CustomEvent("change-task-status", {
      detail: { taskId: this.taskId },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(changeTaskStatus);
  }

  private deleteTask() {
    const deleteTask = new CustomEvent("delete-task", {
      detail: { taskId: this.taskId },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(deleteTask);
  }

  private startTitleEditing() {
    this.isEditing = true;
  }

  private handleTitleEditing(
    event: EventWithTarget<HTMLInputElement, InputEvent>,
  ) {
    this.title = event.target.value;
  }

  private saveTitleEditing() {
    this.isEditing = false;

    const editTask = new CustomEvent("edit-task", {
      detail: { taskId: this.taskId, title: this.title },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(editTask);
  }

  render() {
    return html`
      <li class="todo-item">
        <input
          type="checkbox"
          @change=${this.changeTaskStatus}
          ?checked=${this.completed}
        />
        <span>${this.title}</span>
        <button @click=${this.startTitleEditing}>edit</button>
        <button @click=${this.deleteTask}>delete</button>
        ${this.isEditing
          ? html` <div class="todo-item__edit-inner">
              <input
                @change=${this.handleTitleEditing}
                placeholder="edit task title"
              />
              <button
                class="todo-item__edit-inner__button"
                @click=${this.saveTitleEditing}
              >
                edit
              </button>
            </div>`
          : null}
      </li>
    `;
  }

  static styles = css`
    .todo-item {
      display: flex;
      position: relative;
      gap: 10px;
      align-items: center;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

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

    .todo-item__edit-inner {
      position: absolute;
      border-radius: 8px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #007bff;
    }

    .todo-item__edit-inner__button {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-item": TodoItem;
  }
}
