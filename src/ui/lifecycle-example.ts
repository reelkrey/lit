import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lifecycle-example")
export class LifecycleExample extends LitElement {
  text: string;
  @property({ type: Number }) count = 0;

  /* 
  Шаг первый. 
  До того, как компонент TodoApp появится в DOM.
  Можно объявить переменные, записать в них информацию */
  constructor() {
    super();
    this.text = "Constructor lifecycle";
  }

  /* 
  Шаг второй. 
  После того, как компонент TodoApp появится в DOM. 
  Но он ещё не отрендерился и работать с элементами DOM мы не можем.
  Можно подписаться на глобальные события, сделать запрос на сервер 
  и записать полученную информацию в переменную */
  connectedCallback() {
    super.connectedCallback();
    console.log(
      `ConnectedCallback: Component has been added to the DOM after ${this.text}`,
    );
  }

  /*
  Шаг третий
  Вызывается перед тем, как компонент будет обновлен
  */
  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has("count")) {
      console.log("count has been updated:", this.count);
    }
  }

  /*
  Шаг чертвертый
  Компонен TodoApp уже есть в DOM.
  Он уже отрендерился, элементы этого компонента доступны для работы (например button)
  Можно подписаться на события элементов: например делать что-то при нажатии на кнопку
  */
  firstUpdated() {
    console.log("First update complete! The component has been rendered.");
    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      button.addEventListener("click", () => console.log("Button clicked!"));
    }
  }

  render() {
    return html` <button>click me</button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lifecycle-example": LifecycleExample;
  }
}
