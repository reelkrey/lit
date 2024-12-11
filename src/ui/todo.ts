import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./todo-list.ts";
import "./todo-create.ts";

@customElement("todo-app")
export class TodoApp extends LitElement {
  @state() tasks: { id: number; title: string; completed: boolean }[] = [];

  constructor() {
    super();
    this.addEventListener("task-created", this.addTask as EventListener);
  }

  private addTask(event: CustomEvent) {
    const newTask = {
      id: Date.now(),
      title: event.detail.task,
      completed: false,
    };
  }

  render() {
    return html`
      <div class="todo-app">
        <todo-create></todo-create>
        <div class="todo-app__inner">
          <todo-list title="completed"></todo-list>
          <todo-list title="in progress"></todo-list>
        </div>
      </div>
    `;
  }

  static styles = css`
    .todo-app {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 100px;
    }

    .todo-app__inner {
      display: flex;
      gap: 100px;
      justify-content: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-app": TodoApp;
  }
}
