import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Task } from "./interfaces.ts";
import "./todo-list.ts";
import "./todo-create.ts";

@customElement("todo-app")
export class TodoApp extends LitElement {
  @state() tasks: Task[] = [];

  private get incompleteTasks(): Task[] {
    return this.tasks.filter((task) => !task.completed);
  }

  private get completedTasks(): Task[] {
    return this.tasks.filter((task) => task.completed);
  }

  private createTask(event: CustomEvent) {
    const newTask = {
      taskId: Date.now(),
      title: event.detail.title,
      completed: false,
    };

    this.tasks = [...this.tasks, newTask];
  }

  private toggleTaskStatus(event: CustomEvent) {
    this.tasks = this.tasks.map((task) =>
      task.taskId === event.detail.taskId
        ? { ...task, completed: !task.completed }
        : task,
    );
  }

  render() {
    return html`
      <div class="todo-app">
        <todo-create @create-task=${this.createTask}></todo-create>
        <div class="todo-app__inner">
          <todo-list
            class="todo-list"
            @toggle-task-status=${this.toggleTaskStatus}
            title="in progress"
            .tasks=${this.incompleteTasks}
          ></todo-list>
          <todo-list
            class="todo-list"
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
      gap: 50px;
      padding-top: 200px;
      max-width: 800px;
      margin: 0 auto;
    }

    .todo-app__inner {
      display: flex;
      width: 100%;
      justify-content: center;
      gap: 100px;
    }

    .todo-list {
      max-width: 400px;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-app": TodoApp;
  }
}
