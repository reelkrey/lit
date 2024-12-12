import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Task } from "./interfaces.ts";
import "./todo-list.ts";
import "./todo-create.ts";

@customElement("todo-app")
export class TodoApp extends LitElement {
  @state() tasks: Task[] = [];

  private createTask(event: CustomEvent) {
    const newTask = {
      title: event.detail.title,
      completed: false,
    };

    this.tasks = [...this.tasks, newTask];
  }

  private toggleTaskStatus(event: CustomEvent) {
    const { title, completed } = event.detail;

    this.tasks = this.tasks.map((task) =>
      task.title === title ? { ...task, completed } : task,
    );
  }

  render() {
    const completedTasks = this.tasks.filter((task) => task.completed);
    const inProgressTasks = this.tasks.filter((task) => !task.completed);

    return html`
      <div class="todo-app">
        <todo-create @task-created=${this.createTask}></todo-create>
        <div class="todo-app__inner">
          <todo-list
            @toggle-task-status=${this.toggleTaskStatus}
            title="in progress"
            .tasks=${inProgressTasks}
          ></todo-list>
          <todo-list
            @toggle-task-status=${this.toggleTaskStatus}
            title="completed"
            .tasks=${completedTasks}
          ></todo-list>
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
