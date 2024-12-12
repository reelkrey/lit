// todo-app.ts
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Task } from "./task.interface.ts";
import "./todo-list.ts";
import "./todo-create.ts";

@customElement("todo-app")
export class TodoApp extends LitElement {
  @state() completedTasks: Task[] = [];
  @state() inProgressTasks: Task[] = [];

  constructor() {
    super();
    this.addEventListener("task-created", this.addTask as EventListener);
    this.addEventListener("task-status-changed", this.updateTaskStatus as EventListener);
  }

  private addTask(event: CustomEvent) {
    const newTask = {
      title: event.detail.task,
      completed: false
    };

    this.inProgressTasks = [...this.inProgressTasks, newTask];
  }

  private updateTaskStatus(event: CustomEvent) {
    const { title, completed } = event.detail;

    if (completed) {
      const taskToMove = this.inProgressTasks.find(task => task.title === title);
      if (taskToMove) {
        this.inProgressTasks = this.inProgressTasks.filter(task => task.title !== title);
        this.completedTasks = [...this.completedTasks, { ...taskToMove, completed: true }];
      }
    } else {
      const taskToMove = this.completedTasks.find(task => task.title === title);
      if (taskToMove) {
        this.completedTasks = this.completedTasks.filter(task => task.title !== title);
        this.inProgressTasks = [...this.inProgressTasks, { ...taskToMove, completed: false }];
      }
    }
  }

  render() {
    return html`
      <div class="todo-app">
        <todo-create></todo-create>
        <div class="todo-app__inner">
          <todo-list title="in progress" .tasks=${this.inProgressTasks}></todo-list>
          <todo-list title="completed" .tasks=${this.completedTasks}></todo-list>
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