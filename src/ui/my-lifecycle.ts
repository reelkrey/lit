import { LitElement, html, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("my-lifecycle")
export class MyLifecycle extends LitElement {
  @property({ type: Number }) counter = 0;
  @state() initialized = false;

  private startTimer(): void {
    console.log("startTimer: Таймер запущен.");
  }

  private stopTimer(): void {
    console.log("stopTimer: Таймер остановлен.");
  }

  private incrementCounter(): void {
    this.counter += 1;
  }

  private resetCounter(): void {
    this.counter = 0;
  }

  // Конструктор: инициализация свойств
  // Создание начального состояния полей
  // Инициализация переменных и установка значений по умолчанию.
  // DOM-дерево компонента ещё не создано.
  // Атрибуты и свойства, переданные в компонент, ещё не проинициализированы.
  constructor() {
    super();
    console.log("constructor: Компонент создан, свойства инициализированы.");
  }

  // Подключение компонента к DOM
  // Навешивание слушателей событий.
  // Пока что не выполнен рендеринг шаблона
  // Можно навешивать глобальные слушатели
  // Можно взаимодействовать с родительским элементом компонента
  // Элементы внутри компонента ещё не существуют и любые попытки их найти вернут null.
  connectedCallback(): void {
    super.connectedCallback();
    console.log("connectedCallback: Компонент добавлен в DOM.");
    this.startTimer();
  }

  // Вызывается перед обновлением и рендерингом
  // Изменённые свойства доступны через объект changedProperties
  // Можно запускать подготовку к рендерингу.
  // DOM ещё не обновлён и недоступен для манипуляций.
  protected update(changedProperties: PropertyValues): void {
    console.log("update: Обновление перед рендерингом.", changedProperties);
    super.update(changedProperties);
  }

  // Дополнительная подготовка перед рендерингом
  // Полный доступ к текущему состоянию компонентов.
  // Подготовка данных для шаблона.
  // Проверка, какие свойства изменились.
  // DOM ещё не обновлён
  protected willUpdate(changedProperties: PropertyValues): void {
    console.log("willUpdate: Готовимся к рендерингу.", changedProperties);
    if (changedProperties.has("counter") && this.counter > 10) {
      console.log("willUpdate: Счётчик больше 10. Перезапуск.");
      this.counter = 0;
    }
  }

  // Генерация DOM
  // Рендеринг шаблона с использованием данных.
  // Использование директив (repeat, ifDefined, classMap и т.д.).
  protected render() {
    console.log("render: Рендеринг шаблона.");
    return html`
      <div>
        <h2>Жизненный цикл Lit</h2>
        <p>Счётчик: ${this.counter}</p>
        <button @click="${this.incrementCounter}">Увеличить счётчик</button>
        <button @click="${this.resetCounter}">Сбросить счётчик</button>
      </div>
    `;
  }

  // Действия после первого рендеринга
  // Полный доступ к готовому DOM.
  // Манипуляции с элементами (например, this.shadowRoot.querySelector).
  // Инициализация сложных UI-компонентов (например, подключение библиотек).
  // Этот метод вызывается только один раз, поэтому для последующих обновлений он не используется!!!
  protected firstUpdated(changedProperties: PropertyValues): void {
    console.log("firstUpdated: Первый рендеринг завершён.", changedProperties);
    this.initialized = true;
  }

  // Действия после каждого обновления
  // Полный доступ к обновлённому DOM.
  // Работа с обновившимися данными.
  protected updated(changedProperties: PropertyValues): void {
    console.log("updated: Рендеринг завершён.", changedProperties);
    if (changedProperties.has("counter")) {
      console.log(`updated: Значение счётчика изменилось на ${this.counter}.`);
    }
  }

  // Отключение компонента из DOM
  // Отписка от событий.
  // Очистка ресурсов (например, таймеров, подписок).
  // 	Элемент уже не находится в DOM.
  disconnectedCallback(): void {
    super.disconnectedCallback();
    console.log("disconnectedCallback: Компонент удалён из DOM.");
    this.stopTimer();
  }
}
