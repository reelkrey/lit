export type EventWithTarget<T extends HTMLElement, E extends Event> = E & {
  target: T;
  currentTarget: T;
};
