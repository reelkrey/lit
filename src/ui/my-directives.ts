import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { guard } from "lit/directives/guard.js";
import { createRef, ref } from "lit/directives/ref.js";
import { when } from "lit/directives/when.js";

@customElement("my-directives")
export class MyDirectives extends LitElement {
  @property({ type: String }) optionalAttribute?: string;
  @state() items = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  @state() isLoggedIn = false;

  // Ссылка на кнопку
  private buttonRef = createRef<HTMLButtonElement>();

  // Обработчик событий
  handleClick() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  firstUpdated() {
    // Доступ к кнопке через ref
    if (this.buttonRef.value) {
      console.log("Button initialized:", this.buttonRef.value);
    }
  }

  render() {
    return html`
      <div>
        <h2>
          ${when(
            this.isLoggedIn,
            () => "Welcome Back!",
            () => "Please Log In",
          )}
        </h2>

        <!-- Использование ifDefined -->
        <input
          placeholder="Optional Attribute"
          value=${ifDefined(this.optionalAttribute)}
        />

        <!-- Использование repeat -->
        <ul>
          ${repeat(
            this.items,
            (item) => item.id, // Уникальный ключ
            (item) => html`<li>${item.name}</li>`,
          )}
        </ul>

        <!-- Использование guard -->
        <div>
          ${guard([this.items], () => {
            console.log("Guard executed");
            return html`<p>Items count: ${this.items.length}</p>`;
          })}
        </div>

        <!-- Кнопка с использованием ref -->
        <button ${ref(this.buttonRef)} @click=${this.handleClick}>
          ${this.isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>
    `;
  }

  // Стили компонента
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-family: Arial, sans-serif;
    }
    ul {
      padding: 0;
      list-style: none;
    }
    li {
      margin: 4px 0;
    }
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-directives": MyDirectives;
  }
}
