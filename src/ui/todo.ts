import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Task } from "./interfaces.ts";
import "./todo-list.ts";
import "./todo-create.ts";

@customElement("todo-app")
export class TodoApp extends LitElement {
  @state() tasks: Task[] = [];
  @state() inProgressTasks: Task[] = [];
  @state() completedTasks: Task[] = [];

  private createTask(event: CustomEvent) {
    const newTask = {
      title: event.detail.title,
      completed: event.detail.completed,
    };

    this.tasks = [...this.tasks, newTask];
    this.inProgressTasks = [...this.inProgressTasks, newTask];
  }

  private toggleTaskStatus(event: CustomEvent) {
    const toggledTask = event.detail.title;

    this.tasks = this.tasks.map((task) =>
      task.title === toggledTask
        ? { ...task, completed: !task.completed }
        : task,
    );

    this.inProgressTasks = this.tasks.filter((task) => !task.completed);
    this.completedTasks = this.tasks.filter((task) => task.completed);
  }

  render() {
    return html`
      <div class="todo-app">
        <todo-create @creat-task=${this.createTask}></todo-create>
        <div class="todo-app__inner">
          <todo-list
            @toggle-task-status=${this.toggleTaskStatus}
            title="in progress"
            .tasks=${this.inProgressTasks}
          ></todo-list>
          <todo-list
            @toggle-task-status=${this.toggleTaskStatus}
            title="completed"
            .tasks=${this.completedTasks}
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
