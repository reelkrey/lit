import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Task } from "./interfaces.ts";
import "./todo-list.ts";
import "./todo-create.ts";

@customElement("todo-app")
export class TodoApp extends LitElement {
  @state() tasks: Task[] = [];
  @state() completedTasks: Task[] = [];
  @state() inProgressTasks: Task[] = [];

  private createTask(event: CustomEvent) {
    const newTask = {
      title: event.detail.title,
      completed: event.detail.completed,
    };

    this.tasks = [...this.tasks, newTask];
  }

  private moveTaskTo(arrayType: string) {
    if (arrayType === "completed") {
    }
    if (arrayType === "in progress") {
    }
  }

  private updateTaskStatus(event: CustomEvent) {
    const { title, completed } = event.detail;

    if (completed) {
      const taskToMove = this.inProgressTasks.find(
        (task) => task.title === title,
      );
      if (taskToMove) {
        this.inProgressTasks = this.inProgressTasks.filter(
          (task) => task.title !== title,
        );
        this.completedTasks = [
          ...this.completedTasks,
          { ...taskToMove, completed: true },
        ];
      }
    }

    if (!completed) {
      const taskToMove = this.completedTasks.find(
        (task) => task.title === title,
      );
      if (taskToMove) {
        this.completedTasks = this.completedTasks.filter(
          (task) => task.title !== title,
        );
        this.inProgressTasks = [
          ...this.inProgressTasks,
          { ...taskToMove, completed: false },
        ];
      }
    }
  }

  render() {
    return html`
      <div class="todo-app">
        <todo-create @task-created=${this.createTask}></todo-create>
        <div class="todo-app__inner">
          <todo-list
            @task-status-changed=${this.updateTaskStatus}
            title="in progress"
            .tasks=${this.tasks}
          ></todo-list>
          <todo-list
            @task-status-changed=${this.updateTaskStatus}
            title="completed"
            .tasks=${this.tasks}
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
