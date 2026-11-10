import { createRoot, Root } from "react-dom/client";
import type { ReactNode } from "react";
import { Effect, Scheduler } from "./effect.ts";
import { MicrotaskScheduler } from "./schedular.ts";

/**
 * Lifecycle callbacks supported by a custom element.
 */
export interface CustomElementCallbacks {
  /** Invoked each time the custom element is connected to the document. */
  connectedCallback?(): void;

  /** Invoked each time the custom element is disconnected from the document. */
  disconnectedCallback?(): void;
}

/**
 * Renders a custom element's reactive instance with React.
 *
 * @param fn Creates the React node from the custom element instance.
 * @returns A class decorator that rerenders when reactive dependencies change.
 */
export function template<
  // deno-lint-ignore no-explicit-any
  T extends new (...args: any[]) => HTMLElement & CustomElementCallbacks,
>(
  fn: (props: InstanceType<T>) => ReactNode,
): (constructor: T) => T {
  return (constructor) => {
    return class extends constructor {
      #schedular: Scheduler = new MicrotaskScheduler();
      #effect?: Effect;
      #root?: Root;

      override connectedCallback(): void {
        super.connectedCallback?.();

        if (this.#effect) return;

        const host = this.shadowRoot ?? this;
        const root = this.#root ?? createRoot(host);

        this.#root = root;

        const action = (): void => {
          const node = fn(this as InstanceType<T>);

          root.render(node);
        };

        const effect = Effect.start(action, this.#schedular);

        this.#effect = effect;
      }

      override disconnectedCallback(): void {
        this.#effect?.stop();
        this.#effect = undefined;

        super.disconnectedCallback?.();
      }
    };
  };
}
